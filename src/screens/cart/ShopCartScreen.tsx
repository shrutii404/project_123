import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Image, ScrollView } from 'react-native';
import CartPriceCard from '../../components/CartPriceCard';
import { CaretDown, CaretUp, SealPercent } from 'phosphor-react-native';
import CheckoutCart from '../../components/CheckoutCart';

const ShopCartScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  useEffect(() => {
    const user = null;
    if (!user) {
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log('Hurla Hardware | Cart');
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView>
      <View className="h-full bg-white">
        <View className="  mt-8 w-full items-center">
          <View className="flex-1 rounded-md border-t-0 w-full items-center">
            <TouchableOpacity
              className=" px-4 border p-3 w-[90%] rounded border-gray-200 flex-row items-center justify-between"
              onPress={() => setIsAccordionOpen((prev) => !prev)}
            >
              <View className="flex-row items-center">
                <SealPercent size={32} weight="fill" color="black" />
                <Text className="flex font-semibold text-lg ml-3 text-black">
                  {isAccordionOpen ? 'OFFER AVAILABLE' : 'OFFER AVAILABLE SOON'}
                </Text>
              </View>

              {!isAccordionOpen ? (
                <CaretDown size={20} color="gray" />
              ) : (
                <CaretUp size={20} color="gray" />
              )}
            </TouchableOpacity>
            {isAccordionOpen && (
              <View className="p-4 w-[85%]">
                <Text className="text-gray-500">
                  This offer is coming soon! Stay tuned for details on how you can benefit from this
                  exciting product discount.
                </Text>
              </View>
            )}
          </View>
          <CheckoutCart />
          <View className="border rounded p-4 border-gray-200 mt-2 w-[90%]">
            <CartPriceCard />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ShopCartScreen;
