import React, { createContext, useContext, useState} from 'react';
import { Product } from '../types'; 
import { useApiError } from '../core/hooks/useApiError';
import { getErrorMessage } from '../core/error-handling/errorMessages';
import ApiService from '../services/apiService';

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Product[];
  loading: boolean;
  error: string | null;
  searchVisible: boolean;
  toggleSearchBar: () => void;
  handleFilter: () => Promise<void>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchVisible, setSearchVisible] = useState(false);

  const { handleError, clearError } = useApiError();

  const toggleSearchBar = () => {
    setSearchVisible(!searchVisible);
    if (!searchVisible) {
      setSearchQuery('');
      setSearchResults([]);
      clearError();
    }
  };

  const handleFilter = async () => {
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      setError(null);
      clearError();

      const response = await ApiService.searchProducts(searchQuery);
      setSearchResults(response.data);
    } catch (err) {
      console.error('Search error:', err);
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      handleError('SEARCH_ERROR');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchResults,
        loading,
        error,
        searchVisible,
        toggleSearchBar,
        handleFilter,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchBox = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearchBox must be used within a SearchProvider');
  }
  return context;
};

export default SearchProvider;
