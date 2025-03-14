import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const HomeSubsection = ({ data, imageData }) => {
  const navigation = useNavigation();
  const handlePress = (Type, category) => {
    navigation.navigate('Products', {
      data: { Type, category, data, imageData },
    });
  };

  return (
    <View className="w-full ">
      <View className="flex flex-row justify-between w-[90%] mt-8 ml-5">
        <Text className="text-black font-semibold">{data.name}</Text>
      </View>
      <ScrollView horizontal>
        <View className="flex flex-row gap-3 mt-3 ml-2 items-start justify-start">
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
        </View>
      </ScrollView>
      <View className="bg-gray-200 w-full h-0.5 mt-8 "></View>
    </View>
  );
};

export default HomeSubsection;
