import React from 'react';
import { View, Text, Image, Pressable, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import apiClient from '../context/apiClient';

const ProductSearchCard = ({ product }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const handlePress = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get(`/product-variations/${product._id}`);
      const fullProduct = res.data;
      navigation.navigate('ProductDetails', { data: fullProduct });
    } catch (err) {
      // Optionally handle error (show toast, etc)
      console.error('Failed to fetch product details', err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Pressable
      onPress={handlePress}
      className="w-[350px] bg-white rounded-md shadow-md mb-5 relative border border-gray-200 overflow-hidden items-center"
      disabled={loading}
    >
      <Image
        className="h-60 w-full bg-black rounded"
        source={
          product.thumbnail && product.thumbnail.startsWith('http')
            ? { uri: product.thumbnail }
            : { uri: 'https://via.placeholder.com/300x300?text=No+Image' }
        }
        resizeMode="cover"
      />
      <View className="p-3 w-full">
        <Text className="text-black text-sm font-semibold leading-4 mt-2" onPress={handlePress}>
          {product.name}
        </Text>
        {product.description ? (
          <Text className="text-gray-500 text-xs mb-2">{product.description}</Text>
        ) : null}
        <Text className="text-black text-base leading-4 mt-2 font-bold">₹{product.price}</Text>
      </View>
      {loading && (
        <View className="absolute inset-0 bg-black/60 items-center justify-center flex-1 w-full h-full">
          <ActivityIndicator size="large" color="#198754" />
        </View>
      )}
    </Pressable>
  );
};

export default ProductSearchCard;
