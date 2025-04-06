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
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  useLoginUserMutation,
  useVerifyUserMutation,
  useResendOTPMutation,
} from '../../store/slices/apiSlice';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { LoginResponse } from '../../types/auth';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../store/slices/userSlice';
import { setUser } from '../../utils/user';
import { LoginScreenProps } from '../../types/auth';

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [phonenumber, setPhonenumber] = useState<string>('');
  const [verify, setVerify] = useState<boolean>(false);
  const [resend, setResend] = useState<boolean>(false);
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [loading, setLoading] = useState<boolean>(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [timer, setTimer] = useState<number>(180); // 180 seconds = 3 minutes

  const [loginUser] = useLoginUserMutation();
  const [verifyUser] = useVerifyUserMutation();
  const dispatch = useDispatch();

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
    } else {
      navigation.navigate('Home');
    }
  };

  // Helper function to extract error message from API error
  const getErrorMessage = (error: FetchBaseQueryError | SerializedError | undefined): string => {
    if (!error) return 'Unknown error occurred';
    
    if ('status' in error) {
      // It's a FetchBaseQueryError
      const fetchError = error as FetchBaseQueryError;
      return (fetchError.data as any)?.message || 'An error occurred with the request';
    }
    
    // It's a SerializedError
    return error.message || 'An unexpected error occurred';
  };

  const handleResendOTP = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await loginUser({ phoneNo: phonenumber });
      
      if ('error' in response) {
        Alert.alert('Error', getErrorMessage(response.error));
      } else {
        setTimer(180);
        setResend(false);
        ToastAndroid.show('OTP Resent Successfully', ToastAndroid.SHORT);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      setLoading(true);
      
      if (!verify) {
        if (!validatePhoneNumber(phonenumber)) {
          Alert.alert('Error', 'Please enter a valid 10-digit phone number');
          return;
        }

        const response = await loginUser({ phoneNo: phonenumber });
        if ('error' in response) {
          Alert.alert('Error', getErrorMessage(response.error));
          return;
        }
        
        setVerify(true);
        setTimer(180);
        ToastAndroid.show('OTP Sent Successfully', ToastAndroid.SHORT);
      } else {
        const otpValue = otp.join('');
        if (otpValue.length !== 6) {
          Alert.alert('Error', 'Please enter a valid 6-digit OTP');
          return;
        }

        const response = await verifyUser({
          phoneNo: phonenumber,
          otp: otpValue,
        });

        if ('error' in response) {
          Alert.alert('Error', getErrorMessage(response.error));
          return;
        }

        // Type assertion to access the data safely
        const responseData = response.data as LoginResponse;
        
        if (!responseData?.token || !responseData?.user) {
          Alert.alert('Error', 'Invalid response from server');
          return;
        }

        // Extract user details from response
        const userData = {
          token: responseData.token,
          user: {
            id: responseData.user._id,
            _id: responseData.user._id,
            phoneNo: responseData.user.phoneNo || phonenumber,
            name: responseData.user.name || '',
            isAdmin: responseData.user.isAdmin || false,
            email: responseData.user.email,
            address: responseData.user.address,
            FavouriteProd: responseData.user.FavouriteProd || []
          }
        };

        // First update Redux state
        dispatch(userLogin({
          id: response.data.user.id,
          phoneNo: response.data.user.phoneNo || phonenumber,
          name: response.data.user.name || 'User',
          email: response.data.user.email,
          address: response.data.user.address,
          FavouriteProd: response.data.user.FavouriteProd || []
        }));
        
        // Then persist to storage
        await setUser(userData);
        
        ToastAndroid.show('Login Successful', ToastAndroid.SHORT);
        navigation.navigate('Home');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
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
              onPress={handleSubmit}
            >
              <Text className="text-black ">Resend</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            className="bg-black mt-2 w-full p-3 items-center rounded-md "
            onPress={handleSubmit}
          >
            {loading ? (
              <ActivityIndicator />
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
