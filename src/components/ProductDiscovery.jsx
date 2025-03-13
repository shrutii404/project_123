import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import React from 'react';

const ProductDiscovery = ({ Type, category, data, imageData, handlePress }) => {
  return (
    <View className="items-center my-10">
      <Text className="text-lg font-bold text-gray-800">
        Discover Our <Text className="text-[#af926a]">Type</Text> Options
      </Text>
      <Text className="mt-2 text-xs text-gray-600">
        Explore the variety of <Text className="font-semibold">Types</Text> available just for you
      </Text>
      <ScrollView horizontal className="flex flex-row gap-3 mt-3 ml-2">
        {data.children[0].valuesAvailable.length > 0 &&
          data.children[0].valuesAvailable.map((item) => {
            return (
              <Pressable className="items-center" onPress={() => handlePress(item, data.name)}>
                <Image
                  className="h-20 w-20 bg-black rounded-xl"
                  source={{
                    uri: `${imageData[item]?.image}`,
                  }}
                />
                <Text className="text-gray-800 text-[10px] font-medium mt-1">{item}</Text>
              </Pressable>
            );
          })}
      </ScrollView>
      <View className="items-center">
        <Text className="text-black text-2xl font-medium mt-8">{category}</Text>
        <Text className="text-black text-lg font-medium mt-2">{Type}</Text>
      </View>
    </View>
  );
};

export default ProductDiscovery;
