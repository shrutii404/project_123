import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
// Removed duplicated React Native import block below
import { Ionicons } from '@expo/vector-icons'; // Correct import for Expo projects
// Removed direct RTK Query mutation hooks (useLoginUserMutation, useVerifyUserMutation, useResendOTPMutation)
// Removed FetchBaseQueryError, SerializedError, LoginResponse imports (handled in context)
// Removed useDispatch, userLogin imports (handled in context)
// Removed setUser import (no longer exists/needed)
import { LoginScreenProps } from '../../types/auth';
import { useAuth } from '../../context/AuthContext'; // Import useAuth
import { useApiError } from '../../core/hooks/useApiError';
import { getErrorMessage } from '../../core/error-handling/errorMessages';

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { error: apiError, handleError, clearError } = useApiError(); // Keep custom error handling for now
  const { login, verifyOTP, isLoading: isAuthLoading, error: authError } = useAuth(); // Get functions and loading state from context
  const [phonenumber, setPhonenumber] = useState<string>('');
  const [verify, setVerify] = useState<boolean>(false); // State to track if OTP view is shown
  const [resend, setResend] = useState<boolean>(false); // State for resend button visibility
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  // const [loading, setLoading] = useState<boolean>(false); // Remove local loading, use isAuthLoading
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [timer, setTimer] = useState<number>(180); // 180 seconds = 3 minutes
  const [isSubmitting, setIsSubmitting] = useState(false); // Local state for button loading indicator

  // Removed direct mutation hooks and dispatch

  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleOtpChange = (text: string, index: number): void => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text.length === 1 && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }

    if (text.length === 0 && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (verify && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            setResend(true);
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [verify, timer]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handlePhonenumberChange = (inputText: string): void => {
    // Only allow numbers
    const numbersOnly = inputText.replace(/[^0-9]/g, '');
    setPhonenumber(numbersOnly);
  };

  const handleNavigateBack = (): void => {
    if (verify) {
      setVerify(false);
      setOtp(new Array(6).fill(''));
      setTimer(180);
      setResend(false);
      clearError();
    } else {
      navigation.navigate('Home');
    }
  };

  const handleResendOTP = async (): Promise<void> => {
    setIsSubmitting(true);
    try {
      // Use the login function from useAuth context
      const result = await login(phonenumber);
      // Check if the mutation was successful (result might not have specific data if just sending OTP)
      if (result.success) {
        setTimer(180);
        setResend(false);
        clearError();
        ToastAndroid.show('OTP resent successfully', ToastAndroid.SHORT);
      } else {
        // Handle potential errors from the login mutation if needed
        handleError('NETWORK_ERROR'); // Or use error from result.error
        ToastAndroid.show(result.error || getErrorMessage('NETWORK_ERROR'), ToastAndroid.SHORT);
      }
    } catch (error) {
      // Catch errors if login promise rejects unexpectedly
      handleError('NETWORK_ERROR');
      ToastAndroid.show(getErrorMessage('NETWORK_ERROR'), ToastAndroid.SHORT);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOTP = async (): Promise<void> => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      handleError('INVALID_OTP');
      ToastAndroid.show(getErrorMessage('INVALID_OTP'), ToastAndroid.SHORT);
      return;
    }

    setIsSubmitting(true);
    try {
      // Use the verifyOTP function from useAuth context
      const result = await verifyOTP(phonenumber, otpString);

      if (result.success) {
        clearError();
        ToastAndroid.show('Login Successful', ToastAndroid.SHORT);
        // Navigation should happen automatically if AuthGuard is set up correctly,
        // or you can navigate explicitly after successful verification.
        navigation.navigate('Home');
      } else {
        // Use the error message provided by verifyOTP
        handleError('INVALID_CREDENTIALS'); // Keep custom error type if needed
        ToastAndroid.show(
          result.error || getErrorMessage('INVALID_CREDENTIALS'),
          ToastAndroid.SHORT
        );
      }
    } catch (error) {
      // Catch unexpected errors from verifyOTP promise
      handleError('INVALID_CREDENTIALS');
      ToastAndroid.show(getErrorMessage('INVALID_CREDENTIALS'), ToastAndroid.SHORT);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (): Promise<void> => {
    setIsSubmitting(true);
    clearError(); // Clear previous errors

    try {
      if (!verify) {
        // If in phone number entry stage
        if (!validatePhoneNumber(phonenumber)) {
          handleError('INVALID_PHONE');
          ToastAndroid.show(getErrorMessage('INVALID_PHONE'), ToastAndroid.SHORT);
          setIsSubmitting(false);
          return;
        }
        // Use the login function from useAuth context to send OTP
        const result = await login(phonenumber);
        if (result.success) {
          setVerify(true); // Show OTP input view
          setTimer(180); // Reset timer
          setResend(false); // Hide resend initially
          ToastAndroid.show('OTP Sent Successfully', ToastAndroid.SHORT);
        } else {
          // Handle error from login mutation
          handleError('NETWORK_ERROR'); // Or use error from result.error
          ToastAndroid.show(result.error || getErrorMessage('NETWORK_ERROR'), ToastAndroid.SHORT);
        }
      } else {
        // If in OTP verification stage
        await handleVerifyOTP();
      }
    } catch (error) {
      // Catch unexpected errors
      console.error('Submit error:', error);
      Alert.alert('Error', 'An unexpected error occurred during submission.');
      handleError('GENERIC_ERROR'); // Set a generic error state
    } finally {
      // Only set isSubmitting false if not navigating away on success
      // Since handleVerifyOTP might navigate, this might cause a state update on unmounted component
      // Consider handling navigation state more carefully if issues arise.
      // For now, let's set it here.
      setIsSubmitting(false);
    }
  };

  return (
    <View className=" flex-1 justify-center items-center w-full">
      <View className=" items-center w-full">
        <Image
          source={{
            uri: 'https://e-commerce-alpha-rouge.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ficon2.e1d79f09.png&w=750&q=75',
          }}
          className="h-16 w-16 bg-black"
        ></Image>
        <Text className="text-black text-2xl font-medium mt-1">Hulra Hardware & Paints</Text>
        <View className="h-0.5 w-[80%] bg-gray-200 m-10"></View>
        <View className="w-[80%] items-start">
          <Text className="text-black text-xl mb-2">Phone Number</Text>
          <TextInput
            className={`border text-black border-gray-400 rounded h-10 w-full font-medium ${
              phonenumber.length == 0 && 'text-center'
            }`}
            value={phonenumber}
            onChangeText={handlePhonenumberChange}
            placeholder="Phone Number"
            placeholderTextColor="#6b7280"
          />
          {verify && (
            <View>
              <Text className="text-black text-xl mb-2">One-Time Password</Text>
              <View className="flex-row  items-center w-full">
                {otp.map((value, index) => (
                  <React.Fragment key={index}>
                    <TextInput
                      style={{
                        borderWidth: 0.5,
                        borderColor: 'gray',
                        height: 40,
                        width: '11%',
                        textAlign: 'center',
                        fontSize: 18,
                        fontWeight: '500',
                        borderTopLeftRadius: index === 0 || index === 3 ? 10 : 0,
                        color: 'black',

                        borderBottomLeftRadius: index === 2 || index === 5 ? 10 : 0,
                        borderBottomRightRadius: index === 2 || index === 5 ? 10 : 0,
                      }}
                      value={value}
                      onChangeText={(text) => handleOtpChange(text, index)}
                      maxLength={1}
                      keyboardType="numeric"
                      ref={(ref) => (inputRefs.current[index] = ref)}
                    />
                    {/* Add hyphen after the 3rd input box */}
                    {index === 2 && <Text className="text-xl mx-1 text-black">-</Text>}
                  </React.Fragment>
                ))}
                <View className="ml-1">
                  <Text className="text-gray-400 text-xs font-normal mt-2">
                    Resend in {formatTime(timer)}
                  </Text>
                </View>
              </View>
              <Text className="text-gray-400 text-xs font-normal my-0.5">
                Please enter the one-time password sent to your phone.
              </Text>
            </View>
          )}

          {resend && (
            <TouchableOpacity
              className=" border border-gray-400 mt-2 w-full p-3 items-center rounded-md "
              onPress={handleResendOTP} // Use dedicated resend handler
              disabled={isSubmitting || isAuthLoading} // Disable while submitting/loading
            >
              {isSubmitting ? (
                <ActivityIndicator color="#000" />
              ) : (
                <Text className="text-black ">Resend</Text>
              )}
            </TouchableOpacity>
          )}
          <TouchableOpacity
            className="bg-black mt-2 w-full p-3 items-center rounded-md "
            onPress={handleSubmit} // Main submit handler
            disabled={isSubmitting || isAuthLoading} // Disable while submitting/loading
          >
            {isSubmitting ? ( // Use local isSubmitting for button indicator
              <ActivityIndicator color="#fff" />
            ) : verify ? (
              <Text className="text-white ">Verify</Text>
            ) : (
              <Text className="text-white ">Send Code</Text>
            )}
          </TouchableOpacity>

          <Text className="mt-1 text-[#717378] text-xs w-full work-break font-semibold mb-14">
            By continuing, you agree to Hurla's
            <Text className="mt-1 ml-1 text-black ">Terms & Conditions and Privacy Policy.</Text>
          </Text>
          <TouchableOpacity
            className="border border-black rounded-full px-3 py-1 flex flex-row"
            onPress={handleNavigateBack}
          >
            <Ionicons name="arrow-back" size={20} color="#000" />
            <Text className="text-black">Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
