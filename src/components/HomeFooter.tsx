import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeFooter = () => {
  const [links, setLinks] = useState({
    category: [
      {text: 'Plywood'},
      {text: 'Laminates'},
      {text: 'Wallpapers'},
      {text: 'Wall Paints'},
      {text: 'Wood  Panels'},
      {text: 'Marbles'},
      {text: '3D Wall Sheets'},
    ],
    social: [
      {text: 'Instagram'},
      {text: 'LinkedIn'},
      {text: 'Pinterest'},
      {text: 'Twitter'},
      {text: 'Facebook'},
      {text: 'Youtube'},
    ],
    about: [
      {text: 'About'},
      {text: 'Privacy Policy'},
      {text: 'Terms & Conditions'},
      {text: 'Shipping Policy'},
      {text: 'Refund Policy'},
    ],
    contacts: [
      {text: '+91-9927888882', icon: 'mail-outline'},
      {text: '+91-8171508888', icon: 'call-outline'},

      {text: 'info@hurlahardware.com', icon: 'mail-outline'},
    ],
  });
  return (
    <View className="bg-black w-full p-3">
      <View className="flex flex-row items-center mt-4">
        <Image
          source={{
            uri: 'https://e-commerce-alpha-rouge.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ficon2.e1d79f09.png&w=750&q=75',
          }}
          className="h-24 w-24"
        />
        <Text className="ml-2 font-medium text-xl text-white">
          Hurla Paints & Plywood
        </Text>
      </View>
      <Text className="text-white text-sm mt-2">
        Serving You to Serve Our Nation" by providing excellent customer
        service, low prices, renowned brands, high-quality goods, and after-sale
        assistance.
      </Text>
      <View className="mt-4">
        <Text className="text-white font-bold">
          SECURE PAYMENTS PROVIDED BY
        </Text>
        <Image
          source={{
            uri: 'https://e-commerce-alpha-rouge.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FPhonePe.5c8ff022.png&w=3840&q=75',
          }}
          className="h-10 w-20 bg-white rounded-lg mt-2"
        />
      </View>
      <View>
        <View className="my-4">
          <Text className="text-xl uppercase font-bold mb-1 text-white">
            Category
          </Text>
          {links.category.map((item, index) => (
            <Text key={index} className="text-sm text-gray-600 mb-1 text-white">
              {item.text}
            </Text>
          ))}
        </View>

        <View className="mb-4">
          <Text className="text-lg uppercase font-bold mb-1 text-white">
            Social
          </Text>
          {links.social.map((item, index) => (
            <Text key={index} className="text-sm text-gray-600 mb-1 text-white">
              {item.text}
            </Text>
          ))}
        </View>
        <View className="mb-5">
          <Text className="text-lg uppercase font-bold mb-1 text-white">
            Contacts
          </Text>
          <Text className="text-white mb-2 ">(Mon to Sat, 10AM to 7PM)</Text>
          {links.contacts.map((item, index) => (
            <View className="flex flex-row" key={`contact_${index}`}>
              <Ionicons name={item.icon} size={20} color="#fff" />
              <Text
                key={index}
                className="text-sm text-gray-600 mb-1 ml-2 text-white">
                {item.text}
              </Text>
            </View>
          ))}
        </View>
        <View className=" border-t border-gray-800 pt-5">
          {links.about.map((item, index) => (
            <View className="flex flex-row">
              <Text
                key={index}
                className="text-sm text-gray-600 mb-1 ml-2 text-white">
                {item.text}
              </Text>
            </View>
          ))}
        </View>
        <View className="py-5 pl-2">
          <Text className="text-white">
            © Copyright 2024 by Hurla Paints & Plywood
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HomeFooter;
