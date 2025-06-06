import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ReviewItem from './ReviewItem';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ReviewModal from './ReviewModal';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

const ReviewsSection = ({ data, avgRating, allData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();
  const user = useAuth() 

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const checkUserLogin = () => {
    if (user) {
      handleOpenModal();
    } else {
      navigation.navigate('Login');
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <View className="flex-row ml-2">
        {Array.from({ length: fullStars }).map((_, index) => (
          <FontAwesome key={index} name="star" size={20} color="gold" />
        ))}
        {hasHalfStar && <FontAwesome name="star-half-full" size={20} color="gold" />}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <FontAwesome key={index} name="star-o" size={20} color="gray" />
        ))}
      </View>
    );
  };

  return (
    <View className="p-8 border rounded-md border-gray-300">
      <View className="flex-row justify-between items-center">
        <Text className="text-lg text-black">Reviews</Text>
        <TouchableOpacity
          className="bg-neutral-900 text-neutral-50 rounded-md h-9 px-2 flex-row items-center justify-center"
          onPress={checkUserLogin}
        >
        <Text className="text-xs text-white">WRITE A REVIEW</Text>
        </TouchableOpacity>
      </View>
      <ReviewModal
        isModalVisible={isModalVisible}
        onCloseModal={handleCloseModal}
        productId={allData.id}
      />

      <View className="h-[1px] bg-gray-300 my-4" />

      <View className="flex-col md:flex-row space-x-4 text-sm">
        <View className="flex-1 flex-col items-center p-6">
          <Text className="text-2xl font-semibold text-black">Total Reviews</Text>
          <Text className="text-3xl font-bold text-black">{data?.length}</Text>
          <Text className="text-sm text-gray-500">Total number of reviews</Text>
        </View>
        <View className="h-56 w-[1px] bg-gray-300 hidden md:block" />
        <View className="flex-1 flex-col items-center p-6">
          <Text className="text-2xl font-semibold text-black">Average Rating</Text>
          <View className="flex-row items-center">
            <Text className="text-3xl font-bold text-black">{avgRating.toFixed(1)}</Text>
            {renderStars(avgRating)}
          </View>
          <Text className="text-sm text-gray-500">Average rating on this product</Text>
        </View>
      </View>

      <View className="h-[1px] bg-gray-300 my-4" />

      {data?.map((review, index) => (
        <ReviewItem
          key={index}
          user={review.user}
          review={review.comment}
          rating={review.rating}
          date={review.createdAt}
        />
      ))}
    </View>
  );
};

export default ReviewsSection;
