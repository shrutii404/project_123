import { View, Text, Image } from 'react-native';
import React from 'react';
import catalogImage from '../assets/catalog.gif';

const CatalogIcons = () => {
  return (
    <Image
      height={20}
      width={20}
      source={catalogImage}
      // Adjust this to 'contain' or 'stretch' as needed
    />
  );
};

export default CatalogIcons;
