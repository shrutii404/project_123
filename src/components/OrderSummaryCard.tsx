import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Truck, SpinnerGap } from 'phosphor-react-native';
import apiClient from '../context/apiClient';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Toast from 'react-native-toast-message';
import { apiEndpoint } from '../utils/constants';

const STORE_PINCODE = 248001;

const PINCODE_ERRORS = {
  invalid: 'Your saved address has an invalid or missing pincode. Please update your address.',
};

const AVAILABILITY_STATUS = {
  NOT_AVAILABLE: 2,
  NO_ADDRESS: 3,
};

const AVAILABILITY_STATUS_MESSAGES = {
  [AVAILABILITY_STATUS.NOT_AVAILABLE]: "We Don't Serve in this Area Yet.",
  [AVAILABILITY_STATUS.NO_ADDRESS]: 'Please add a shipping address to proceed with checkout.',
};

interface UserAddress {
  id?: string;
  addressId?: string;
  street: string;
  state: string;
  country: string;
  postalCode: string;
  city: string;
  selected?: boolean;
}

interface UserDetails {
  _id?: string;
  id?: string;
  name: string;
  phoneNo: string;
  addresses: UserAddress[];
}

interface OrderSummaryCardProps {
  setWebViewUrl: (url: string) => void;
  availability: number;
}

const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
  setWebViewUrl,
  availability: initialAvailability,
}) => {
  const { cart } = useCart();
  const { state: authState } = useAuth();
  const userId = authState.user?._id || authState.user?.id || 'me';
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [availability, setAvailability] = useState(initialAvailability);
  const [loadingUser, setLoadingUser] = useState(true);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [pincodeError, setPincodeError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoadingUser(true);
      try {
        const response = await apiClient.get(`${apiEndpoint}/users/${userId}`);
        setUserDetails(response.data);
      } catch (error) {
        setUserDetails(null);
        Toast.show({
          type: 'error',
          text1: 'Failed to fetch user details',
          text2: 'Please try again.',
          position: 'bottom',
        });
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUserDetails();
  }, [userId]);

  useEffect(() => {
    const checkAvailability = async (pincode: string | null) => {
      setCheckingAvailability(true);
      try {
        if (!pincode || isNaN(Number(pincode))) {
          setAvailability(AVAILABILITY_STATUS.NO_ADDRESS);
          setPincodeError(PINCODE_ERRORS.invalid);
          return;
        }
        setPincodeError(null);
        const api = `${apiEndpoint}/getDistance/isAvailable`;
        const response = await apiClient.post(api, {
          sourcePincode: STORE_PINCODE,
          destinationPincode: parseInt(pincode, 10),
        });
        if (response.data && response.data.isAvailable) {
          setAvailability(1);
        } else {
          setAvailability(AVAILABILITY_STATUS.NOT_AVAILABLE);
        }
      } catch (error) {
        setAvailability(AVAILABILITY_STATUS.NO_ADDRESS);
      } finally {
        setCheckingAvailability(false);
      }
    };

    if (userDetails && userDetails.addresses && userDetails.addresses.length > 0) {
      const selected =
        userDetails.addresses.find((a: any) => a.selected) || userDetails.addresses[0];
      if (selected && selected.postalCode) {
        checkAvailability(selected.postalCode);
      } else {
        setAvailability(AVAILABILITY_STATUS.NO_ADDRESS);
        setCheckingAvailability(false);
      }
    } else {
      setAvailability(AVAILABILITY_STATUS.NO_ADDRESS);
      setCheckingAvailability(false);
    }
  }, [userDetails]);

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  const savedPrice = cart
    .reduce((total, item) => {
      const discount = Number(item.attributes?.discountPrice) || 0;
      return total + (item.price - discount) * item.quantity;
    }, 0)
    .toFixed(2);

  const hasAddress = userDetails && userDetails.addresses && userDetails.addresses.length > 0;

  const handleCheckout = async () => {
    if (!userDetails) return;
    setCheckoutLoading(true);
    try {
      const api = `${apiEndpoint}/phonePay/order`;
      const response = await apiClient.post(api, {
        name: userDetails.name,
        amount: totalPrice,
        mobileNo: userDetails.phoneNo,
        userId: userDetails._id || userDetails.id,
        cartItems: cart.map((item) => ({
          productVariationId: item.id,
          quantity: item.quantity,
        })),
      });
      if (response.data.success) {
        const redirectUrl = response.data.data.instrumentResponse.redirectInfo.url;
        setWebViewUrl(redirectUrl);
        Toast.show({
          type: 'success',
          text1: 'Redirecting to payment...',
          position: 'bottom',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Payment initiation failed',
          text2: response.data.message || 'Please try again.',
          position: 'bottom',
        });
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Checkout Error',
        text2: error && error.message ? error.message : 'Something went wrong. Please try again.',
        position: 'bottom',
      });
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <View className="bg-white rounded-lg p-4 border border-gray-200">
      <View className="flex-row justify-between">
        <Text className="text-base font-bold text-black">Order Summary</Text>
      </View>
      <View className="flex-row mt-4 min-h-[64px]">
        {loadingUser ? (
          <View className="flex-1 flex-row justify-center items-center h-16">
            <ActivityIndicator size="small" color="#000" />
          </View>
        ) : (
          <>
            {cart.slice(0, 3).map((cartItem, i) => (
              <Image
                key={cartItem.id}
                source={{ uri: Array.isArray(cartItem.image) ? cartItem.image[0] : cartItem.image }}
                className={`w-28 h-28 rounded-md   ${i === 0 ? 'ml-0' : 'ml-2'}`}
              />
            ))}
            {cart.length > 3 && (
              <View className="w-28 h-28 rounded-md flex justify-center items-center bg-white border border-black ml-2">
                <Text className="font-bold text-black">+{cart.length - 2}</Text>
              </View>
            )}
          </>
        )}
      </View>
      <View className="flex-col gap-1 mt-8 min-h-[80px]">
        {loadingUser ? (
          <View className="flex-row justify-center items-center h-6">
            <ActivityIndicator size="small" color="#000" />
          </View>
        ) : (
          <>
            <View className="flex-row justify-between items-center">
              <Text className="text-sm text-gray-500">Price :</Text>
              <Text className="text-sm font-semibold text-gray-500">₹ {totalPrice}</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-sm text-gray-500">Discount on MRP :</Text>
              <Text className="text-sm font-semibold text-gray-500">₹ {savedPrice}</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-sm text-gray-500">Shipping Charges :</Text>
              <Text className="text-sm font-semibold text-gray-500">₹ 0</Text>
            </View>
          </>
        )}
      </View>
      <View className="h-px bg-gray-200 my-4" />
      <View className="flex-col gap-1 min-h-[60px]">
        {loadingUser ? (
          <View className="flex-row justify-center items-center h-6">
            <ActivityIndicator size="small" color="#000" />
          </View>
        ) : (
          <>
            <View className="flex-row justify-between items-center">
              <Text className="text-sm font-semibold text-gray-700">
                Total (inclusive of all taxes):
              </Text>
              <Text className="text-sm font-semibold text-gray-700">₹ {totalPrice}</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-sm text-gray-500">You Save:</Text>
              <Text className="text-sm font-semibold text-gray-500">₹ {savedPrice}</Text>
            </View>
          </>
        )}
      </View>
      <View className="h-px bg-gray-200 my-4" />
      {loadingUser ? (
        <View className="flex-row justify-center items-center mb-4 h-6">
          <ActivityIndicator size="small" color="#000" />
        </View>
      ) : checkingAvailability ? (
        <View className="flex-row justify-center items-center mb-4 h-6">
          <ActivityIndicator size="small" color="#000" />
          <Text className="ml-2 text-xs text-black">Checking delivery availability...</Text>
        </View>
      ) : pincodeError ? (
        <View className="flex-row rounded-full mb-4 bg-[#f7d7da] border border-[#f5a2ab] items-center px-4 py-2">
          <Truck size={20} weight="fill" color="#000" />
          <Text
            className="text-xs text-black flex-1 flex-shrink break-words ml-2"
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {pincodeError}
          </Text>
        </View>
      ) : AVAILABILITY_STATUS_MESSAGES[availability] ? (
        <View
          className={`flex-row rounded-full mb-4 bg-[#f7d7da] border border-[#f5a2ab] px-4 py-1 items-center${
            availability === AVAILABILITY_STATUS.NO_ADDRESS ? ' gap-2 items-start' : ''
          }`}
        >
          <Truck size={24} weight="fill" color="#000" />
          <Text
            className={`text-xs text-black${
              availability === AVAILABILITY_STATUS.NOT_AVAILABLE ? ' ml-3' : ''
            }`}
          >
            {AVAILABILITY_STATUS_MESSAGES[availability]}
          </Text>
        </View>
      ) : null}
      <TouchableOpacity
        className={`w-full flex-row items-center justify-center space-x-2 ${
          loadingUser ||
          !hasAddress ||
          availability === AVAILABILITY_STATUS.NOT_AVAILABLE ||
          availability === AVAILABILITY_STATUS.NO_ADDRESS ||
          checkoutLoading
            ? 'bg-gray-300'
            : 'bg-black'
        }  p-3 rounded-md`}
        disabled={
          loadingUser ||
          !hasAddress ||
          availability === AVAILABILITY_STATUS.NOT_AVAILABLE ||
          availability === AVAILABILITY_STATUS.NO_ADDRESS ||
          checkoutLoading
        }
        onPress={handleCheckout}
      >
        {checkoutLoading ? (
          <>
            <SpinnerGap size={24} color="#fff" weight="bold" />
            <Text className="text-white">Processing...</Text>
          </>
        ) : (
          <Text className="text-white">Checkout | ₹ {totalPrice}</Text>
        )}
      </TouchableOpacity>
      <View className="flex-col gap-4 mt-8 min-h-[40px]">
        {loadingUser ? (
          <View className="flex-row justify-center items-center h-10">
            <ActivityIndicator size="small" color="#000" />
          </View>
        ) : (
          <>
            <Text className="text-[10px] text-[#667085]">SECURE PAYMENTS PROVIDED BY</Text>
            <Image
              source={{
                uri: 'https://e-commerce-alpha-rouge.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FPhonePe.5c8ff022.png&w=3840&q=75',
              }}
              className="h-10 w-20 bg-white rounded-lg  "
            />
          </>
        )}
      </View>
    </View>
  );
};

export default OrderSummaryCard;
