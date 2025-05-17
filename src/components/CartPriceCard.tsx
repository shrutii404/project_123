import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import apiClient from '../context/apiClient';

const CartPriceCard = () => {
  const navigation = useNavigation();
  const { cart } = useCart();
  const { state: authState } = useAuth();
  const userId = authState.user?._id || authState.user?.id;
  const [availability, setAvailability] = useState<number>(0);
  const [pincode, setPincode] = useState<string>('');

  useEffect(() => {
    const fetchUserAddress = async () => {
      if (!userId) return;
      try {
        const response = await apiClient.get(`/users/${userId}`);
        const addresses = response.data.addresses || [];
        if (addresses.length > 0) {
          const selected = addresses.find((a: any) => a.selected) || addresses[0];
          setPincode(selected.postalCode || '');
          if (selected.postalCode) {
            try {
              const availResp = await apiClient.get(
                `/distance?destinationPincode=${selected.postalCode}&sourcePincode=248001`
              );
              setAvailability(availResp.data.isAvailable ? 1 : 2);
            } catch (err) {
              setAvailability(0);
            }
          }
        }
      } catch (error) {}
    };
    fetchUserAddress();
  }, [userId]);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const savedPrice = cart.reduce(
    (a, b) =>
      a +
      (b.price - (b.attributes?.discountPrice ? Number(b.attributes.discountPrice) : 0)) *
        b.quantity,
    0
  );

  return (
    <View className="flex flex-col gap-2">
      <View className="flex flex-col">
        <Text className="font-semibold text-base text-black">PRICE DETAILS ({cart.length})</Text>
        {pincode ? (
          <View className="flex-row items-center mt-2">
            <Text className="text-sm font-normal text-black">Shipping to Pincode:</Text>
            <Text className="font-semibold text-sm text-black ml-2">{pincode}</Text>
          </View>
        ) : null}
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-sm font-normal text-black">Price</Text>
          <Text className="font-semibold text-sm text-black">₹ {totalPrice.toFixed(2)}</Text>
        </View>
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-sm font-normal text-black">Discount on MRP</Text>
          <Text className="font-semibold text-sm text-black">₹ {savedPrice.toFixed(2)}</Text>
        </View>
        <View className="flex-row justify-between items-center mt-2 border-b border-gray-300 pb-2">
          <Text className="text-sm font-normal text-black">Shipping Charges</Text>
          <Text className="font-semibold text-sm text-black">₹ 0.00</Text>
        </View>
        {availability > 0 && (
          <View
            className={`flex gap-2 rounded-full ${
              availability === 1 ? 'bg-[#d9ed92]' : 'bg-[#f7d7da]'
            } w-fit px-4 py-1 items-center`}
          >
            <Text className="text-sm font-light text-black">
              {availability === 1
                ? 'Delivery is available to this pincode.'
                : "We Don't Serve in this Area Yet."}
            </Text>
          </View>
        )}
      </View>
      <View className="flex flex-col">
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-sm font-semibold text-black">Total (inclusive of all taxes):</Text>
          <Text className="font-semibold text-sm text-black">₹ {totalPrice.toFixed(2)}</Text>
        </View>
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-sm font-normal text-gray-500">You Save</Text>
          <Text className="font-semibold text-sm text-gray-500">₹ {savedPrice.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          className="w-full bg-black py-2 rounded mt-2"
          onPress={() => (navigation as any).navigate('Checkout')}
          disabled={cart.length === 0}
        >
          <Text className="text-white text-center">Checkout | ₹ {totalPrice.toFixed(2)}</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-col gap-4 mt-8">
        <Text className="text-xs text-[#667085]">SECURE PAYMENTS PROVIDED BY</Text>
        <View className="flex flex-row border border-gray-200 items-center justify-center w-[30%]">
          <Image
            source={{
              uri: 'https://e-commerce-alpha-rouge.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FPhonePe.5c8ff022.png&w=3840&q=75',
            }}
            className="h-10 w-20 bg-white rounded-lg"
          />
        </View>
      </View>
    </View>
  );
};

export default CartPriceCard;
