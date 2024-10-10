import React from 'react';
import {Svg, Path} from 'react-native-svg';
import {View} from 'react-native';

const MenuIcon = () => {
  return (
    <View className="mr-3">
      <Svg
        width={30} // Adjust width and height as needed
        height={30}
        viewBox="0 0 256 256" // Adjust the viewBox to fit the path
      >
        <Path
          d="M32,64a8,8,0,0,1,8-8H216a8,8,0,0,1,0,16H40A8,8,0,0,1,32,64Zm8,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16Zm104,48H40a8,8,0,0,0,0,16H144a8,8,0,0,0,0-16Zm88,0H216V168a8,8,0,0,0-16,0v16H184a8,8,0,0,0,0,16h16v16a8,8,0,0,0,16,0V200h16a8,8,0,0,0,0-16Z"
          fill="black" // Change fill color if needed
        />
      </Svg>
    </View>
  );
};

export default MenuIcon;
