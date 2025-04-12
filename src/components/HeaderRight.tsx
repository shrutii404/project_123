import React from 'react';
import { View, TouchableOpacity, Text, Pressable } from 'react-native';
import { useModal } from '../context/ModalContext';
import UserIcon from '../icons/UserIcon';
import SearchIcon from '../icons/SearchIcon';
import CartIcon from '../icons/CartIcon';
import FaviroteIcon from '../icons/FaviroteIcon';
import { FontAwesome, Ionicons } from '@expo/vector-icons'; // Correct import for Expo
import { useDispatch, useSelector } from 'react-redux';
import UserCheckedIcon from '../icons/UserCheckedIcons';
// import { userSlice } from '../store/slices/userSlice'; // userLogout action dispatched via useAuth
import { useSearchBox } from '../context/SearchContext';
// import { removeUser } from '../utils/user'; // Removed
import { RootState } from '../store';
import { useAuth } from '../context/AuthContext'; // Import useAuth

interface HeaderRightProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

interface CartItem {
  id: string;
  quantity: number;
  // Removed local UserDetails interface, rely on RootState['user']['user'] type
}

const HeaderRight = ({ navigation }: HeaderRightProps) => {
  const { showModal, hideModal } = useModal();
  const { toggleSearchBar } = useSearchBox();
  const { logout } = useAuth(); // Get logout function from context
  const cartitems = useSelector((state: RootState) => state.cart.items); // Type inferred from RootState
  const userDetails = useSelector((state: RootState) => state.user.user); // Type inferred from RootState
  // const dispatch = useDispatch(); // No longer needed directly for logout

  const openUserModal = () => {
    showModal(
      <View>
        <View className="flex-row items-center mb-3">
          <FontAwesome name="user-circle-o" size={20} color="#000" />
          <Text className="text-black ml-2">{userDetails?.name}</Text>
        </View>

        <View className="flex-row items-center border-b border-gray-200 pb-3">
          <Ionicons name="call-outline" size={20} color="#000" />
          <Text className="text-black ml-2">{userDetails?.phoneNo}</Text>
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
    hideModal(); // Hide modal first
    await logout(); // Call logout from useAuth context
  };

  return (
    <View className=" flex-row items-center">
      <TouchableOpacity onPress={() => toggleSearchBar()}>
        <SearchIcon />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Cart')} className="relative">
        {cartitems && cartitems.length > 0 && (
          <View className="absolute -top-1 right-1 bg-red-500 h-5 w-5 rounded-full z-20 items-center justify-center">
            <Text className="text-[10px]">
              {cartitems.reduce((total: number, item: CartItem) => total + (item.quantity || 0), 0)}
            </Text>
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
