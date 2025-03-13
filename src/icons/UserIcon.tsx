import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { View } from 'react-native';

const UserIcon = () => {
  return (
    <View className="">
      <Svg
        width={30} // Adjust width and height as needed
        height={30}
        viewBox="0 0 256 256" // Adjust viewBox to fit the path
      >
        <Path
          d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"
          fill="black" // Change fill color as needed
        />
      </Svg>
    </View>
  );
};

export default UserIcon;
