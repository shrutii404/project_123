import { View, Text, Image, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { calculateActualPriceBasedOnDiscount } from '../utils/calculateDiscount';

const ProductsCard = ({ data, key }) => {
  const navigation = useNavigation();
  const ratings = data?.Review.map((item) => item.rating);

  const [wishlisted, setWishlisted] = useState(false);
  const [wishlistloading, setWishlistLoading] = useState(false);

  function calculatePricePerSquareFoot() {
    // Split the dimensions string by '*' and convert to numbers
    const [lengthFeet, widthInches] = data?.attributes['Size'].split('*').map(Number);

    // Convert width from inches to feet
    const widthFeet = widthInches / 12;

    // Calculate the area in square feet
    const areaSquareFeet = lengthFeet * widthFeet;

    // Calculate the price per square foot
    const pricePerSquareFoot = data?.price / areaSquareFeet;

    return pricePerSquareFoot.toFixed(0);
  }

  // Ensure there are ratings to avoid division by zero
  const averageRating =
    ratings?.length > 0 ? ratings?.reduce((acc, rating) => acc + rating, 0) / ratings?.length : 0;
  const handlePress = () => {
    navigation.navigate('ProductDetails', { data });
  };

  const handleAddToCart = () => {
    const discountPrice = calculateActualPriceBasedOnDiscount(data.price, data.discount || 0);
  };

  const handleAddRemoveActions = async () => {
    if (wishlisted) {
      await handleRemoveToWishlist();
    } else {
      await handleAddToWishlist();
    }
    await updateUser();
  };

  const handleRemoveToWishlist = async () => {
    setWishlistLoading(true);
    setWishlistLoading(false);
  };

  const handleAddToWishlist = async () => {
    setWishlistLoading(true);
    setWishlistLoading(false);
  };

  return (
    <Pressable
      className={`w-[90%] bg-white rounded-md shadow-md p-2 mb-5 relative border border-gray-200`}
      onPress={handlePress}
      key={key}
    >
      <TouchableOpacity
        className="absolute z-20 rounded-full bg-[#dee2e6] p-0.5 top-4 right-4 "
        onPress={handleAddRemoveActions}
      >
        {wishlistloading ? (
          <ActivityIndicator />
        ) : wishlisted ? (
          <Ionicons name="heart" color="red" size={20} />
        ) : (
          <Ionicons name="heart-outline" color="gray" size={20} />
        )}
      </TouchableOpacity>
      <Image
        className="h-60 w-full bg-black rounded"
        source={{
          uri: `${data.images[0]}`,
        }}
      />
      <Text className="text-black text-sm font-semibold leading-4 mt-2">{data?.name}</Text>
      <Text className="text-black text-base  leading-4 mt-2">
        <Text className="font-bold"> ₹{data?.price}</Text> /piece
      </Text>
      <Text className="text-[#cd1818] font-sm font-semibold leading-4 mt-2">(₹6 /sq.ft)</Text>
      <View className="flex-row mt-1 items-center">
        <View className="bg-[#09881d] flex-row items-center rounded-full px-2 py-1 justify-center">
          <Text className="text-white text-sm mr-2">
            {averageRating ? averageRating.toFixed(1) : 'No Reviews'}
          </Text>
          <Ionicons name="star" className="text-white " size={15} />
        </View>
        <Text className="text-gray-500 ml-2">({data.Review.length} reviews)</Text>
      </View>
      <TouchableOpacity
        className="bg-[#e2e3e5] hover:bg-[#b3b4b7] rounded-md flex-row  justify-center items-center py-2 mt-2  "
        onPress={handleAddToCart}
      >
        <Text className="text-black text-lg font-semibold mr-2">Add To Cart</Text>
        <Ionicons name="cart" color="#000" size={25} />
      </TouchableOpacity>
    </Pressable>
  );
};

export default ProductsCard;
