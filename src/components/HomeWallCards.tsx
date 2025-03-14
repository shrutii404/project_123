import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { placeHolderImage } from '../utils/constants';

const HomeWallCards = ({ data }) => {
  const image = {
    uri: data.children[0].parent.images[0] ? data.children[0].parent.images[0] : placeHolderImage,
  };

  return (
    <View className="w-full mb-4">
      <ImageBackground
        source={image}
        className="flex  justify-end items-center w-full h-60 rounded-lg "
        imageStyle={{ borderRadius: 7 }}
      >
        <View className="p-4 gap-2">
          <Text className="text-xs text-white">Massive Savings on</Text>
          <Text className="font-semibold text-[#936639]">{data.name}</Text>
          <View className="flex-row items-center ">
            <Text className="mr-1 text-white text-xs">Show All</Text>
            <Ionicons name="arrow-forward" color="#fff" size={20} className="font-light" />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default HomeWallCards;
