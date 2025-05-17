import React, { createContext, useContext, useState } from 'react';
import { Product } from '../types';
import { useApiError } from '../core/hooks/useApiError';
import { getErrorMessage } from '../core/error-handling/errorMessages';
import apiClient from './apiClient';
import { apiEndpoint } from '../utils/constants';

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
      const varRes = await apiClient.get(`${apiEndpoint}/product-variations`);
      const normalizedQuery = searchQuery.toLowerCase().trim();
      const queryWords = normalizedQuery.split(/\s+/);
      const normalize = (str: string = ''): string =>
        str
          ?.toLowerCase()
          .replace(/[\s\-|]+/g, ' ')
          .trim() || '';
      const formatSize = (size: string = ''): string => {
        if (!size) return '';
        const sizeParts = size
          .replace(/[\s\-]+/g, ' ')
          .toLowerCase()
          .split(/[\sX*]+/);
        const feet = sizeParts[0] || '';
        const inches = sizeParts[1] || '';
        return `${feet} feet X ${inches} inches`;
      };
      const combineAttributes = (attributes: Record<string, string> = {}): string => {
        if (!attributes) return '';
        return Object.entries(attributes)
          .map(([key, value]) =>
            key.split('_')[1] === 'Size' || key === 'Size' ? formatSize(value) : normalize(value)
          )
          .join(' ');
      };
      const matchesQuery = (
        productName: string,
        attributes: Record<string, string>,
        query: string
      ): boolean => {
        const formattedProductName = normalize(productName).replace(/-/g, ' ');
        const formattedAttributes = combineAttributes(attributes);
        const normalizedQuery = normalize(query);
        return (
          formattedProductName.includes(normalizedQuery) ||
          formattedAttributes.includes(normalizedQuery)
        );
      };
      const filtered = (varRes.data as any[]).filter((product: any) =>
        queryWords.every((query) => matchesQuery(product.name, product.attributes, query))
      );
      const mapped = filtered.map((p: any) => ({
        _id: p.id?.toString() || p._id?.toString() || '',
        name: p.name,
        description: p.description,
        price: p.price,
        thumbnail: p.images?.[0],
      }));
      setSearchResults(mapped);
    } catch (err: any) {
      const errorMessage = getErrorMessage(String(err));
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
