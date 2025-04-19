import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width;

const data = [
  {
    id: 1,
    title: 'Image 1',
    uri: 'https://e-commerce-alpha-rouge.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FB4.1f812e5e.jpg&w=750&q=75',
  },
  {
    id: 2,
    title: 'Image 2',
    uri: 'https://e-commerce-alpha-rouge.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FB2.242cd48c.jpg&w=750&q=75',
  },
  {
    id: 3,
    title: 'Image 3',
    uri: 'https://e-commerce-alpha-rouge.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FB3.81169011.jpg&w=750&q=75',
  },
  {
    id: 4,
    title: 'Image 4',
    uri: 'https://e-commerce-alpha-rouge.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FB1.943a9817.jpg&w=750&q=75',
  },
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

const HomeCarousel = ({ type }: {type: 'herosection' | 'review'}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [activeIndex]);

  const startAutoScroll = () => {
    stopAutoScroll();
    intervalRef.current = setInterval(() => {
      let nextIndex = activeIndex + 1;
      if (nextIndex >= data.length) {
        nextIndex = 0;
      }
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setActiveIndex(nextIndex);
    }, 3000);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleDotPress = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
    setActiveIndex(index);
  };

  const handleArrowPress = (direction: number) => {
    let newIndex = activeIndex + direction;
    if (newIndex < 0) {
      newIndex = data.length - 1;
    } else if (newIndex >= data.length) {
      newIndex = 0;
    }
    flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
    setActiveIndex(newIndex);
  };

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / windowWidth);
    setActiveIndex(index);
  };

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.itemContainer}>
        {type == 'herosection' ? (
          <Image source={{ uri: item.uri }} className="w-full h-full" />
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
  }

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
      {type == 'herosection' && (
        <TouchableOpacity style={styles.leftArrow} onPress={() => handleArrowPress(-1)}>
          <Text style={styles.arrowText}>◀</Text>
        </TouchableOpacity>
      )}
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

export default React.memo(HomeCarousel);
