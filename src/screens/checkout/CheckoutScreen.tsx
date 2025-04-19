import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { House } from 'phosphor-react-native';
import apiClient from '../../context/apiClient';
import OrderSummaryCard from '../../components/OrderSummaryCard';
import WebView from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const CheckoutDetailsScreen = () => {
  const navigation = useNavigation();
  const [availability, setAvailability] = useState(3);

  const [userData, setUserData] = useState(null);
  const [webViewUrl, setWebViewUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDetailsString = await AsyncStorage.getItem('userDetails');
        const userDetailstemp = userDetailsString ? JSON.parse(userDetailsString) : null;
        console.log(userDetailstemp);
        const response = await apiClient.get(`/users/${userDetailstemp.id}`);
        if (response.data) {
          setUserData(response.data);

          if (response.data.addresses.length > 0) {
            const address = response.data.addresses[0];
            const checkAvailability = async () => {
              try {
                const response = await apiClient.get(`/distance?destinationPincode=${address.postalCode}&sourcePincode=248001`);
                console.log(response.data);
                setAvailability(response.data.isAvailable ? 1 : 2);
              } catch (error) {
                console.error('Error checking availability:', error);
              }
            };
            checkAvailability();
          } else {
            setAvailability(3);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const addresses = userData.addresses || [];
  const hasAddresses = addresses.length > 0;

  const handleAddressNav = () => {
    navigation.navigate('ManageProfile', { defaulttab: 2 });
  };

  return (
    <View className="flex-1">
      {webViewUrl ? (
        <WebView
          className="flex-1 border border-black h-[90%]"
          source={{ uri: webViewUrl }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onNavigationStateChange={(navState) => {}}
          style={{ flex: 1 }}
        />
      ) : (
        <ScrollView className="flex-1 bg-white">
          <View>
            <View className="w-full bg-black flex-row py-3 px-4 items-end">
              <TouchableOpacity className="flex-row items-end">
                <Image
                  source={{
                    uri: 'https://e-commerce-alpha-rouge.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ficon2.e1d79f09.png&w=750&q=75',
                  }}
                  className="h-9 w-9 rounded-full bg-black"
                />
                <Text className="font-playfair-display text-white text-lg ml-4">
                  Hurla Hardware & Paints
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex-1 p-4">
              <View className="mb-4">
                <Text className="text-2xl font-bold">Shipping Address</Text>
                <View className="mt-4">
                  {hasAddresses ? (
                    addresses.map((address) => (
                      <View
                        key={address.id}
                        className={`border-2 rounded-lg ${
                          address.selected ? 'border-[#6e6df9] bg-[#f2f1ff]' : 'border-gray-300'
                        } p-4 mb-4 shadow-md`}
                      >
                        <View className="flex-row justify-between items-center mb-4">
                          <View className="flex-row items-center">
                            <House size={28} weight="fill" color="#6e6df9" />
                            <Text className="text-xl font-semibold text-[#6e6df9] ml-2">Home</Text>
                          </View>
                          <TouchableOpacity
                            className="bg-[#6e6df9] px-4 py-2 rounded"
                            onPress={handleAddressNav}
                          >
                            <Text className="text-white">Edit</Text>
                          </TouchableOpacity>
                        </View>
                        <Text className="text-sm font-medium text-gray-700 mb-2">
                          {address.street}
                        </Text>
                        <View className="flex-row mb-2">
                          <Text className="text-sm text-gray-600 mr-4">{address.city}</Text>
                          <Text className="text-sm text-gray-600">{address.state}</Text>
                        </View>
                        <View className="flex-row">
                          <Text className="text-sm text-gray-600 mr-4">{address.country}</Text>
                          <Text className="text-sm text-gray-600">{address.postalCode}</Text>
                        </View>
                      </View>
                    ))
                  ) : (
                    <View className="items-center py-8">
                      <Text className="text-xl font-semibold mb-2">No Addresses Available</Text>
                      <Text className="text-sm text-[#6c757d] text-center mb-4">
                        You don't have any addresses saved yet. Please add a new address to get
                        started.
                      </Text>
                      <TouchableOpacity
                        className="bg-[#6e6df9] px-4 py-2 rounded"
                        onPress={handleAddressNav}
                      >
                        <Text className="text-white">Add Address</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>

              <View className="mt-4">
                <OrderSummaryCard
                  setWebViewUrl={setWebViewUrl}
                  webViewUrl={webViewUrl}
                  availability={availability}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default CheckoutDetailsScreen;
