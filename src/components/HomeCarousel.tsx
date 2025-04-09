import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const image1 = require('../assets/FB0.jpg');
const image2 = require('../assets/FB1.jpg');
const image3 = require('../assets/FB2.jpg');
const image4 = require('../assets/FB3.jpg');
const image5 = require('../assets/FB4.jpg');
const image6 = require('../assets/p1.jpg');
const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const data = [
  {
    id: 1,
    title: 'Image 1',
    uri: image1,
  },
  {
    id: 2,
    title: 'Image 2',
    uri: image2,
  },
  {
    id: 3,
    title: 'Image 3',
    uri: image3,
  },
  {
    id: 4,
    title: 'Image 4',
    uri: image4,
  },
  // {
  //   id: 5,
  //   title: 'Image 5',
  //   uri: image5,
  // },
  // {
  //   id: 6,
  //   title: 'Image 6',
  //   uri: image6,
  // },
];

const reviewdata = [
  {
    id: 1,
    rating: 5,
    review:
      'Variety store; must say that huge variety of hardware &amp; plywood, laminates, and other allied items. Service is normal. Good shopping as desired.',
    reviewby: 'Naveen',
  },
  {
    id: 2,
    rating: 5,
    review:
      'A very reliable shop. You can find all varieties of hardware here. Also, the staff is very cooperative. Hurla has other shops as well which are required to build a new home. So if you are building a new home and want materials, surely visit Hurla.All the best.😊😊😊😊',
    reviewby: 'Ayusth Bailwal',
  },
  {
    id: 3,
    rating: 5,
    review:
      "Prices are cheaper. Owner is very helpful, guides you to the right product, and doesn't make you a fool. Will entertain you to the best. Have lots of products; will get all the products under one roof. Best hardware shop in Dehradun.",
    reviewby: 'Yagya Sharma',
  },
  {
    id: 4,
    rating: 5,
    review:
      'A very good hardware outlet in Dehradun having a good variety of items at reasonable cost. Please come with time in hand due to rush. Customer dealing get full marks.',
    reviewby: 'Ram Kumar',
  },
];

const HomeCarousel = ({ type }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll(); // Clean up the interval on unmount
  }, [activeIndex]);

  const startAutoScroll = () => {
    stopAutoScroll(); // Ensure any existing interval is cleared
    intervalRef.current = setInterval(() => {
      let nextIndex = activeIndex + 1;
      if (nextIndex >= data.length) {
        nextIndex = 0;
      }
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
      setActiveIndex(nextIndex);
    }, 3000); // Change slide every 3 seconds
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleDotPress = (index) => {
    flatListRef.current.scrollToIndex({ index, animated: true });
    setActiveIndex(index);
    stopAutoScroll(); // Stop auto-scrolling when manually scrolling
    startAutoScroll(); // Restart auto-scrolling
  };

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / windowWidth);
    setActiveIndex(index);
  };

  const handleArrowPress = (direction) => {
    let nextIndex = activeIndex + direction;
    if (nextIndex >= data.length) {
      nextIndex = 0;
    } else if (nextIndex < 0) {
      nextIndex = data.length - 1;
    }
    flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
    setActiveIndex(nextIndex);
    stopAutoScroll(); // Stop auto-scrolling when manually scrolling
    startAutoScroll(); // Restart auto-scrolling
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        {type === 'herosection' ? (
          <Image source={item.uri} style={styles.image} />
        ) : (
          <View className="w-[90%] h-[200px] p-4 rounded-lg bg-white border border-gray-300 items-center flex-col  justify-center">
            <View>
              <View className="flex-row justify-center mb-2">
                {Array.from({ length: item.rating }).map((_, index) => (
                  <Ionicons key={index} name="star" size={20} color="#000" />
                ))}
                {Array.from({ length: 5 - item.rating }).map((_, index) => (
                  <Ionicons key={index} name="star-outline" size={20} color="#000" />
                ))}
              </View>
              <View className="mb-2 flex-row w-[70%]">
                <FontAwesome6 name="quote-left" size={30} color="#000" />
                <Text className="text-center text-gray-700">{item.review}</Text>
                <View className="justify-end">
                  <FontAwesome6 name="quote-right" size={30} color="#000" />
                </View>
              </View>
              <View className="flex-col items-center justify-center ">
                <FontAwesome5 name="user-circle" size={25} color="#000" />
                <Text className="text-center text-gray-500">{item.reviewby}</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  };

  const renderDotIndicator = () => {
    return (
      <View style={styles.dotContainer}>
        {data.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.dot, index === activeIndex ? styles.activeDot : null]}
            onPress={() => handleDotPress(index)}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={type == 'herosection' ? data : reviewdata}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      {type == 'herosection' && renderDotIndicator()}

      {/* Left Arrow */}
      {type == 'herosection' && (
        <TouchableOpacity style={styles.leftArrow} onPress={() => handleArrowPress(-1)}>
          <Text style={styles.arrowText}>◀</Text>
        </TouchableOpacity>
      )}

      {/* Right Arrow */}
      {type == 'herosection' && (
        <TouchableOpacity style={styles.rightArrow} onPress={() => handleArrowPress(1)}>
          <Text style={styles.arrowText}>▶</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  itemContainer: {
    width: windowWidth,
    minHeight: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ffffff55',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#fff',
  },
  leftArrow: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: [{ translateY: -20 }],
    zIndex: 1,
  },
  rightArrow: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -20 }],
    zIndex: 1,
  },
  arrowText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default HomeCarousel;
