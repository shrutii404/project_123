import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useLoginUserMutation, useVerifyUserMutation } from '../../store/slices/apiSlice';
import { useDispatch } from 'react-redux';
import { userSlice } from '../../store/slices/userSlice';
import { setUser } from '../../utils/user';

const LoginScreen: React.FC = ({ navigation }) => {
  const [phonenumber, setPhonenumber] = useState<string>('');
  const [verify, setVerify] = useState<boolean>(false);
  const [resend, setResend] = useState<boolean>(false);
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const [timer, setTimer] = useState(180); // 180 seconds = 3 minutes

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move focus to the next input box if text is entered
    if (text.length === 1 && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    // Move focus to the previous input box if text is deleted
    if (text.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  const [loginUser] = useLoginUserMutation();
  const [verifyUser] = useVerifyUserMutation();
  const dispatch = useDispatch();

  // Countdown Timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        if (timer == 1) {
          setResend(true);
        }
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handlePhonenumberChange = (inputText: string) => {
    setPhonenumber(inputText);
  };

  const handleNavigateBack = () => {
    navigation.navigate('Home');
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!verify) {
      const response = await loginUser({ phoneNo: phonenumber });
      if (response.error) {
        Alert.alert('Error', response.error.data.message);
      } else {
        ToastAndroid.show('OTP Sent Successfully', ToastAndroid.SHORT);
      }
      setVerify(true);
    } else {
      const response = await verifyUser({
        phoneNo: phonenumber,
        otp: otp.join(''),
      });
      if (response.error) {
        Alert.alert('Error', response.error.data.message);
      } else {
        ToastAndroid.show('Login Successfully', ToastAndroid.SHORT);
        const userDetails = response.data;
        await setUser(userDetails);
        dispatch(userSlice.actions.userLogin(userDetails.user));
      }

      navigation.navigate('Home');

      setVerify(false);
    }
    setLoading(false);
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
