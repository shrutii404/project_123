import React from 'react';
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import HomeSubsection from '../../components/HomeSubsection';
import HomeWallCards from '../../components/HomeWallCards';
import HomeCarousel from '../../components/HomeCarousel';
import { Category, useCategory } from '../../context/CategoryContext';
import { useProductVariations } from '../../context/ProductVariation';
import { useEffect, useState } from 'react';
import ShimmerEffect from '../../components/ShimmerEffect';
import SearchBar from '../../components/SearchBar';
import { useSearchBox } from '../../context/SearchContext';
import { placeHolderImageSquare } from '../../utils/constants';
import { useApiError } from '../../core/hooks/useApiError';
import { getErrorMessage } from '../../core/error-handling/errorMessages';

interface IParentData {
  name: string;
  children: Category[];
  image: string;
  id: number;
}

function HomeScreen() {
  const { error: apiError, handleError, clearError } = useApiError();
  const [parentdata, setParentdata] = useState<IParentData[]>([]);
  const [imageData, setImageData] = useState({});
  const { searchVisible } = useSearchBox();
  const { state: catState, getAllCategories } = useCategory();
  const { state: prodVarState, getAllProductVariations } = useProductVariations();
  const categories = catState.categories;
  const categoryLoading = catState.loading;
  const categoriesError = catState.error;
  const products = prodVarState.productVariations;
  const productLoading = prodVarState.loading;
  const productsError = prodVarState.error;

  useEffect(() => {
    if (categoriesError || productsError) {
      handleError('NETWORK_ERROR');
    }
  }, [categoriesError, productsError, handleError]);

  useEffect(() => {
    if (categories && products) {
      if (categoryLoading || productLoading) return;

      if (Array.isArray(categories) && Array.isArray(products)) {
        const parent = categories.filter((category) => category.parentId == null);
        parent.sort((a, b) => a.id - b.id);

        const result = parent.map((parentItem) => {
          const children = categories
            .filter((child) => child.parentId === parentItem.id)
            .sort((a, b) => a.id - b.id);
          return {
            name: parentItem.name,
            children: children.length > 0 ? [children[0]] : [],
            image: parentItem.images[0],
            id: parentItem.id,
          };
        });

        setParentdata(result);

        const tempimageData: Record<
          string,
          { image: string; attributeType: string; attribute: string }
        > = {};
        const attributeTypes = result.flatMap((r) => r.children.map((child) => child.name));

        result.forEach((parentItem) => {
          if (parentItem.children.length > 0) {
            const valuesAvailable = parentItem.children[0]?.valuesAvailable || [];
            valuesAvailable.forEach((value) => {
              const matchingItem = products.find((item) => {
                return (
                  item.attributes && attributeTypes.some((type) => item.attributes[type] === value)
                );
              });
              if (matchingItem) {
                const matchedAttributeType = attributeTypes.find(
                  (type) => matchingItem.attributes[type] === value
                );
                tempimageData[value] = {
                  image: matchingItem.images[0] ?? placeHolderImageSquare,
                  attributeType: matchedAttributeType ?? '',
                  attribute: value,
                };
              }
            });
          }
        });

        setImageData(tempimageData);
      }
    }
  }, [categories, products, categoryLoading, productLoading]);

  if (apiError) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-red-500 text-center mb-2">{getErrorMessage(apiError)}</Text>
        <TouchableOpacity
          className="bg-blue-500 px-4 py-2 rounded"
          onPress={() => {
            clearError();
            getAllCategories();
            getAllProductVariations();
          }}
        >
          <Text className="text-white">Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (categoryLoading || productLoading) {
    return (
      <View className="flex-1 bg-white">
        <ShimmerEffect />
      </View>
    );
  }

  if (!categories || categories.length === 0) {
    return <Text className="text-black">No categories available.</Text>;
  }

  return (
    <ScrollView>
      <SearchBar searchVisible={searchVisible} />
      <View className="flex flex-1 items-center bg-white">
        <HomeCarousel type="herosection" />
        {parentdata.map((item, index) => (
          <HomeSubsection key={index + item?.name} data={item} imageData={imageData} />
        ))}
        <View className="items-start w-[90%] mt-4">
          <Text className="text-black mb-4 font-semibold">Shop Best for Your Walls</Text>
          <View>
            {parentdata.map((item, index) => (
              <HomeWallCards key={index} data={item} />
            ))}
          </View>
        </View>
        <View className="w-[90%] ">
          <Text className="mt-5 font-semibold text-black">Testimonials</Text>
          <Text className="mt-2 text-sm text-black">
            Real Stories, Real Smiles: Hear What Our Customers Have to Say!
          </Text>
        </View>
        <View className="m-4 w-full">
          <HomeCarousel type="review" />
        </View>
      </View>
    </ScrollView>
  );
}

export default HomeScreen;
