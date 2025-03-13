import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { View } from 'react-native';

const SearchIcon = () => {
  return (
    <View className="mr-3">
      <Svg
        width={30} // Adjust width and height as needed
        height={30}
        viewBox="0 0 256 256" // Set the viewBox to fit the path
      >
        <Path
          d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
          fill="black" // Change fill color as needed
        />
      </Svg>
    </View>
  );
};

export default SearchIcon;
