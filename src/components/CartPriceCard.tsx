import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
// Removed all dependencies

const CartPriceCard = () => {
  const navigation = useNavigation();
  const cart = useSelector((state) => state.cart.items);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const savedPrice = cart.reduce((a, b) => a + (b.price - b.discountPrice), 0);
  const [availability, setAvailability] = useState<number>(0);
  const [pincode, setPincode] = useState<string>('');

  const isValidIndianPincode = (pincode: string): boolean => {
    const pincodePattern = /^[0-9]{6}$/;
    return pincodePattern.test(pincode);
  };

  const checkAvailability = () => {
    if (!isValidIndianPincode(pincode)) {
      Alert.alert('Please enter a valid 6-digit Indian pincode.');
      return;
    }
    // Simulate availability check
    setAvailability(1); // Assume available for demo
  };

  return (
    <View className="flex flex-col gap-2">
      <View className="flex flex-col ">
        <Text className="font-semibold text-base text-black">PRICE DETAILS (1)</Text>

        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-sm font-normal text-black">Price</Text>
          <Text className="font-semibold text-sm text-black">₹ {totalPrice.toFixed(2)}</Text>
        </View>
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-sm font-normal text-black">Discount on MRP</Text>
          <Text className="font-semibold text-sm text-black">₹ {savedPrice?.toFixed(2)}</Text>
        </View>
        <View className="flex-row justify-between items-center mt-2 border-b border-gray-300 pb-2">
          <Text className="text-sm font-normal text-black">Shipping Charges</Text>
          <Text className="font-semibold text-sm text-black">₹ 0.00</Text>
        </View>

        {/* <View className="flex gap-2">
          <TextInput
            className="w-full border rounded-md px-2 py-1 text-sm text-black"
            placeholder="Enter Pin Code"
            value={pincode}
            onChangeText={setPincode}
          />
          <TouchableOpacity
            className="bg-[#c7c8ca] text-black hover:bg-[#a0a0a0] px-4 py-2 rounded"
            onPress={checkAvailability}>
            <Text className="text-black">Enter Pin Code</Text>
          </TouchableOpacity>
        </View> */}

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

      <View className="flex flex-col ">
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-sm font-semibold text-black">Total (inclusive of all taxes):</Text>
          <Text className="font-semibold text-sm text-black">₹ {totalPrice.toFixed(2)}</Text>
        </View>
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-sm font-normal text-gray-500">You Save</Text>
          <Text className="font-semibold text-sm text-gray-500">₹ 0.00</Text>
        </View>

        <TouchableOpacity
          className="w-full bg-black py-2 rounded mt-2"
          onPress={() => navigation.navigate('Checkout')}
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
            className="h-10 w-20 bg-white rounded-lg  "
          />
        </View>
      </View>
    </View>
  );
};

export default CartPriceCard;
