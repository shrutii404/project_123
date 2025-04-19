import { View, Text, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { useProductVariations } from '../../context/ProductVariation';
import ProductsCard from '../../components/ProductsCard';
import { Image } from 'react-native';


const WishlistScreen = () => {
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const { state: authState } = useAuth();
  const { state: prodVarState } = useProductVariations();
  const userDetails = authState.user;
  const wishlist = wishlistState.wishlist;
  const products = Array.isArray(prodVarState.productVariations) ? prodVarState.productVariations : [];

  // Compute filtered wishlist products directly for rendering
  const filteredWishlist = Array.isArray(products) && userDetails && userDetails.FavouriteProd
    ? products.filter((product) => userDetails.FavouriteProd.includes(product.id.toString()))
    : [];

  return (
    <ScrollView className="bg-white  ">
      <Text className="text-2xl font-semibold mb-4 text-center text-black mt-8">Your Wishlist</Text>
      <View className="items-center w-full">
        {filteredWishlist && filteredWishlist.length > 0 ? (
          filteredWishlist.map((product: any, index: number) => (
            <ProductsCard data={product} key={`wishlist-cart-${index}`} />
          ))
        ) : (
          <Image
            className="h-60 w-full bg-black rounded"
            source={{
              uri: `https://e-commerce-alpha-rouge.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fno_wishlist.7c1fdce8.gif&w=1920&q=75`,
            }}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default WishlistScreen;
