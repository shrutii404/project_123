import React from 'react';
import { View, TouchableOpacity, Text, Pressable } from 'react-native';
import { useModal } from '../context/ModalContext'; // Adjust the path as necessary
import UserIcon from '../icons/UserIcon';
import SearchIcon from '../icons/SearchIcon';
import CartIcon from '../icons/CartIcon';
import FaviroteIcon from '../icons/FaviroteIcon';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import UserCheckedIcon from '../icons/UserCheckedIcons';
import { userSlice } from '../store/slices/userSlice';
import { useSearchBox } from '../context/SearchContext';
import { removeUser } from '../utils/user';

const HeaderRight = ({ navigation }) => {
  const { showModal, hideModal } = useModal();
  const { toggleSearchBar } = useSearchBox();
  const cartitems = useSelector((state) => state.cart.items);
  const userDetails = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const openUserModal = () => {
    showModal(
      <View>
        <View className="flex-row items-center mb-3">
          <FontAwesome name="user-circle-o" size={20} color="#000" />
          <Text className="text-black ml-2">{userDetails.name}</Text>
        </View>

        <View className="flex-row items-center border-b border-gray-200 pb-3">
          <Ionicons name="call-outline" size={20} color="#000" />
          <Text className="text-black ml-2">{userDetails.phoneNo}</Text>
        </View>

        <Pressable
          className="flex-row items-center mt-3"
          onPress={() => {
            navigation.navigate('ManageProfile');
          }}
        >
          <FontAwesome name="gear" size={20} color="#000" />
          <Text className="text-black ml-2">Manage Profile</Text>
        </Pressable>
        <Pressable className="flex-row items-center mt-3" onPress={handleLogout}>
          <Ionicons name="power" size={20} color="#000" />
          <Text className="text-black ml-2">Logout</Text>
        </Pressable>
      </View>
    );
  };

  const handleUserPress = () => {
    if (userDetails) {
      openUserModal();
    } else {
      navigation.navigate('Login');
    }
  };

  const handleLogout = async () => {
    try {
      await removeUser();
    } catch (e) {
      console.error('Failed to remove tokens from AsyncStorage', e);
    }
    dispatch(userSlice.actions.userLogout());
    hideModal();
  };

  return (
    <View className=" flex-row items-center">
      <TouchableOpacity onPress={() => toggleSearchBar()}>
        <SearchIcon />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Cart')} className="relative">
        {cartitems && cartitems.length > 0 && (
          <View className="absolute -top-1 right-1 bg-red-500 h-5 w-5 rounded-full z-20 items-center justify-center">
            <Text className="text-[10px]">{cartitems.length}</Text>
          </View>
        )}
        <CartIcon />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Wishlist')} className="relative">
        {userDetails &&
          userDetails.FavouriteProd &&
          Array.from(userDetails.FavouriteProd) instanceof Array &&
          userDetails.FavouriteProd.length > 0 && ( // Ensure it's an array
            <View className="absolute -top-1 right-1 bg-red-500 h-5 w-5 rounded-full z-20 items-center justify-center">
              <Text className="text-[10px]">{new Set(userDetails.FavouriteProd).size}</Text>
            </View>
          )}
        <FaviroteIcon />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleUserPress} className="flex-row items-center">
        {userDetails ? <UserCheckedIcon /> : <UserIcon />}
      </TouchableOpacity>
    </View>
  );
};

export default HeaderRight;
