import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Modal, StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Assuming you are using FontAwesome for stars and close button
import ApiService from '../services/apiService';
import { getErrorMessage } from '../core/error-handling/errorMessages'; 

interface ReviewModalProps {
  isModalVisible: boolean;
  onCloseModal: () => void;
  productId: string;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isModalVisible, onCloseModal, productId }) => {
  const [rating, setRating] = useState<number>(0); // Initial rating
  const [comment, setComment] = useState<string>(''); // Initial comment
  const [loading, setLoading] = useState<boolean>(false); // Add a loading state

  const handleStarPress = (star: number) => {
    setRating(star);
  };

  const handleSubmitReview = async () => {
    if (!comment.trim()) {
      Alert.alert('Error', 'Please write a comment.');
      return;
    }

    if (rating === 0) {
      Alert.alert('Error', 'Please select a rating.');
      return;
    }

    setLoading(true);
    try {
      const userDetailsString = await AsyncStorage.getItem('userDetails');
      const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;

      if (!userDetails || !userDetails.token) {
        Alert.alert('Login Required', 'You need to log in to write a review.', [{ text: 'OK' }]);
        return;
      }

      const payload = {
        productId,
        rating,
        comment,
      };

      await ApiService.createReview(payload);
      Alert.alert('Success', 'Review submitted successfully!');
      onCloseModal();
    } catch (err) {
      console.error('Review submission error:', err);
      const errorMessage = getErrorMessage(err);
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={onCloseModal}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onCloseModal}>
            <Icon name="close" size={20} color="#000" />
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Write a Review</Text>
          <Text style={styles.modalSubtitle}>
            Share your experience with us by writing a review.
          </Text>

          {/* Star Rating System */}
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
                <Icon
                  name="star"
                  size={30}
                  color={star <= rating ? '#FFD700' : '#ccc'} // Fill color for selected stars
                  style={styles.star}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Comment Input */}
          <TextInput
            style={styles.commentInput}
            placeholder="Write your comment"
            multiline={true}
            onChangeText={setComment}
            value={comment}
          />

          {/* Submit Review Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReview} disabled={loading}>
            <Text style={styles.submitText}>{loading ? 'Submitting...' : 'Submit Review'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark semi-transparent background
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    position: 'relative', // Allows positioning for close button
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  star: {
    marginHorizontal: 5,
  },
  commentInput: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    textAlignVertical: 'top',
    color: 'black',
  },
  submitButton: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ReviewModal;
