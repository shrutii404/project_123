import React from 'react';
import {View, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// Function to convert UTC date to IST
const convertUTCToIST = utcDate => {
  const date = new Date(utcDate);
  const istOffset = 5 * 60 + 30; // IST is UTC +5:30
  const istTime = new Date(date.getTime() + istOffset * 60 * 1000);

  // Get day, month, and year
  const day = istTime.getDate().toString().padStart(2, '0');
  const month = (istTime.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
  const year = istTime.getFullYear();

  // Return the date in DD/MM/YYYY format
  return `${day}/${month}/${year}`;
};

// Component to render individual review
const ReviewItem = ({review, rating, date, user}) => {
  // Function to render stars based on rating
  const renderStars = rating => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <View className="flex-row">
        {Array.from({length: fullStars}).map((_, index) => (
          <FontAwesome key={index} name="star" size={20} color="gold" />
        ))}
        {hasHalfStar && (
          <FontAwesome name="star-half-full" size={20} color="gold" />
        )}
        {Array.from({length: emptyStars}).map((_, index) => (
          <FontAwesome key={index} name="star-o" size={20} color="gray" />
        ))}
      </View>
    );
  };

  return (
    <View className="flex-col md:flex-row gap-4 items-center md:items-start my-4">
      <View className="flex-col md:flex-row items-center gap-4">
        <FontAwesome name="user-circle" size={64} color="#6c757d" />
        <View className="flex-col items-center md:items-start">
          <Text className="text-lg font-medium text-black">
            {user || 'User'}
          </Text>
        </View>
      </View>
      <View className="flex-1 ml-4">{renderStars(rating)}</View>
      <View className="w-[80%] items-center">
        <Text className="text-black">{convertUTCToIST(date)}</Text>
        <Text className="text-center text-black w-full">{review}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
