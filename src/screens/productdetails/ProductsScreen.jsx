import {View, Text, ImageBackground, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import ProductDiscovery from '../../components/ProductDiscovery';
import ProductsCard from '../../components/ProductsCard';
import axios from 'axios';
import ShimmerEffect from '../../components/ShimmerEffect';
import SearchBar from '../../components/SearchBar';
import {useSearchBox} from '../../context/SearchContext';
import {apiEndpoint} from '../../utils/constants';
import {useNavigation} from '@react-navigation/native';

const ProductsScreen = ({route}) => {
  const [loading, setLoading] = useState(false);
  const [childrenData, setChildrenData] = useState([]);
  const {searchVisible} = useSearchBox();
  const navigation = useNavigation();

  const {Type, category, data, imageData} = route.params.data;
  const imageuri = {uri: data.image};

  const getChildrenData = async (currentType, currentCategory) => {
    try {
      setLoading(true);
      const url = `${apiEndpoint}api/product-variations?${imageData[currentType].attributeType}=${currentType}&category=${currentCategory}`;
      const response = await axios.get(url);
      if (response.data) {
        setChildrenData(response.data);
      }
    } catch (error) {
      console.error('Error fetching children data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getChildrenData(Type, category);
  }, [Type, category]);

  const handlePress = (currentType, currentCategory) => {
    navigation.navigate('Products', {
      data: {Type: currentType, category: currentCategory, data, imageData},
    });
  };

  return (
    <ScrollView className="w-full h-full bg-white">
      {!loading ? (
        <View className="w-full h-full">
          <SearchBar searchVisible={searchVisible} />
          <ImageBackground
            source={imageuri}
            className="flex justify-between w-full h-96 rounded-lg ">
            <View className="bg-[#af926a] flex items-center py-2 w-[30%] rounded-br-lg">
              <Text className="font-medium text-white">{Type}</Text>
            </View>
            <View className="flex flex-col items-center mb-8">
              <Text className="text-lg font-medium text-white">
                Add A Touch of Luxury To Your{' '}
              </Text>
              <Text className="text-lg font-medium text-white">
                Funiture With{' '}
                <Text className="text-[#af926a]">{Type + ' ' + category}</Text>
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
          {/* <HomeFooter /> */}
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
