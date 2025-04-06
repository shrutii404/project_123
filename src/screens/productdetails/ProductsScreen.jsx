import { View, Text, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import ProductDiscovery from '../../components/ProductDiscovery';
import ProductsCard from '../../components/ProductsCard';
import axios from 'axios';
import ShimmerEffect from '../../components/ShimmerEffect';
import SearchBar from '../../components/SearchBar';
import { useSearchBox } from '../../context/SearchContext';
import { apiEndpoint } from '../../utils/constants';
import { useNavigation } from '@react-navigation/native';
import { useApiError } from '../../core/hooks/useApiError';
import { getErrorMessage } from '../../core/error-handling/errorMessages';

const ProductsScreen = ({ route }) => {
  const [loading, setLoading] = useState(false);
  const [childrenData, setChildrenData] = useState([]);
  const { searchVisible } = useSearchBox();
  const navigation = useNavigation();
  const { error: apiError, handleError, clearError } = useApiError();

  const { Type, category, data, imageData } = route.params.data;
  const imageuri = { uri: data.image };

  const getChildrenData = async (currentType, currentCategory) => {
    try {
      setLoading(true);
      const url = `${apiEndpoint}api/product-variations?${imageData[currentType].attributeType}=${currentType}&category=${currentCategory}`;
      const response = await axios.get(url);
      if (response.data) {
        setChildrenData(response.data);
        clearError();
      }
    } catch (error) {
      handleError('NETWORK_ERROR');
      console.error('Error fetching children data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getChildrenData(Type, category);
  }, [Type, category]);

  if (apiError) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-red-500 text-center mb-2">
          {getErrorMessage(apiError)}
        </Text>
        <TouchableOpacity
          className="bg-blue-500 px-4 py-2 rounded"
          onPress={() => {
            clearError();
            getChildrenData(Type, category);
          }}
        >
          <Text className="text-white">Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handlePress = (currentType, currentCategory) => {
    navigation.navigate('Products', {
      data: { Type: currentType, category: currentCategory, data, imageData },
    });
  };

  return (
    <ScrollView className="w-full h-full bg-white">
      {!loading ? (
        <View className="w-full h-full">
          <SearchBar searchVisible={searchVisible} />
          <ImageBackground
            source={imageuri}
            className="flex justify-between w-full h-96 rounded-lg "
          >
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
            {childrenData &&
              childrenData.map((item, index) => {
                return <ProductsCard data={item} key={index} />;
              })}
          </View>
        </View>
      ) : (
        <View className="w-full ">
          <ShimmerEffect />
        </View>
      )}
    </ScrollView>
  );
};

export default ProductsScreen;
