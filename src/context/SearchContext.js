import React, { createContext, useState } from 'react';
import { Modal, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Ensure you have react-native-vector-icons installed
import { useGetProductVariationsQuery } from '../store/slices/apiSlice';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const {
    data: products,
    error: productserror,
    isLoading: productLoading,
  } = useGetProductVariationsQuery();

  const toggleSearchBar = () => {
    setSearchVisible(!searchVisible);
  };

  const handleFilter = () => {
    setLoading(true);
    setSearchResults([]);
    const filterdata = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filterdata);
    setLoading(false);
  };

  return (
    <SearchContext.Provider
      value={{
        toggleSearchBar,
        searchVisible,
        searchQuery,
        setSearchQuery,
        handleFilter,
        loading,
        searchResults,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchBox = () => React.useContext(SearchContext);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
});
