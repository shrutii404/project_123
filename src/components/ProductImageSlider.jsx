import { View, Image } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProductImageSlider = ({ images }) => {
  return (
    <View className="border-b pb-5 border-gray-200">
      <View className="rounded-md bg-white shadow-xl border border-slate-100  p-3">
        <View className="absolute top-1/2 z-50">
          <Ionicons name="chevron-back-circle" color="#adb5bd" size={30} />
        </View>
        <View className="absolute top-1/2 right-0 z-50">
          <Ionicons name="chevron-forward-circle" color="#adb5bd" size={30} />
        </View>
        <Image
          className="h-80 w-full bg-black "
          source={{
            uri: `${images[0]}`,
          }}
        />
      </View>
      <View className="flex-row mt-5">
        <View className="cursor-pointer border-2 p-2 border-[#dee2e6] rounded-md hover:bg-[#dee2e6] bg-[#dee2e6] grayscale transition-opacity duration-300">
          <Image
            className="h-16 w-16 bg-black "
            source={{
              uri: `${images[0]}`,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default ProductImageSlider;
