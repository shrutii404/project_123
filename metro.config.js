const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
    maxWorkers: 2,
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

// const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
// const exclusionList = require('metro-config/src/defaults/exclusionList');

// /**
//  * Metro configuration
//  * https://reactnative.dev/docs/metro
//  *
//  * @type {import('metro-config').MetroConfig}
//  */
// const config = {
//   maxWorkers: 2, // Limit the number of workers
//   watchFolders: [], // You can add specific folders to watch if necessary

//   resolver: {
//     // Exclude unnecessary folders from being watched
//     blacklistRE: exclusionList([
//       /.*\/\.git\/.*/, // Exclude git folder
//       /.*\/__tests__\/.*/, // Exclude test folders
//       /.*\/android\/.*/, // Exclude android build files
//       /.*\/ios\/.*/, // Exclude ios build files
//     ]),
//   },

//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: true, // Improve performance by inlining requires
//       },
//     }),
//   },
// };

// module.exports = mergeConfig(getDefaultConfig(__dirname), config);


// const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

// const config = {
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false, // Disable experimental import support for compatibility
//       },
//     }),
//   },
//   resolver: {
//     assetExts: ['png', 'jpg', 'jpeg', 'gif', 'svg', 'ttf'], // Add your custom extension here
//   },
// };

// module.exports = mergeConfig(getDefaultConfig(__dirname), config);

// const { getDefaultConfig } = require('@react-native/metro-config');
// const path = require('path');

// module.exports = (async () => {
//   const defaultConfig = await getDefaultConfig(__dirname);

//   return {
//     ...defaultConfig,
//     // transformer: {
//     //   getTransformOptions: async () => ({
//     //     transform: {
//     //       experimentalImportSupport: false,
//     //       inlineRequires: true,
//     //     },
//     //   }),
//     // },
//     resolver: {
//       assetExts: [...defaultConfig.resolver.assetExts, 'jpg', 'png', 'jpeg', 'svg', 'ttf'],
//       // blockList: [
//       //   new RegExp(`^${path.resolve(__dirname, 'node_modules').replace(/\\/g, '/')}\/.*`),
//       // ],
//     },
//     watchFolders: [
//       path.resolve(__dirname, '..'),
//     ],
//     server: {
//       useWatchman: false, // Disable Watchman
//     },
//   };
// })();
