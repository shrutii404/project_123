import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { House } from 'phosphor-react-native';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import apiClient from '../../context/apiClient';
import OrderSummaryCard from '../../components/OrderSummaryCard';

const CheckoutScreen = () => {
  const { state: authState } = useAuth();
  const navigation = useNavigation();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authState.user) {
      (navigation as any).navigate('Login');
      return;
    }
    const fetchUserData = async () => {
      try {
        const id = authState.user?._id || authState.user?.id;
        if (!id) return;
        const response = await apiClient.get(`/users/${id}`);
        setUserData(response.data);
      } catch (error) {
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [authState.user]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!userData) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>No user data found. Please login.</Text>
      </View>
    );
  }

  const addresses = userData.addresses || [];
  const hasAddresses = addresses.length > 0;
  const selectedAddress = addresses.find((address: any) => address.selected) || addresses[0];

  return (
    <ScrollView className="flex-1 bg-white">
      <View>
        <View className="flex-1 p-4">
          <Text className="text-2xl font-bold">Shipping Address</Text>
          <View className="mt-4">
            {hasAddresses ? (
              addresses.length === 1 ? (
                <View className="border-2 rounded-lg border-[#6e6df9] bg-[#f2f1ff] p-4 shadow-md">
                  <View className="flex-row justify-between items-center mb-4">
                    <View className="flex-row items-center">
                      <House size={28} weight="fill" color="#6e6df9" />
                      <Text className="text-xl font-semibold text-[#6e6df9] ml-2">Home</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        (navigation as any).navigate('ManageProfile', { defaulttab: 2 })
                      }
                      className="bg-[#6e6df9] px-4 py-2 rounded"
                    >
                      <Text className="text-white">Edit Address</Text>
                    </TouchableOpacity>
                  </View>
                  <Text className="text-sm font-medium text-gray-700 mb-2">
                    {selectedAddress?.street}
                  </Text>
                  <View className="flex-row mb-2">
                    <Text className="text-sm text-gray-600 mr-4">{selectedAddress?.city}</Text>
                    <Text className="text-sm text-gray-600">{selectedAddress?.state}</Text>
                  </View>
                  <View className="flex-row">
                    <Text className="text-sm text-gray-600 mr-4">{selectedAddress?.country}</Text>
                    <Text className="text-sm text-gray-600">{selectedAddress?.postalCode}</Text>
                  </View>
                </View>
              ) : (
                addresses.map((address: any) => (
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
                        onPress={() =>
                          (navigation as any).navigate('ManageProfile', { defaulttab: 2 })
                        }
                        className="bg-[#6e6df9] px-4 py-2 rounded"
                      >
                        <Text className="text-white">Edit</Text>
                      </TouchableOpacity>
                    </View>
                    <Text className="text-sm font-medium text-gray-700 mb-2">{address.street}</Text>
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
              )
            ) : (
              <View className="items-center py-8">
                <Text className="text-xl font-semibold mb-2">No Addresses Available</Text>
                <Text className="text-sm text-[#6c757d] text-center mb-4">
                  You don't have any addresses saved yet. Please add a new address to get started.
                </Text>
                <TouchableOpacity
                  onPress={() => (navigation as any).navigate('ManageProfile', { defaulttab: 2 })}
                  className="bg-[#6e6df9] px-4 py-2 rounded"
                >
                  <Text className="text-white">Add Address</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <View className="mt-4">
          <OrderSummaryCard setWebViewUrl={() => {}} availability={1} />
        </View>
      </View>
    </ScrollView>
  );
};

export default CheckoutScreen;
