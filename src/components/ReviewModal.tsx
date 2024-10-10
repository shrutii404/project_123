import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Modal, StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Assuming you are using FontAwesome for stars and close button

const ReviewModal = ({ isModalVisible, onCloseModal, productId }) => {
  const [rating, setRating] = useState(0); // Initial rating
  const [comment, setComment] = useState(''); // Initial comment

  const handleStarPress = (star) => {
    setRating(star);
  };


 

  const handleSubmitReview = async () => {

    const userDetailsString = await AsyncStorage.getItem('userDetails');
  
    // Parse the retrieved string to an object
    const userDetails = userDetailsString
      ? JSON.parse(userDetailsString)
      : null;
  
    // Check if token exists (indicating user is logged in)
    if (!userDetails && !userDetails.token) {
       Alert.alert(
            'Login Required',
            'You need to log in to write a review.',
            [{ text: 'OK' }],
          );
    }
console.log("@@@@",userDetails);

    const payload = {
      id: new Date().toISOString(),
      rating,
      comment,
      userId: userDetails.id, 
      VariationId: productId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(`https://www.hurlahardware.com/product/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log('Review submitted successfully!');
        onCloseModal(); // Close modal on successful submission
      } else {
        console.error('Error submitting review:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
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
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReview}>
            <Text style={styles.submitText}>Submit Review</Text>
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
    color: "black",
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
    color: "black",
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
