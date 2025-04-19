import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Truck, SpinnerGap } from 'phosphor-react-native';
import { useSelector } from 'react-redux';
import apiClient from '../context/apiClient';

const OrderSummaryCard = ({ setWebViewUrl, availability }) => {
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [address] = useState([]);

  const userDetails = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart.items);

  // Calculate total price and saved price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  const savedPrice = cart
    .reduce((total, item) => total + (item.price - item.discountPrice) * item.quantity, 0)
    .toFixed(2);

  const handleCheckout = async () => {
    setCheckoutLoading(true);

    try {
      const response = await apiClient.post('/phonepe/payment', {
        name: userDetails.name,
        amount: totalPrice,
        mobileNo: userDetails.phoneNo,
        userId: userDetails.id,
        cartItems: cart.map((item) => ({
          productVariationId: item.productId,
          quantity: item.quantity,
        })),
      });

      if (response.data.success) {
        const redirectUrl = response.data.data.instrumentResponse.redirectInfo.url;

        setWebViewUrl(redirectUrl);
      } else {
        console.error('Payment initiation failed:', response.data.message);
        // Handle payment initiation failure (e.g., show an error message to the user)
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      // Handle error (e.g., show an error message to the user)
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <View className="bg-white rounded-lg p-4 border border-gray-200">
      <View className="flex-row justify-between">
        <Text className="text-base font-bold text-black">Order Summary</Text>
      </View>
      <View className="flex-row mt-4">
        {cart.slice(0, 3).map((cartItem, i) => (
          <Image
            key={cartItem.productId}
            source={{ uri: cartItem.images[0] }}
            className={`w-16 h-16 rounded-md   ${i === 0 ? 'ml-0' : 'ml-2'}`}
          />
        ))}
        {cart.length > 3 && (
          <View className="w-16 h-16 rounded-md flex justify-center items-center bg-white border border-black ml-2">
            <Text className="font-bold text-black">+{cart.length - 2}</Text>
          </View>
        )}
      </View>
      <View className="flex-col gap-1 mt-8">
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
      </View>
      <View className="h-px bg-gray-200 my-4" />
      <View className="flex-col gap-1">
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
      </View>
      <View className="h-px bg-gray-200 my-4" />
      {availability === 2 && (
        <View className="flex-row rounded-full mb-4 bg-[#f7d7da] border border-[#f5a2ab] px-4 py-1 items-center">
          <Truck size={24} weight="fill" color="#000" />
          <Text className="text-xs   text-black ml-3">We Don't Serve in this Area Yet.</Text>
        </View>
      )}
      {availability === 3 && (
        <View className="flex-row gap-2 rounded-full mb-4 bg-[#f7d7da] border border-[#f5a2ab] px-4 py-1 items-start">
          <Truck size={24} weight="fill" color="#000" />
          <Text className="text-xs text-black">
            Please add a shipping address to proceed with checkout.
          </Text>
        </View>
      )}
      <TouchableOpacity
        className={`w-full flex-row items-center justify-center space-x-2 ${
          address === null || availability === 2 || availability === 3 || checkoutLoading
            ? 'bg-gray-300'
            : 'bg-black'
        }  p-3 rounded-md`}
        disabled={address === null || availability === 2 || availability === 3 || checkoutLoading}
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
      <View className="flex-col gap-4 mt-8">
        <Text className="text-[10px] text-[#667085]">SECURE PAYMENTS PROVIDED BY</Text>
        <Image
          source={{
            uri: 'https://e-commerce-alpha-rouge.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FPhonePe.5c8ff022.png&w=3840&q=75',
          }}
          className="h-10 w-20 bg-white rounded-lg  "
        />
      </View>
    </View>
  );
};

export default OrderSummaryCard;
