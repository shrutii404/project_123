import {View, Text, Image, FlatList} from 'react-native';
import React from 'react';

interface ServiceInfo {
  imageUri: string;
  title: string;
  subtext: string;
}

const servicesData: ServiceInfo[] = [
  {
    imageUri:
      'https://e-commerce-alpha-rouge.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhomefeature1.349530f5.webp&w=384&q=75',
    title: 'Secure Packaging',
    subtext: 'Products are delivered in secure packaging in 5 working days.',
  },
  {
    imageUri:
      'https://e-commerce-alpha-rouge.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhomefeature3.e5e6b135.webp&w=640&q=75',
    title: 'Safe Delivery',
    subtext:
      'Hurla Hardware directly manages delivery for this product. Delivery tracking is available.',
  },
  {
    imageUri:
      'https://e-commerce-alpha-rouge.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhomefeature2.e3e22929.webp&w=640&q=75',
    title: 'Easy-to-Install',
    subtext: 'Louvers with Water Proof & Borer Resistant Properties.',
  },
  // Add more service items here
];

const ServiceItem = ({item}: {item: ServiceInfo}) => (
  <View className="items-center w-full py-4">
    <Image source={{uri: item.imageUri}} className="h-14 w-14 bg-[#F7F7F7]" />
    <Text className="text-[#76453b] text-xl font-semibold w-full text-center my-2">
      {item.title}
    </Text>
    <Text className="text-base lg:text-lg text-center w-[70%] ] font-normal leading-7 text-black">
      {item.subtext}
    </Text>
  </View>
);

const HomeServicesInfo = () => {
  return (
    <FlatList
      data={servicesData}
      renderItem={({item}) => <ServiceItem item={item} />}
      keyExtractor={(item, index) => index.toString()}
      className="w-full"
    />
  );
};

export default HomeServicesInfo;
