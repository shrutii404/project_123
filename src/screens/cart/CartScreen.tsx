import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import CloseIcon from '../../icons/CloseIcon';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, removeProduct } from '../../store/slices/cartSlice';

const EmptyCart = () => {
  return (
    <Image
      source={{
        uri: 'https://e-commerce-alpha-rouge.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Femptycart.965d2886.png&w=1080&q=75',
      }}
      className="w-screen h-96"
    />
  );
};

const Product = ({ data, key }) => {
  const dispatch = useDispatch();
  const ratings = data?.Review.map((item) => item.rating);
  const averageRating =
    ratings?.length > 0 ? ratings?.reduce((acc, rating) => acc + rating, 0) / ratings?.length : 0;

  const handleRemove = (id) => {
    dispatch(removeProduct(id));
  };
  return (
    <View key={key}>
      <View className="flex-row">
        <Image
          source={{
            uri: `${data.images[0]}`,
          }}
          className="w-[40%] h-24 rounded-md border-2"
        />
        <View className="flex flex-col px-2 gap-2 flex-1">
          <TouchableOpacity onPress={() => {}}>
            <Text className="text-sm text-black">{data?.name}</Text>
          </TouchableOpacity>

          <View className="flex  flex-row justify-between text-sm">
            <View className="flex gap-1  flex-row">
              <Text className="text-xs text-[#9d9ea2]">1 x</Text>
              <Text className="font-semibold text-black">₹{data?.price}</Text>
              <Text className="text-[#0174be]">/piece</Text>
            </View>

            <TouchableOpacity onPress={() => handleRemove(data?.id)}>
              <Text className="underline text-[#cd1818]">Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="shrink-0 bg-[#dee2e6] h-[1px] my-4 w-full"></View>
    </View>
  );
};

const CartItems = ({ items }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const handleCheckout = () => {
    navigation.navigate('Shopcart');
  };
  return (
    <View className="w-full">
      {items &&
        items.length &&
        items.map((item, index) => <Product data={item} key={`cart-${index}`} />)}
      <View className="flex-row justify-between w-full mt-3">
        <TouchableOpacity
          className="border border-neutral-200 rounded-md p-2 px-3 items-center justify-center"
          onPress={handleClearCart}
        >
          <Text className="text-black">Clear Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-black rounded-md p-2 px-3 items-center justify-center"
          onPress={handleCheckout}
        >
          <Text className="text-white font-medium text-sm">Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const CartScreen = () => {
  const navigation = useNavigation();
  const items = useSelector((state) => state.cart.items);

  const handleClose = () => {
    navigation.goBack();
  };
  return (
    <View className="p-5 bg-white flex-1 items-center">
      <View className="flex-row justify-between mt-3 items-center w-full ">
        <Text className="text-xl font-[500] w-fit text-[#212529]">
          Your Cart <Text className="text-base text-[#9d9ea2]">({items?.length})</Text>
        </Text>
        <TouchableOpacity className="border rounded border-[#6c757d]" onPress={handleClose}>
          <CloseIcon />
        </TouchableOpacity>
      </View>
      <View className="shrink-0 bg-[#dee2e6] h-[1px] my-4 w-full"></View>
      {items && items.length > 0 ? <CartItems items={items} /> : <EmptyCart />}
    </View>
  );
};

export default CartScreen;
