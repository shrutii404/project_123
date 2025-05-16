import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation, NavigationProp } from '@react-navigation/native';
import { Category, useCategory } from '../../context/CategoryContext';
import { useProductVariations } from '../../context/ProductVariation';
import ShimmerEffect from '../../components/ShimmerEffect';
import { RootStackParamList } from '../../navigation/types';
import ProductsCard from '../../components/ProductsCard';

const CategoryScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { data } = (route.params as any) || {};
  const key = data?.Type ? Object.keys(data.imageData)[0] : undefined;
  const value = data?.Type;
  const categoryName = data?.category;
  const imageData = data?.imageData;
  const childName = data?.childName;
  const { state: catState, getAllCategories } = useCategory();
  const { state: prodState, getAllProductVariations } = useProductVariations();
  const [categoryData, setCategoryData] = useState<Category | null>(null);
  const [childCategory, setChildCategory] = useState<Category | null>(null);

  useEffect(() => {
    getAllCategories();
    getAllProductVariations();
  }, []);

  useEffect(() => {
    let found: Category | undefined = undefined;
    if (data?.id) {
      found = catState.categories.find((c) => c.id === data.id);
    }
    if (!found && categoryName) {
      found = catState.categories.find(
        (c) => c.name.trim().toLowerCase() === categoryName.trim().toLowerCase()
      );
    }
    setCategoryData(found || null);
    if (found && found.children && found.children.length && childName) {
      const child = found.children.find((child) => child.name === childName);
      setChildCategory(child || null);
    }
  }, [catState, categoryName, key, data?.id, childName]);

  const getProductsByValue = useCallback(
    (key: string, value: string) =>
      prodState.productVariations.filter(
        (item) => item.product.categoryId === categoryData?.id && item.attributes?.[key] === value
      ),
    [prodState.productVariations, categoryData]
  );

  function handleNavigate(newValue: string) {
    if (!childCategory || !categoryData) return;
    navigation.navigate('Category', {
      data: {
        Type: newValue,
        category: categoryData.name,
        data: { image: categoryData.images[0] },
        imageData: { [childCategory.name]: { attributeType: childCategory.name } },
      },
    });
  }

  const formatSize = (size: string): string => {
    const [feet, inches] = size.split('*');
    if (!feet || !inches) return size;
    return `${feet} feet X ${inches} inches`;
  };

  if (catState.loading || prodState.loading) {
    return <ShimmerEffect />;
  }
  if (!categoryData || !childCategory) {
    return <Text style={{ padding: 16 }}>Category not found.</Text>;
  }

  const products = getProductsByValue(childCategory.name, value);

  if (products.length === 0) {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
        <Text style={{ fontSize: 24, fontWeight: '600', margin: 16, textAlign: 'center' }}>
          We Looked Everywhere.
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 16, textAlign: 'center' }}>
          Looks like this page is missing.
        </Text>
      </ScrollView>
    );
  }

  const showBanner =
    key === 'Type' ||
    key === 'Finish' ||
    (key && key.split('_')[1] === 'Type') ||
    (key && key.split('_')[1] === 'Finish');
  const valueName = value?.split('-').join(' ');

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      {showBanner && categoryData.images?.[0] && (
        <View style={{ position: 'relative' }}>
          <Image source={{ uri: categoryData.images[0] }} style={{ width: '100%', height: 200 }} />
          <Text
            style={{
              position: 'absolute',
              top: 8,
              left: 8,
              color: '#fff',
              backgroundColor: '#af926a',
              padding: 4,
              borderRadius: 4,
              fontWeight: 'bold',
            }}
          >
            {valueName}
          </Text>
          <Text
            style={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              color: '#fff',
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >
            Add A Touch Of Luxury To Your Furniture With{' '}
            <Text style={{ color: '#af926a' }}>
              {valueName} {categoryData.name}
            </Text>
          </Text>
        </View>
      )}

      {childCategory.valuesAvailable.length > 1 && (
        <View style={{ marginBottom: 16, marginTop: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
            Discover Our <Text style={{ color: '#af926a' }}>{key}</Text> Options
          </Text>
          <Text style={{ textAlign: 'center', color: '#666', marginBottom: 8 }}>
            Explore the variety of {key}s available just for you.
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ paddingHorizontal: 8 }}
          >
            {childCategory.valuesAvailable
              .filter((val) => val !== value)
              .map((val, idx) => (
                <TouchableOpacity
                  key={val}
                  style={{
                    backgroundColor: '#f0f0f0',
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 8,
                    marginRight: 8,
                    marginBottom: 8,
                  }}
                  onPress={() => handleNavigate(val)}
                >
                  <Text style={{ color: '#000' }}>{val}</Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      )}
      <Text style={{ fontSize: 20, fontWeight: '600', textAlign: 'center', marginTop: 8 }}>
        {categoryData.name}
      </Text>
      <Text style={{ fontSize: 16, fontWeight: '500', textAlign: 'center', marginBottom: 8 }}>
        {key === 'Size' || (key && key.split('_')[1] === 'Size')
          ? formatSize(valueName)
          : valueName}
      </Text>
      <View
        style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 8, justifyContent: 'center' }}
      >
        {products.map((item, i) => (
          <ProductsCard data={item} key={item.id || i} />
        ))}
      </View>
    </ScrollView>
  );
};

export default CategoryScreen;
