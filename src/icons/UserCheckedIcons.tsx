import React from 'react';
import {Svg, Path} from 'react-native-svg';
import {View} from 'react-native';

const UserCheckedIcon = () => {
  return (
    <View className="">
      <Svg
        width={30} // Adjust width and height as needed
        height={30}
        viewBox="0 0 256 256" // Adjust viewBox to fit the path
      >
        <Path d="M144,157.68a68,68,0,1,0-71.9,0c-20.65,6.76-39.23,19.39-54.17,37.17a8,8,0,0,0,12.25,10.3C50.25,181.19,77.91,168,108,168s57.75,13.19,77.87,37.15a8,8,0,0,0,12.25-10.3C183.18,177.07,164.6,164.44,144,157.68ZM56,100a52,52,0,1,1,52,52A52.06,52.06,0,0,1,56,100Zm197.66,33.66-32,32a8,8,0,0,1-11.32,0l-16-16a8,8,0,0,1,11.32-11.32L216,148.69l26.34-26.35a8,8,0,0,1,11.32,11.32Z" />
      </Svg>
    </View>
  );
};

export default UserCheckedIcon;
