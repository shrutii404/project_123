import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ProductDiscovery from '../../components/ProductDiscovery';
import ProductsCard from '../../components/ProductsCard';
import HomeFooter from '../../components/HomeFooter';
import LinearGradient from 'react-native-linear-gradient';
import {createGradientShimmer} from 'react-native-gradient-shimmer';

import {useGetProductVariationsQuery} from '../../store/slices/apiSlice';
import axios from 'axios';
import ShimmerEffect from '../../components/ShimmerEffect';
import SearchBar from '../../components/SearchBar';
import {useSearchBox} from '../../context/SearchContext';
import SearchLoader from '../../components/SearchLoader';

// const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const ShimmerPlaceholder = createGradientShimmer({
  backgroundColor: '#edf5fd',
  highlightColor: '#f1f7fe',
  LinearGradientComponent: LinearGradient,
});

const screenWidth = Dimensions.get('window').width;

const ProductsScreen = ({route, navigation}) => {
  const [loading, setLoading] = useState(false);
  const [childrenData, setChildrenData] = useState([]);
  const {searchVisible} = useSearchBox();

  const {Type, category, data, imageData} = route.params.data;

  const imageuri = {uri: data.image};

  const getChildrenData = async () => {
    try {
      setLoading(true);

      const url = `https://ecommercedev-production.up.railway.app/api/product-variations?${
        imageData[Type].attributeType + '=' + Type
      }&category=${category}`;

      const response = await axios.get(url);
      if (response.data) {
        setChildrenData(response.data);
      }
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error('Error fetching children data:', error);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  useEffect(() => {
    if (Type && category) {
      getChildrenData(Type, category);
    }
  }, [Type, category]);

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
          />
          <View className="items-center w-full">
            {childrenData &&
              childrenData.map((item, index) => {
                return (
                  <ProductsCard
                    data={item}
                    key={index}
                    key={`product-${index}`}
                  />
                );
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
