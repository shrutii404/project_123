import {View, Text} from 'react-native';
import React from 'react';
import HeaderRight from './HeaderRight';
import {Image} from 'react-native-svg';

const Header = ({navigation}) => ({
  headerTitle: '',
  headerLeft: () => (
    <View className="flex flex-row items-center">
      <MenuIcon />
      <Image
        source={{
          uri: 'https://e-commerce-alpha-rouge.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ficon2.e1d79f09.png&w=750&q=75',
        }}
        className="h-9 w-9 rounded-full bg-black"
      />
    </View>
  ),
  headerRight: () => <HeaderRight navigation={navigation} />,
});

export default Header;
