import { View, Text, ScrollView, Pressable, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductImageSlider from '../../components/ProductImageSlider';
import ShimmerEffect from '../../components/ShimmerEffect';
import axios from 'axios';
import ReviewsSection from '../../components/ReviewSection';
import SearchBar from '../../components/SearchBar';
import { useSearchBox } from '../../context/SearchContext';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../store/slices/cartSlice';

const ProductDetailsScreen = ({ route }) => {
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [type, setType] = useState('description');
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [productData, setProductData] = useState();
  const { searchVisible } = useSearchBox();
  const dispatch = useDispatch();
  const handleQuantity = (type) => {
    if (type == 'increment') {
      setQuantity((prev) => prev + 1);
    } else {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    }
  };
  const { data } = route.params;

  const getProductVariationDetails = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://ecommercedev-production.up.railway.app/api/product-variations/${id}`
      );
      if (response.data) {
        setProductData(response.data);

        const ratings = response.data?.Review.map((item) => item.rating);

        // Ensure there are ratings to avoid division by zero
        const averageRating =
          ratings?.length > 0
            ? ratings?.reduce((acc, rating) => acc + rating, 0) / ratings?.length
            : 0;
        setRating(averageRating);
      }
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error('Error fetching children data:', error);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  useEffect(() => {
    if (data?.id) {
      getProductVariationDetails(data.id);
    }
  }, [data]);

  const handlePincodeChange = (text) => {
    setPincode(text);
  };

  const handleType = (texttype) => {
    setType(texttype);
  };

  const handleAddToCart = () => {
    dispatch(addProduct(productData));
  };
  return (
    <ScrollView className="bg-white">
      {!loading ? (
        <View>
          <SearchBar searchVisible={searchVisible} />
          <View className="px-4 ">
            <Text className="text-black text-xl font-bold ">{data.name}</Text>
            <View className="flex-row justify-between my-2">
              <View className="bg-[#dee2e6] rounded items-center p-1 px-2 ">
                <Text className="text-black">{data.product.name}</Text>
              </View>
              <View className=" z-20 rounded p-1 bg-[#dee2e6]  ">
                <Ionicons name="heart-outline" color="gray" size={20} />
              </View>
            </View>
            <ProductImageSlider images={data.images} />
            <View className="mt-7">
              <View className="flex-row items-center">
                <Text className="text-black text-sm">
                  <Text className="font-bold text-xl">{data.price}/</Text>price
                </Text>
                <Text className="text-black ml-2 text-sm">(Inc. all taxes)</Text>
              </View>
              <View className="text-base">
                <Text className="text-red-700 text-sm">(6/sq.ft)</Text>
              </View>
              <View className="mt-2 flex-row items-center ">
                <View className="bg-[#ff0a54] flex-row items-center rounded-lg px-2 py-1 justify-center w-1/6">
                  <Text className="text-white text-sm mr-2">{rating.toFixed(1)}</Text>
                  <Ionicons name="star" color="#fff" Name="text-white" size={15} />
                </View>
                <View className="text-xs ml-3 ">
                  <Text className="text-black">({data.Review.length} review)</Text>
                </View>
                <View className="bg-[#d9ed92] rounded-md px-2 py-1 ml-3">
                  <Text className="text-[#4c956c]">In-Stock</Text>
                </View>
                <View className="flex-row items-center ml-3">
                  <Text className="text-black">Return Policy:</Text>
                  <Ionicons name="checkmark-circle-outline" size={20} color="green" />
                </View>
              </View>
              <View className="flex-row my-10 justify-between">
                <View className="flex-row border border-[#dee2e6]">
                  <Pressable
                    className="py-2 px-4 border-r  border-[#dee2e6] text-black"
                    onPress={() => handleQuantity('decrement')}
                  >
                    <Text className="text-black">-</Text>
                  </Pressable>
                  <View className="py-2 px-6">
                    <Text className="text-black">{quantity}</Text>
                  </View>
                  <Pressable
                    className="py-2 px-4 border-l  border-[#dee2e6]"
                    onPress={() => handleQuantity('increment')}
                  >
                    <Text className="text-black">+</Text>
                  </Pressable>
                </View>
                <TouchableOpacity
                  className="bg-black rounded flex-row items-center justify-center w-[55%] ml-4"
                  onPress={handleAddToCart}
                >
                  <Ionicons name="cart-outline" size={30} color="#fff" />
                  <Text className="text-white font-bold ml-2">ADD TO CART</Text>
                </TouchableOpacity>
              </View>
              <View className="mb-10 flex-row">
                <View className="bg-[#F0F0F0]  px-2 flex-row w-[70%] items-center ">
                  <Ionicons name="location-outline" size={25} color="#000" />
                  <TextInput
                    placeholder="Enter Pincode"
                    placeholderTextColor={'gray'}
                    className="ml-3"
                    onPress={handlePincodeChange}
                    value={pincode}
                  />
                </View>
                <TouchableOpacity className="bg-black w-[30%] items-center justify-center rounded-r">
                  <Text className=" text-white font-bold ">Check</Text>
                </TouchableOpacity>
              </View>
              <View className="bg-[#FEF8E8] flex-row items-center p-2 px-5 rounded-full">
                <MaterialCommunityIcons name="truck-outline" size={30} color="#000" />
                <Text className="text-black mx-5">
                  Enter your pincode to check avaliability in your area
                </Text>
              </View>
              <View className="my-10">
                <Text className="text-xs text-gray-400">No Specifications available</Text>
              </View>

              <View className="flex-row justify-between border-b border-gray-200 pb-10 ">
                <TouchableOpacity
                  onPress={() => handleType('description')}
                  className={`border border-gray-400 p-2 px-3 rounded-full ${
                    type == 'description' ? 'bg-[#F7F7F7]' : 'bg-white'
                  }`}
                >
                  <Text className="text-black">Description</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleType('keyfeatures')}
                  className={`border border-gray-400 p-2 px-3 rounded-full ${
                    type == 'keyfeatures' ? 'bg-[#F7F7F7]' : 'bg-white'
                  }`}
                >
                  <Text className="text-black">Key Features</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleType('paymenttnc')}
                  className={`border border-gray-400 p-2 px-3 rounded-full ${
                    type == 'paymenttnc' ? 'bg-[#F7F7F7]' : 'bg-white'
                  }`}
                >
                  <Text className="text-black">Payment TNC</Text>
                </TouchableOpacity>
              </View>

              <View className=" broder-b py-10 ">
                {type == 'description' && (
                  <View>
                    <Text className="text-black">Wooden</Text>
                  </View>
                )}
                {type == 'keyfeatures' && (
                  <View>
                    <Text>No Key Features Available</Text>
                  </View>
                )}
                {type == 'paymenttnc' && (
                  <View className="border-b border-gray-300 pb-10">
                    <View className="flex-row items-start">
                      <View className="bg-gray-400 w-1 h-1 rounded-full mt-2"></View>

                      <Text className="text-gray-400 font-medium ml-2 ">
                        <Text className="text-black font-semibold">Payment Methods</Text>
                        :We accept both COD and UPI payment options. In case of COD, 25% of the
                        amount has to be paid in advance via UPI or Bank Transfers. The remaining
                        75% could be paid on delivery. We also provide a 2% discount to customers
                        who pay in full in advance through UPI.
                      </Text>
                    </View>
                    <View className="flex-row items-start">
                      <View className="bg-gray-400 w-1 h-1 rounded-full mt-2"></View>

                      <Text className="text-gray-400 font-medium ml-2 ">
                        <Text className="text-black font-semibold">Taxes</Text>
                        :Please note that the amount mentioned is inclusive of all taxes. Delivery
                        charges will be applicable on certain items.
                      </Text>
                    </View>
                    <View className="flex-row items-start">
                      <View className="bg-gray-400 w-1 h-1 rounded-full mt-2"></View>

                      <Text className="text-gray-400 font-medium ml-2 ">
                        <Text className="text-black font-semibold">Payment Confirmation</Text>
                        :We’d ask you to send a screenshot of the UPI payment via WhatsApp to
                        confirm your payment.
                      </Text>
                    </View>
                    <View className="flex-row items-start">
                      <View className="bg-gray-400 w-1 h-1 rounded-full mt-2"></View>

                      <Text className="text-gray-400 font-medium ml-2 ">
                        <Text className="text-black font-semibold">
                          Your payment information is secure with us. We use industry standard
                          encryption and comply with all related regulations.Payment Methods
                        </Text>
                      </Text>
                    </View>
                    <View className="flex-row items-start">
                      <View className="bg-gray-400 w-1 h-1 rounded-full mt-2"></View>

                      <Text className="text-gray-400 font-medium ml-2 ">
                        <Text className="text-black font-semibold">Order Cancellation</Text>
                        :Cancellation of your order on grounds of damaged products/less quantity
                        received is accepted. We do not accept order cancellation in case of quality
                        issues, as we only deal with top-quality products.
                      </Text>
                    </View>
                  </View>
                )}
              </View>
              <View className="w-full items-center">
                <View className="flex-row justify-between w-[90%] mb-5">
                  <Text className="text-black font-[500] text-base">Similar Plywood Products</Text>
                  <Text className="text-gray-500">See all</Text>
                </View>
                {/* <ProductsCard className="w-full border p-4" /> */}
              </View>

              {productData && productData?.Review && (
                <ReviewsSection
                  data={productData.Review}
                  allData={productData}
                  avgRating={rating}
                />
              )}
            </View>
          </View>
          {/* <HomeFooter /> */}
        </View>
      ) : (
        <View className="flex-1 bg-white">
          <ShimmerEffect />
        </View>
      )}
    </ScrollView>
  );
};

export default ProductDetailsScreen;
