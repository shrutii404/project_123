import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../store/slices/cartSlice';
import {
  useAddToWishlistMutation,
  useGetUserDetailsQuery,
  useRemoveWishlistMutation,
} from '../store/slices/apiSlice';
import apiService from '../services/apiService';
import { userSlice } from '../store/slices/userSlice';
import { calculateActualPriceBasedOnDiscount } from '../utils/calculateDiscount';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { wishlistSlice } from '../store/slices/wishlistSlice';

const ProductsCard = ({ data, key }) => {
  const navigation = useNavigation();
  const ratings = data?.Review.map((item) => item.rating);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user.user);

  const [addToWishlist] = useAddToWishlistMutation();
  const [removeWishlist] = useRemoveWishlistMutation();
  const [userId, setUserId] = useState();
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

  const {
    data: userData,
    error: userDataError,
    isLoading: userDataLoading,
    refetch,
  } = useGetUserDetailsQuery(userId);

  // Ensure there are ratings to avoid division by zero
  const averageRating =
    ratings?.length > 0 ? ratings?.reduce((acc, rating) => acc + rating, 0) / ratings?.length : 0;
  const handlePress = () => {
    navigation.navigate('ProductDetails', { data });
  };

  const handleAddToCart = () => {
    const discountPrice = calculateActualPriceBasedOnDiscount(data.price, data.discount || 0);
    dispatch(addProduct({ ...data, quantity: 1, discountPrice }));
  };

  const handleAddRemoveActions = async () => {
    if (wishlisted) {
      await handleRemoveToWishlist();
    } else {
      await handleAddToWishlist();
    }
    await updateUser();
  };
  const handleAddToWishlist = async () => {
    setWishlistLoading(true);
    try {
      const userDetailsString = await AsyncStorage.getItem('userDetails');
      const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
      const requestBody = { variationId: data.id };

      const response = await apiService.addToWishlist(userDetails.id, requestBody);

      if (response.data) {
        await updateUser();
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      } else {
        console.log('Error', response.error);
        alert(response.error.data);
      }
    } catch (error) {
      console.log('Error', error);
    }
    setWishlistLoading(false);
  };
  const handleRemoveToWishlist = async () => {
    setWishlistLoading(true);
    try {
      const userDetailsString = await AsyncStorage.getItem('userDetails');
      const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
      const requestBody = { variationId: data.id };

      const response = await apiService.removeWishlist(userDetails.id, requestBody);

      if (response.data) {
        console.log('response', response.data);
        await updateUser();
        ToastAndroid.show('Added To WishList', ToastAndroid.SHORT);
      } else {
        alert(response.error.data.message);
      }
    } catch (error) {
      console.log('Error', error);
    }
    setWishlistLoading(false);
  };

  const updateUser = async () => {
    try {
      const userDetailsString = await AsyncStorage.getItem('userDetails');
      const userDetailsTemp = userDetailsString ? JSON.parse(userDetailsString) : null;
      const userDetailsResponse = await apiService.getUserDetails(userDetailsTemp.id);
      if (userDetailsResponse.data) {
        dispatch(userSlice.actions.userLogin(userDetailsResponse.data));

        const productsVariations = await apiService.getProductVariations();
        const products = productsVariations.data;
        const userDetailsData = userDetailsResponse.data;

        if (products && userDetailsData && userDetailsData.FavouriteProd) {
          const FilteredProducts =
            products?.filter((product) =>
              userDetailsData.FavouriteProd.includes(product.id.toString())
            ) || [];

          dispatch(wishlistSlice.actions.updateWishlist(FilteredProducts));
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (userDetails && userDetails.FavouriteProd) {
      const isProductFavorited = userDetails.FavouriteProd.includes(data.id.toString());
      setWishlisted(isProductFavorited);
    }
  }, [userDetails]);
  return (
    <Pressable
      className={`w-[90%] bg-white rounded-md shadow-md p-2 mb-5 relative border border-gray-200 p-3`}
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
