import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  TouchableOpacity,
  Modal,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  FontAwesome5 as Icon,
  Ionicons,
  AntDesign as AntIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetProductVariationsQuery,
  useUpdateUserDetailsMutation,
  useGetUserDetailsByIdQuery,
  useLazyGetUserDetailsByIdQuery,
} from '../../store/slices/apiSlice';
// import apiService from '../../services/apiService'; // No longer needed
import OrderTable from '../../components/OrderTable';
import { userSlice } from '../../store/slices/userSlice';
import ShimmerEffect from '../../components/ShimmerEffect';
import type { RootState } from '../../store/store';

interface UserAddress {
  id?: string;
  addressId?: string;
  street: string;
  state: string;
  country: string;
  postalCode: string;
  city: string;
}

interface Review {
  id: string;
  productId: string;
  productName?: string;
  rating: number;
  comment: string;
  createdAt: string;
  date?: string;
}

interface UserFormDetails {
  first: string;
  last: string;
  email: string;
}

const ManageProfileScreen = () => {
  const [tab, setTab] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('editName');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [address, setAddress] = useState<UserAddress[]>([]);
  const [details, setDetails] = useState<UserFormDetails>({
    first: '',
    last: '',
    email: '',
  });
  const [shipping, setShipping] = useState<UserAddress>({
    street: '',
    state: '',
    country: '',
    postalCode: '',
    city: '',
  });

  const {
    data: products,
    error: productsError,
    isLoading: productLoading,
  } = useGetProductVariationsQuery('');

  const [updateUser, { isLoading: isUpdateLoading }] = useUpdateUserDetailsMutation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const userDetails = useSelector((state: RootState) => state.user.user) as any;
  const handleChangeTab = (t: number) => {
    setTab(t);
    fetchUserDetails();
  };

  const handleEditName = () => {
    setModalType('editName');
    if (userDetails?.name) {
      const nameParts = userDetails.name.split(' ');
      setDetails({
        first: nameParts[0] || '',
        last: nameParts[1] || '',
        email: userDetails.email || '',
      });
    }
    setModalVisible(true);
  };

  const handleAddNewAddress = () => {
    setModalType('addAddress');
    setShipping({
      street: '',
      state: '',
      country: '',
      postalCode: '',
      city: '',
    });
    setModalVisible(true);
  };

  const handleEditAddress = (addr: UserAddress) => {
    setModalType('editAddress');
    setShipping({
      street: addr.street || '',
      state: addr.state || '',
      country: addr.country || '',
      postalCode: addr.postalCode || '',
      city: addr.city || '',
      id: addr.id,
      addressId: addr.addressId,
    });
    setModalVisible(true);
  };

  const handleDeleteAddress = async (id: string) => {
    try {
      setLoading(true);
      const result = await updateUser({
        deleteAddressId: id,
      }).unwrap();

      if (result) {
        const updatedAddresses = address.filter((addr) => (addr.id || addr.addressId) !== id);
        setAddress(updatedAddresses);
        dispatch(userSlice.actions.updateUserDetails({ address: updatedAddresses }));
        ToastAndroid.show('Address deleted successfully!', ToastAndroid.SHORT);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to delete address');
    } finally {
      setLoading(false);
    }
  };

  const handleAddressChange = (key: keyof UserAddress, value: string) => {
    setShipping((prev) => ({ ...prev, [key]: value }));
  };

  const handleNameChange = (key: keyof UserFormDetails, value: string) => {
    setDetails((prev) => ({ ...prev, [key]: value }));
  };

  // Use RTK Query to fetch user details
  const [
    triggerGetUserDetails,
    { data: userData, isLoading: isUserDetailsLoading, isError: isUserDetailsError },
  ] = useLazyGetUserDetailsByIdQuery();

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      if (!userDetails || !userDetails.id) {
        setLoading(false);
        return;
      }

      // Trigger the RTK Query to fetch user details
      const result = await triggerGetUserDetails(userDetails.id).unwrap();

      if (result) {
        // Update Redux store with latest user data
        dispatch(userSlice.actions.updateUserDetails(result));

        // Update local state
        if (result.name) {
          const nameParts = result.name.split(' ');
          setDetails({
            first: nameParts[0] || '',
            last: nameParts[1] || '',
            email: result.email || '',
          });
        }

        // Handle address data
        if (result.address) {
          setAddress(Array.isArray(result.address) ? result.address : [result.address]);
        }

        // Process reviews data with product information
        if (result.reviews && products) {
          const updatedReviews = result.reviews.map((review: Review) => {
            const product = products.find((p: any) => p.id === review.productId);
            return {
              ...review,
              productName: product?.name || 'Unknown Product',
            };
          });
          setReviews(updatedReviews);
        }
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      Alert.alert('Error', 'Failed to load user profile data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userDetails && products) {
      fetchUserDetails();
    }
  }, [userDetails?.id, products, tab]);

  const handleSaveDetails = async () => {
    try {
      setLoading(true);
      if (!details.first.trim() || !details.last.trim()) {
        Alert.alert('Error', 'Please enter both first and last name.');
        return;
      }

      const result = await updateUser({
        name: `${details.first} ${details.last}`.trim(),
      }).unwrap();

      if (result) {
        dispatch(
          userSlice.actions.updateUserDetails({
            name: `${details.first} ${details.last}`.trim(),
          })
        );
        ToastAndroid.show('Name updated successfully!', ToastAndroid.SHORT);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update name');
    } finally {
      setLoading(false);
      setModalVisible(false);
    }
  };

  const handleSaveEmail = async () => {
    try {
      setLoading(true);
      if (!details.email.trim()) {
        Alert.alert('Error', 'Please enter an email address');
        return;
      }

      const result = await updateUser({
        email: details.email.trim(),
      }).unwrap();

      if (result) {
        dispatch(userSlice.actions.updateUserDetails({ email: result.email }));
        ToastAndroid.show('Email updated successfully!', ToastAndroid.SHORT);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update email');
    } finally {
      setLoading(false);
      setModalVisible(false);
    }
  };

  const handleSaveAddress = async () => {
    try {
      setLoading(true);
      const result = await updateUser({
        address: {
          ...shipping,
          country: shipping.country || 'India',
        },
      }).unwrap();

      if (result) {
        dispatch(userSlice.actions.updateUserDetails({ address: result.address }));
        ToastAndroid.show(
          `Address ${modalType === 'addAddress' ? 'added' : 'updated'} successfully!`,
          ToastAndroid.SHORT
        );
        setShipping({
          street: '',
          state: '',
          country: '',
          postalCode: '',
          city: '',
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save address');
    } finally {
      setLoading(false);
      setModalVisible(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      if (modalType === 'editName') {
        await handleSaveDetails();
      } else if (modalType === 'editEmail') {
        await handleSaveEmail();
      } else if (modalType === 'editAddress' || modalType === 'addAddress') {
        await handleSaveAddress();
      }
    } catch (error) {
      console.error(error);
      ToastAndroid.show('An error occurred. Please try again.', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-2">
      <View className="w-full items-center">
        <View className=" flex-row  h-10 rounded-lg bg-neutral-100 p-1 text-neutral-500 flex items-center justify-center  w-[95%]">
          <Pressable
            className={`flex-1 items-center justify-center h-8   px-1 ${
              tab == 1 && 'bg-white z-10 rounded-lg'
            }`}
            onPress={() => handleChangeTab(1)}
          >
            <Text className={`${tab == 1 ? 'text-neutral-950' : 'text-neutral-500'} font-semibold`}>
              Personal Details
            </Text>
          </Pressable>
          <Pressable
            className={`flex-1 items-center justify-center h-8  ml-2  px-1 ${
              tab == 2 && 'bg-white z-10 rounded-lg'
            }`}
            onPress={() => handleChangeTab(2)}
          >
            <Text className={`${tab == 2 ? 'text-neutral-950' : 'text-neutral-500'} font-semibold`}>
              Shipping Details
            </Text>
          </Pressable>
          <Pressable
            className={`flex-1 items-center justify-center h-8 ml-2  px-1 ${
              tab == 3 && 'bg-white z-10 rounded-lg'
            }`}
            onPress={() => handleChangeTab(3)}
          >
            <Text className={`${tab == 3 ? 'text-neutral-950' : 'text-neutral-500'} font-semibold`}>
              My Orders
            </Text>
          </Pressable>
        </View>
        {tab != 3 && (
          <View className="mt-10 w-[95%] border-b border-gray-200 pb-6">
            <Text className="text-black font-bold text-3xl text-left">
              {tab == 1 ? 'Profile Details' : 'Shipping Address'}
            </Text>
          </View>
        )}
        {loading && tab != 3 && <ShimmerEffect rows={tab == 1 ? false : true} />}

        {tab == 1 && !loading && (
          <View className="w-[95%]">
            <Text className="text-black font-bold mb-2">First Name</Text>
            <TextInput
              className={`text-gray-300 border border-gray-300 rounded-xl p-2 font-medium`}
              value={userDetails ? userDetails.name?.split(' ')[0] || '' : ''}
              placeholder="First Name"
              placeholderTextColor="#6b7280"
              readOnly
            />
            <Text className="text-black font-bold my-2">Last Name</Text>
            <TextInput
              className={`text-gray-300 border border-gray-300 rounded-xl p-2 font-medium`}
              value={userDetails ? userDetails.name?.split(' ')[1] || '' : ''}
              placeholder="Last Name"
              placeholderTextColor="#6b7280"
              readOnly
            />
            <Text className="text-black font-bold my-2">Phone Number</Text>
            <View className="rounded border-2 h-10 border-gray-500 flex-row w-[90%]">
              <View className="w-[12%] justify-center  border-gray-500 border-r-2 bg-gray-200">
                <Text className="text-gray-500 text-right pr-2">+91</Text>
              </View>
              <View className="w-[88%] justify-center">
                <Text className="text-gray-400 text-left pl-2">
                  {userDetails ? userDetails.phoneNo : ''}
                </Text>
              </View>
            </View>
            <Text className="text-black font-bold my-2">WhatsApp Number</Text>
            <View className="rounded border-2 h-10 border-gray-500 flex-row w-[90%]">
              <View className="w-[12%] justify-center  border-gray-500 border-r-2 bg-gray-200">
                <Text className="text-gray-500 text-right pr-2">+91</Text>
              </View>
              <View className="w-[88%] justify-center">
                <Text className="text-gray-400 text-left pl-2">
                  {userDetails ? userDetails.phoneNo : ''}
                </Text>
              </View>
            </View>
            <View className="flex-row justify-end mt-3">
              <TouchableOpacity
                className="bg-white shadow-amber-50 px-2 py-1.5 z-20 border border-gray-200 rounded-lg flex-row"
                onPress={handleEditName}
              >
                <Icon name="edit" color="#000" size={15} />
                <Text className="text-black font-bold">Edit Name</Text>
              </TouchableOpacity>
            </View>

            <View className="mt-10 w-[95%] border-b border-gray-200 pb-6">
              <Text className="text-black font-bold text-3xl text-left">My Reviews</Text>
            </View>
            {reviews &&
              reviews.length > 0 &&
              reviews.map((r) => (
                <View className="border rounded-lg border-gray-200 p-2">
                  <View className=" flex-row justify-between  items-center">
                    <View className="flex-row items-center mb-2">
                      {Array.from({ length: r.rating }).map((_, index) => (
                        <Ionicons key={index} name="star" size={20} color="gold" />
                      ))}
                    </View>
                    <Pressable className="bg-red-600 rounded p-1">
                      <AntIcons name="delete" size={10} color="white" />
                    </Pressable>
                  </View>
                  <View>
                    <Text className="text-black font-semibold text-base">{r.productName}</Text>
                    <Text className="text-black text-sm mt-3">{r.comment}</Text>
                    <Text className="text-gray-500 text-xs mt-4">
                      Posted at:{new Date(r.createdAt).toLocaleDateString()}{' '}
                    </Text>
                  </View>
                </View>
              ))}
            {!reviews && (
              <View className="mt-3">
                <Text className="text-black text-lg">No review available</Text>
              </View>
            )}
          </View>
        )}
        {tab == 2 &&
          !loading &&
          (address && address.length > 0 ? (
            address.map((a) => (
              <View className="border-2 border-[#6e6df9] w-[95%] mt-3 rounded-lg p-2 pb-4">
                <View className="flex-row justify-between items-center ">
                  <View className="flex-row items-center">
                    <MaterialIcons name="house" color="#6e6df9" size={30} />
                    <Text className="text-[#6e6df9] font-semibold text-lg ml-1">Home</Text>
                  </View>
                  <View className="flex-row">
                    <TouchableOpacity onPress={() => handleEditAddress(a)}>
                      <Icon name="edit" color="#000" size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="ml-3"
                      onPress={() => handleDeleteAddress(a.id || a.addressId || '')}
                    >
                      <AntIcons name="delete" size={20} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text className="text-black">{a.street}</Text>
                <View className="flex-row mt-1">
                  <Text className="text-black">{a.city}</Text>
                  <Text className="ml-2 text-black">{a.state}</Text>
                </View>
                <View className="flex-row mt-1">
                  <Text className="text-black">{a.country}</Text>
                  <Text className="ml-2 text-black">{a.postalCode}</Text>
                </View>
              </View>
            ))
          ) : (
            <View className="items-center mt-8 w-full">
              <Text className="text-black font-semibold text-xl">No Addresses Available</Text>
              <Text className="w-[90%] text-center mt-3 ">
                You don't have any addresses saved yet. Add a new address to get started.
              </Text>
              <View className="flex-row justify-start w-full mt-5">
                <TouchableOpacity className="bg-black rounded p-2" onPress={handleAddNewAddress}>
                  <Text className="text-white font-semibold">Add New Shipping</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        {tab == 3 && <OrderTable />}

        {/* Modal for editing name or adding address */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-[#00000094]">
            <View className="bg-white rounded-lg p-6 w-full max-w-lg">
              <Text className="text-lg font-semibold text-center">
                {modalType === 'editName' ? 'Edit Name' : 'Add New Address'}
              </Text>
              <Text className="text-sm text-center text-neutral-500">
                {modalType === 'editName'
                  ? 'Update your first and last name below.'
                  : modalType === 'editAddress'
                  ? 'Update your address details below.'
                  : 'Enter your address details below.'}
              </Text>
              <View className="flex flex-col gap-4 mt-4">
                {modalType === 'editName' ? (
                  <>
                    <TextInput
                      className="h-10 border border-gray-300 rounded-md px-3 text-black"
                      placeholder="First Name"
                      value={details.first}
                      placeholderTextColor="#6b7280"
                      onChangeText={(text) => {
                        handleNameChange('first', text);
                      }}
                    />
                    <TextInput
                      className="h-10 border border-gray-300 rounded-md px-3 text-black"
                      placeholder="Last Name"
                      value={details.last}
                      placeholderTextColor="#6b7280"
                      onChangeText={(text) => {
                        handleNameChange('last', text);
                      }}
                    />
                  </>
                ) : (
                  <>
                    <TextInput
                      className="h-10 border border-gray-300 rounded-md px-3 text-black"
                      placeholder="Street"
                      value={shipping.street}
                      placeholderTextColor="#6b7280"
                      onChangeText={(t) => handleAddressChange('street', t)}
                      // Add state and handler for street
                    />
                    <TextInput
                      className="h-10 border border-gray-300 rounded-md px-3 text-black"
                      placeholder="City"
                      value={shipping.city}
                      placeholderTextColor="#6b7280"
                      onChangeText={(t) => handleAddressChange('city', t)}
                      // Add state and handler for city
                    />
                    <TextInput
                      className="h-10 border border-gray-300 rounded-md px-3 text-black"
                      placeholder="State"
                      value={shipping.state}
                      placeholderTextColor="#6b7280"
                      onChangeText={(t) => handleAddressChange('state', t)}
                      // Add state and handler for state
                    />

                    <TextInput
                      className="h-10 border border-gray-300 rounded-md px-3 text-black"
                      placeholder="Postal Code"
                      value={shipping.postalCode}
                      placeholderTextColor="#6b7280"
                      onChangeText={(t) => handleAddressChange('postalCode', t)}
                      // Add state and handler for postal code
                    />
                  </>
                )}
              </View>
              <View className="flex-row justify-end gap-2 mt-4">
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  className="border rounded p-1 border-gray-200 px-2"
                >
                  <Text className="text-black">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="border rounded p-1 bg-black border-gray-200 px-2"
                  onPress={handleUpdate}
                >
                  <Text className="text-white">
                    {modalType === 'editName'
                      ? 'Update Name'
                      : modalType == 'addAddress'
                      ? 'Add Address'
                      : 'Update Address'}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                className="absolute right-4 top-4 px-2 p-1"
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="close-outline" size={20} color="gray" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default ManageProfileScreen;
