import React, { createContext, useContext, useState } from 'react';
import { Product } from '../types';
import { useApiError } from '../core/hooks/useApiError';
import { getErrorMessage } from '../core/error-handling/errorMessages';
import apiClient from './apiClient';
import { apiEndpoint } from '../utils/constants';
import { Category } from './CategoryContext';

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
    setLoading(true);
    setError(null);
    clearError();
    try {
      // Fetch categories and filter by query
      const catRes = await apiClient.get<Category[]>(`${apiEndpoint}/categories`);
      const mappedCatProds = catRes.data
        .filter(cat =>
          cat.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .flatMap(cat =>
          cat.products.map(p => ({
            _id: p.id.toString(),
            name: p.name,
            description: p.description,
            price: p.price,
            thumbnail: p.images?.[0],
          }))
        );
      // Fetch product variations matching query
      const varRes = await apiClient.get(
        `${apiEndpoint}/product-variations?name=${encodeURIComponent(searchQuery)}`
      );
      const mappedVarProds = varRes.data.map((v: any) => ({
        _id: v.product.id.toString(),
        name: v.product.name,
        description: v.product.description,
        price: v.product.price,
        thumbnail: v.product.images?.[0],
      }));
      // Merge and dedupe
      const all = [...mappedCatProds, ...mappedVarProds];
      const uniqueMap: Record<string, any> = {};
      all.forEach(prod => {
        uniqueMap[prod._id] = prod;
      });
      setSearchResults(Object.values(uniqueMap));
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
