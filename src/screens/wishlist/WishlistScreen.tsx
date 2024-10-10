import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useGetProductVariationsQuery} from '../../store/slices/apiSlice';
import ProductsCard from '../../components/ProductsCard';
import {Image} from 'react-native-svg';
import {wishlistSlice} from '../../store/slices/wishlistSlice';

const WishlistScreen = () => {
  const userDetails = useSelector(state => state.user.user);
  const wishlist = useSelector(state => state.wishlist.items);
  const dispatch = useDispatch();
  const {
    data: products,
    error: productserror,
    isLoading: productLoading,
  } = useGetProductVariationsQuery();
  const [favouriteProducts, setFavouriteProducts] = useState([]);

  useEffect(() => {
    if (products && userDetails && userDetails.FavouriteProd) {
      const FilteredProducts =
        products?.filter(product =>
          userDetails.FavouriteProd.includes(product.id.toString()),
        ) || [];

      dispatch(wishlistSlice.actions.updateWishlist(FilteredProducts));
    }
  }, [products]);

  return (
    <ScrollView className="bg-white  ">
      <Text className="text-2xl font-semibold mb-4 text-center text-black mt-8">
        Your Wishlist
      </Text>
      <View className="items-center w-full">
        {wishlist && wishlist.length > 0 ? (
          wishlist.map((product, index) => (
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
