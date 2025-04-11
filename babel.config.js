module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Required for NativeWind
      'nativewind/babel',
      // Required for react-native-reanimated (must be last)
      'react-native-reanimated/plugin',
    ],
  };
};
