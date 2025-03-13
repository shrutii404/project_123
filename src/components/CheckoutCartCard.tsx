import { XCircle } from 'phosphor-react-native';
import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';

const CheckoutCartCard = ({
  id,
  price,
  quantity,
  name,
  images,
  attributes,
  removeFromCart,
  increment,
  decrement,
  stock,
}) => {
  const handleQuantityIncrement = () => {
    increment(id);
  };

  const handleQuantityDecrement = () => {
    decrement(id);
  };

  return (
    <View className="flex flex-row items-start mb-2 border-b border-gray-200 pb-4 ">
      <Image
        source={{
          uri: images[0],
        }} // Fallback image if none is available
        className="w-28 h-28 rounded-md"
      />
      <View className="flex-1 ml-2">
        <View className="flex flex-row justify-between items-start">
          <Text className="text-base font-medium text-black">{name}</Text>
          <TouchableOpacity onPress={() => removeFromCart(id)}>
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
