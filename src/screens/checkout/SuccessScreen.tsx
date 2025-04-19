import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import Confetti from 'react-native-confetti';
import { ArrowLeft, Check } from 'phosphor-react-native';

import { useNavigation } from '@react-navigation/native';
import { useCart } from '../../context/CartContext';

const CheckoutSuccess = () => {
  const { clearCart } = useCart();
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
  const [windowHeight, setWindowHeight] = useState(Dimensions.get('window').height);

  const navigation = useNavigation();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(Dimensions.get('window').width);
      setWindowHeight(Dimensions.get('window').height);
    };

    Dimensions.addEventListener('change', handleResize);

    return () => {
      Dimensions.removeEventListener('change', handleResize);
    };
  }, []);

  return (
    <View className="absolute top-0 left-0 w-full h-full bg-white/90 flex items-center justify-center p-5">
      {windowWidth > 0 && windowHeight > 0 && (
        <Confetti width={windowWidth} height={windowHeight} />
      )}

      <View className="bg-white rounded-lg p-4 border border-gray-200 flex flex-col items-center justify-center gap-6">
        <View className="relative w-24 h-24 flex items-center justify-center bg-purple-600 rounded-full">
          <Check size={40} color="white" className="absolute" />
        </View>
        <Text className="text-xl font-semibold text-gray-700">Congratulations!</Text>
        <Text className="text-md md:text-2xl text-center">
          Your order has been placed successfully. Thank you for shopping with us!
        </Text>
      </View>

      <View className="w-full max-w-md border-t-2 border-dotted mt-12 pt-4 flex items-center justify-center">
        <TouchableOpacity
          onPress={() => {
            clearCart();
            navigation.navigate('Home');
          }}
          className="flex-row items-center gap-2 p-3 border border-black rounded-full"
        >
          <ArrowLeft size={24} color="black" />
          <Text className="text-lg text-black">Go Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckoutSuccess;
