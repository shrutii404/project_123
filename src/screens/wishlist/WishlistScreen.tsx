import React, { useEffect } from 'react';
import { useWishlist } from '../../context/WishlistContext';
import { useProductVariations } from '../../context/ProductVariation';
import ProductsCard from '../../components/ProductsCard';
import { Image, ScrollView, Text, View } from 'react-native';

const WishlistScreen = () => {
  const { state: wishlistState } = useWishlist();
  const { state: prodVarState } = useProductVariations();
  const products = Array.isArray(prodVarState.productVariations) ? prodVarState.productVariations : [];

  console.log({wishlist: wishlistState.wishlist})
  // Filter products by wishlist context items
  const wishlistIds = wishlistState.wishlist.map(item => item.productVariationId);
  const filteredWishlist = products.filter(product =>
    wishlistIds.includes(product.id.toString())||wishlistIds.includes(product.productId.toString())
  );

  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 24, fontWeight: '600', marginBottom: 16, textAlign: 'center', color: '#000', marginTop: 32 }}>Your Wishlist</Text>
      <View style={{ alignItems: 'center', width: '100%' }}>
        {filteredWishlist.length > 0 ? (
          filteredWishlist.map((product: any, index: number) => (
            <ProductsCard data={product} key={`wishlist-cart-${index}`} />
          ))
        ) : (
          <Image
            style={{ height: 240, width: '90%', borderRadius: 8 }}
            source={{ uri: 'https://e-commerce-alpha-rouge.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fno_wishlist.7c1fdce8.gif&w=1920&q=75' }}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default WishlistScreen;
