import React, { useEffect, useRef } from 'react';
import { View, Animated, Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const ShimmerEffect = ({ rows = false }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    );
    shimmerAnimation.start();
  }, [animatedValue]);

  // Create a translateX interpolation from 0 to 1, animating the shimmer
  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-screenWidth, screenWidth],
  });

  return (
    <View style={styles.container}>
      {/* Large placeholder */}
      {!rows && (
        <View style={[styles.placeholder, { width: screenWidth - 30, height: 300 }]}>
          <Animated.View
            style={[
              styles.shimmer,
              {
                width: screenWidth,
                transform: [{ translateX: translateX }], // move the shimmer horizontally
              },
            ]}
          />
        </View>
      )}

      {/* Smaller placeholder 1 */}

      {rows && (
        <View style={[styles.placeholder, { width: screenWidth * 0.9, height: 50, marginTop: 30 }]}>
          <Animated.View
            style={[
              styles.shimmer,
              {
                width: screenWidth,
                transform: [{ translateX: translateX }],
              },
            ]}
          />
        </View>
      )}

      {rows && (
        <View style={[styles.placeholder, { width: screenWidth * 0.9, height: 50, marginTop: 30 }]}>
          <Animated.View
            style={[
              styles.shimmer,
              {
                width: screenWidth,
                transform: [{ translateX: translateX }],
              },
            ]}
          />
        </View>
      )}

      <View style={[styles.placeholder, { width: screenWidth * 0.7, height: 50, marginTop: 30 }]}>
        <Animated.View
          style={[
            styles.shimmer,
            {
              width: screenWidth,
              transform: [{ translateX: translateX }],
            },
          ]}
        />
      </View>
      {/* Smaller placeholder 2 */}
      {!rows && (
        <View style={[styles.placeholder, { width: screenWidth * 0.5, height: 50, marginTop: 30 }]}>
          <Animated.View
            style={[
              styles.shimmer,
              {
                width: screenWidth,
                transform: [{ translateX: translateX }],
              },
            ]}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: '100%',
  },
  placeholder: {
    backgroundColor: '#edf5fd', // Background color for shimmer
    borderRadius: 10,
    overflow: 'hidden', // Ensure the shimmer animation stays within bounds
    position: 'relative',
  },
  shimmer: {
    height: '100%',
    backgroundColor: '#f1f7fe', // Shimmer highlight color
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.6, // Control opacity for shimmer effect
  },
});

export default ShimmerEffect;
