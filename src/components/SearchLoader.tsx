import React from 'react';
import {View, StyleSheet} from 'react-native';
import Gif from 'react-native-gif';

const SearchLoader = () => {
  return (
    <View style={styles.container}>
      <Gif
        source={{
          uri: 'https://e-commerce-alpha-rouge.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsearch.d580bb4b.gif&w=3840&q=75',
        }}
        style={styles.gif}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gif: {
    width: 200, // Set width as per your requirement
    height: 200, // Set height as per your requirement
  },
});

export default SearchLoader;
