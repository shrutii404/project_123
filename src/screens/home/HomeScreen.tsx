import { ScrollView, Text, View, Image, ActivityIndicator } from 'react-native';
import HomeSubsection from '../../components/HomeSubsection';
import HomeWallCards from '../../components/HomeWallCards';
import HomeServicesInfo from '../../components/HomeServicesInfo';
import HomeCarousel from '../../components/HomeCarousel';
import HomeFooter from '../../components/HomeFooter';
import { useGetCategoriesQuery, useGetProductVariationsQuery } from '../../store/slices/apiSlice';
import { useEffect, useState } from 'react';
import ShimmerEffect from '../../components/ShimmerEffect';
import HomeFAQQuestions from '../../components/HomeFAQQuestions';
import SearchBar from '../../components/SearchBar';
import { useSearchBox } from '../../context/SearchContext';
import { placeHolderImageSquare } from '../../utils/constants';

function HomeScreen() {
  const [parentdata, setParentdata] = useState([]);
  const [imageData, setImageData] = useState({});
  const { searchVisible } = useSearchBox();

  const {
    data: categories,
    error: categorieserror,
    isLoading: categoryLoading,
  } = useGetCategoriesQuery('');
  const {
    data: products,
    error: productserror,
    isLoading: productLoading,
  } = useGetProductVariationsQuery('');

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

        const tempimageData = {};
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
                  attributeType: matchedAttributeType,
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

  if (categoryLoading || productLoading) {
    return (
      <View className="flex-1 bg-white">
        <ShimmerEffect />
      </View>
    );
  }

  if (categorieserror || productserror) {
    return (
      <Text className="text-black">
        Error: {categorieserror?.message || productserror?.message}
      </Text>
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
          <HomeSubsection key={index} data={item} imageData={imageData} />
        ))}
        <View className="items-start w-[90%] mt-4">
          <Text className="text-black mb-4 font-semibold">Shop Best for Your Walls</Text>
          <View>
            {parentdata.map((item, index) => (
              <HomeWallCards key={index} data={item} />
            ))}
          </View>
        </View>
        <View className="bg-[#F7F7F7] w-full py-10 items-center ">
          <HomeServicesInfo />
        </View>
        <View className="w-[90%] ">
          <Text className="mt-5 font-semibold text-black">Testimonials</Text>
          <Text className="mt-2 text-sm text-black">
            Real Stories, Real Smiles: Hear What Our Customers Have to Say!
          </Text>
        </View>
        <HomeCarousel type="review" />
        <View className="h-0.5 w-full bg-gray-400 mt-5"></View>
        <View className="items-center w-full">
          <Text className="text-black text-3xl font-bold my-10 w-[70%] text-center">
            Frequently Asked Questions
          </Text>
          <Image
            source={{
              uri: 'https://e-commerce-alpha-rouge.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FFAQ.d9961481.jpg&w=2048&q=75',
            }}
            className="h-96 w-96"
          />
        </View>
        <View className="w-full">
          <HomeFAQQuestions />
        </View>
        {/* <HomeFooter /> */}
      </View>
    </ScrollView>
  );
}

export default HomeScreen;
