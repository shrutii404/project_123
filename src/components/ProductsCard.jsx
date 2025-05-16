import { View, Text, Image, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { calculateActualPriceBasedOnDiscount } from '../utils/calculateDiscount';
import { useCart } from '../context/CartContext';

const ProductsCard = ({ data }) => {
  const navigation = useNavigation();
  const { state: wishlistState, addToWishlist, removeFromWishlist } = useWishlist();
  const { state: authState } = useAuth();
  const { addToCart } = useCart();
  const userId = authState.user?._id || authState.user?.id;
  const ratings = data?.Review?.map((item) => item.rating) || [];
  const [wishlisted, setWishlisted] = useState(false);
  const [wishlistloading, setWishlistLoading] = useState(false);

  useEffect(() => {
    setWishlisted(
      wishlistState.wishlist.some((item) => item.productVariationId === data.id.toString())
    );
  }, [wishlistState.wishlist, data.id]);

  const formatSize = (size) => {
    if (!size) return '';
    const [feet, inches] = size.split('*');
    if (!feet || !inches) return size;
    return `${feet} feet X ${inches} inches`;
  };

  const getAttributes = () => {
    if (!data.attributes) return {};
    const attrKeys = Object.keys(data.attributes);
    const attrRecord = {};
    attrKeys.forEach((key) => {
      const value = data.attributes[key];
      attrRecord[key] = key === 'Size' || key.split('_')[1] === 'Size' ? formatSize(value) : value;
    });
    return attrRecord;
  };

  const combineAttributes = () => {
    const attributes = getAttributes();
    const attrKeys = Object.keys(attributes);
    const attrParts = attrKeys.map((key) => ` ${attributes[key]}`);
    return attrParts.length > 0 ? ` | ${attrParts.join(' | ')}` : '';
  };

  const getProductName = () => {
    const attrKeys = data.attributes ? Object.keys(data.attributes) : [];
    const nameParts = [data?.name];
    attrKeys.forEach((key) => {
      let value = data.attributes[key];
      if (key === 'Size' || key.split('_')[1] === 'Size') {
        value = formatSize(value);
      }
      nameParts.push(` | ${value}`);
    });
    return nameParts.join('');
  };

  const containsSize = data.attributes && Object.keys(data.attributes).includes('Size');

  function calculatePricePerSquareFoot() {
    if (!data?.attributes['Size']) return null;
    const [lengthFeet, widthInches] = data?.attributes['Size'].split('*').map(Number);
    if (!lengthFeet || !widthInches) return null;
    const widthFeet = widthInches / 12;
    const areaSquareFeet = lengthFeet * widthFeet;
    if (!areaSquareFeet) return null;
    const pricePerSquareFoot = data?.price / areaSquareFeet;
    return pricePerSquareFoot.toFixed(0);
  }

  const averageRating =
    ratings.length > 0 ? ratings.reduce((acc, rating) => acc + rating, 0) / ratings.length : 0;

  const handlePress = () => {
    navigation.navigate('ProductDetails', { data });
  };

  const handleAddToCart = () => {
    addToCart({
      id: data.id.toString(),
      name: getProductName(),
      price: data.price,
      quantity: 1,
      image: data.images[0],
      attributes: getAttributes(),
    });
  };

  const handleAddRemoveActions = async () => {
    if (wishlisted) {
      await handleRemoveFromWishlist();
    } else {
      await handleAddToWishlist();
    }
  };

  const handleRemoveFromWishlist = async () => {
    setWishlistLoading(true);
    await removeFromWishlist(data.id.toString());
    setWishlistLoading(false);
  };

  const handleAddToWishlist = async () => {
    setWishlistLoading(true);
    if (userId) {
      await addToWishlist(userId, data.id.toString());
    }
    setWishlistLoading(false);
  };

  const discount = data.discount || 0;
  const hasDiscount = discount > 0;
  const mrp = hasDiscount
    ? Math.round(calculateActualPriceBasedOnDiscount(data.price, discount))
    : null;

  return (
    <Pressable
      className={`w-[90%] bg-white rounded-md shadow-md p-2 mb-5 relative border border-gray-200`}
      onPress={handlePress}
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
      <Image className="h-60 w-full bg-black rounded" source={{ uri: `${data.images[0]}` }} />
      <Text className="text-black text-sm font-semibold leading-4 mt-2">{getProductName()}</Text>
      {hasDiscount && (
        <Text className="text-[#797979] text-xs leading-3">
          MRP: <Text style={{ textDecorationLine: 'line-through' }}>₹{mrp}</Text>
          <Text className="ml-2 text-[#198754] font-semibold"> {discount}% OFF</Text>
        </Text>
      )}
      <Text className="text-black text-base leading-4 mt-2">
        <Text className="font-bold"> ₹{data?.price}</Text> /piece
      </Text>
      {containsSize && (
        <Text className="text-[#cd1818] text-xs font-semibold leading-4 mt-2">
          (₹{calculatePricePerSquareFoot()} /sq.ft)
        </Text>
      )}
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
