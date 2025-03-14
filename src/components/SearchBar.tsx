import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSearchBox } from '../context/SearchContext';

interface SearchBarProps {
  searchVisible: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchVisible }) => {
  const navigation = useNavigation();
  const { searchQuery, setSearchQuery, handleFilter, toggleSearchBar } = useSearchBox();

  const handleSearch = () => {
    toggleSearchBar();
    navigation.navigate('SearchResults');
    handleFilter();
  };

  if (!searchVisible) return null;

  return (
    <View className="py-3 px-4 bg-white border-b border-gray-200">
      <View className="flex-row items-center overflow-hidden bg-white">
        <TextInput
          className="flex-1 px-3 py-2 text-sm text-gray-700 placeholder-gray-500  bg-[#f5f5f5] rounded-md border border-0.5 border-gray-300"
          placeholder="Search here..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#a0aec0"
        />
        <TouchableOpacity className="bg-black p-3 rounded-full ml-2" onPress={handleSearch}>
          <Ionicons name="search-outline" size={21} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBar;
