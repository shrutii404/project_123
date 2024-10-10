import {View, Text, FlatList} from 'react-native';
import React from 'react';
import CheckoutCartCard from './CheckoutCartCard';
import {useDispatch, useSelector} from 'react-redux';
import {
  decrementQuantity,
  incrementQuantity,
  removeProduct,
} from '../store/slices/cartSlice';

const CheckoutCart = () => {
  const cart = useSelector(state => state.cart.items);

  const dispatch = useDispatch();

  const removeFromCart = (productId: string) => {
    dispatch(removeProduct(productId));
  };

  const increment = (productId: string) => {
    dispatch(incrementQuantity(productId));
  };

  const decrement = (productId: string) => {
    dispatch(decrementQuantity(productId));
  };
  return (
    <View className="flex flex-col gap-4 w-[90%] mt-4">
      <View className="flex flex-row justify-between items-center border-b border-gray-200 pb-4">
        <Text className="text-lg font-semibold text-black">My Cart</Text>
        <Text className="text-lg font-semibold text-[#6c757d]">
          ({cart.length})
        </Text>
      </View>
      <FlatList
        data={cart}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <CheckoutCartCard
            {...item}
            removeFromCart={removeFromCart}
            increment={increment}
            decrement={decrement}
          />
        )}
      />
    </View>
  );
};

export default CheckoutCart;
