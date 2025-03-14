import { View, Text, Pressable } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeAccordian = ({ question, answer, isOpen, onToggle }) => {
  const handleExpand = () => {
    onToggle();
  };
  return (
    <View className="w-full items-center mt-5">
      <Pressable
        className="flex flex-row justify-between w-[85%] items-center"
        onPress={handleExpand}
      >
        <Text className={`text-black ${isOpen && 'underline'}`}>{question}</Text>

        {isOpen ? (
          <Ionicons name="chevron-down-outline" size={20} color="gray" className="font-light" />
        ) : (
          <Ionicons name="chevron-up-outline" size={20} color="gray" className="font-light" />
        )}
      </Pressable>
      <View className="w-[90%] ">
        {isOpen && <Text className="text-black text-center break-words mt-5">{answer}</Text>}
      </View>
      <View className="w-[90%] h-0.5 bg-gray-200 mt-6"></View>
    </View>
  );
};

export default HomeAccordian;
