import { XCircle } from 'phosphor-react-native';
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

interface CheckoutCartCardProps {
  productId: number;
  price: number;
  quantity: number;
  name: string;
  images: string[];
  attributes: Record<string, string>;
  removeFromCart: (productId: number) => void;
  increment: (productId: number) => void;
  decrement: (productId: number) => void;
  stock?: number;
}

const CheckoutCartCard = ({
  productId,
  price,
  quantity,
  name,
  images,
  attributes,
  removeFromCart,
  increment,
  decrement,
  stock = 99,
}: CheckoutCartCardProps) => {
  const handleQuantityIncrement = () => {
    increment(productId);
  };

  const handleQuantityDecrement = () => {
    decrement(productId);
  };

  return (
    <View className="flex flex-row items-start mb-2 border-b border-gray-200 pb-4">
      <Image
        source={{
          uri: images[0],
        }}
        className="w-28 h-24 rounded-md"
      />
      <View className="flex-1">
        <View className="flex flex-row justify-between items-start">
          <Text className="text-base font-medium text-black">{name}</Text>
          <TouchableOpacity onPress={() => removeFromCart(productId)}>
            <XCircle size={24} color="#6c757d" />
          </TouchableOpacity>
        </View>
        <View>
          {Object.keys(attributes).map((key) => (
            <Text key={key} className="text-xs text-[#6c757d]">
              <Text className="text-gray-400">{key}</Text>: {attributes[key]}
            </Text>
          ))}
        </View>
        <View className="flex flex-row justify-between items-center">
          <Text className="text-sm text-[#6c757d]">
            MRP: <Text className="text-black">₹{price * quantity}</Text>
          </Text>
          <View className="flex flex-row items-center">
            <TouchableOpacity onPress={handleQuantityDecrement} disabled={quantity === 1}>
              <Text
                className={`p-1 px-3 bg-white border border-[#dee2e6] text-[#6c757d] ${
                  quantity === 1 ? 'text-gray-500 cursor-not-allowed' : ''
                }`}
              >
                -
              </Text>
            </TouchableOpacity>
            <Text className="text-[#6c757d] p-1 px-3 border-t border-b border-[#dee2e6]">
              {quantity}
            </Text>
            <TouchableOpacity onPress={handleQuantityIncrement} disabled={quantity === stock}>
              <Text
                className={`p-1 px-3 bg-white border border-[#dee2e6] text-[#6c757d] ${
                  quantity === stock ? 'text-gray-500 cursor-not-allowed' : ''
                }`}
              >
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CheckoutCartCard;
