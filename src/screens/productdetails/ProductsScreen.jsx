import { View, Text, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import ProductDiscovery from '../../components/ProductDiscovery';
import ProductsCard from '../../components/ProductsCard';
import ShimmerEffect from '../../components/ShimmerEffect';
import { useNavigation } from '@react-navigation/native';
import { useApiError } from '../../core/hooks/useApiError';
import { getErrorMessage } from '../../core/error-handling/errorMessages';
import { useProductVariations } from '../../context/ProductVariation';

const ProductsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { error: apiError, clearError } = useApiError();
  const { state: productState, getProductVariationsByQuery } = useProductVariations();

  const { Type, category, data, imageData } = route.params.data;
  const imageuri = { uri: data.image };
  const products = productState.queriedProductVariations;

  useEffect(() => {
    getProductVariationsByQuery({
      key: imageData[Type].attributeType,
      value: Type,
      category,
    });
    clearError();
  }, [Type, category, imageData]);

  if (apiError) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-red-500 text-center mb-2">{getErrorMessage(apiError)}</Text>
        <TouchableOpacity
          className="bg-blue-500 px-4 py-2 rounded"
          onPress={() => {
            clearError();
            getProductVariationsByQuery({ category });
          }}
        >
          <Text className="text-white">Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (productState.loading) {
    return <ShimmerEffect />;
  }

  const handlePress = (currentType, category) => {
    navigation.navigate('Products', {
      data: { Type: currentType, category, data, imageData },
    });
  };

  return (
    <ScrollView className="w-full h-full bg-white">
      <ImageBackground source={imageuri} className="flex justify-between w-full h-96 rounded-lg ">
        <View className="bg-[#af926a] flex items-center py-2 w-[30%] rounded-br-lg">
          <Text className="font-medium text-white">{Type}</Text>
        </View>
        <View className="flex flex-col items-center mb-8">
          <Text className="text-lg font-medium text-white">Add A Touch of Luxury To Your </Text>
          <Text className="text-lg font-medium text-white">
            Funiture With <Text className="text-[#af926a]">{Type + ' ' + category}</Text>
          </Text>
        </View>
      </ImageBackground>
      <ProductDiscovery
        Type={Type}
        category={category}
        data={data}
        imageData={imageData}
        handlePress={handlePress}
      />
      <View className="items-center w-full">
        {products.length > 0 ? (
          products.map((item, index) => <ProductsCard data={item} key={index} />)
        ) : (
          <Text className="text-center text-gray-500">No products found.</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default ProductsScreen;
