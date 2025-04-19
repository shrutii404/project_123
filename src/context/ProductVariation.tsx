'use client';

import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import axios from 'axios';
import apiClient from './apiClient';
import { apiEndpoint } from '../utils/constants';

// API endpoint

const api = apiEndpoint + '/product-variations';

export type Review = {
  id: number;
  rating: number;
  comment: string;
  userId: number;
  VariationId: number;
  createdAt: string; // Or Date, depending on how you handle dates
  updatedAt: string; // Or Date, depending on how you handle dates
};

export type Product = {
  id: number;
  sku: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  isReturnable: boolean;
  createdAt: string; // Use string for ISO date strings
  updatedAt: string; // Use string for ISO date strings
  keyFeatures: string[];
  prodSpecification: string[];
  categoryId: number;
};

// Define your ProductVariation type
export type ProductVariation = {
  discount: number | null;
  name: string;
  id: number;
  productId: number;
  attributes: Record<string, any>;
  price: number;
  product: Product;
  images: string[];
  sku: string;
  stock: number;
  createdAt: string; // Use string for ISO date strings
  updatedAt: string; // Use string for ISO date strings
  Review: Review[];
};

// Define the state type for product variations
type ProductVariationStateType = {
  productVariations: ProductVariation[];
  productVariation: ProductVariation | null;
  queriedProductVariations: ProductVariation[];
  loading: boolean;
  error: string | null;
};

// Define action types
type ProductVariationAction =
  | { type: 'FETCH_PRODUCT_VARIATIONS_REQUEST' }
  | { type: 'FETCH_PRODUCT_VARIATIONS_SUCCESS'; payload: ProductVariation[] }
  | { type: 'FETCH_PRODUCT_VARIATIONS_FAILURE'; payload: string }
  | {
      type: 'FETCH_SINGLE_PRODUCT_VARIATION_SUCCESS';
      payload: ProductVariation;
    }
  | {
      type: 'FETCH_PRODUCT_VARIATIONS_BY_QUERY_SUCCESS';
      payload: ProductVariation[];
    };

// Create initial state
const initialState: ProductVariationStateType = {
  productVariations: [],
  productVariation: null,
  queriedProductVariations: [],
  loading: false,
  error: null,
};

// Create the context with correct types
const ProductVariationContext = createContext<{
  state: ProductVariationStateType;
  dispatch: React.Dispatch<ProductVariationAction>;
  getAllProductVariations: () => void;
  getSingleProductVariation: (id: number) => void;
  getProductVariationsByQuery: (filters: { key: string; value: string; category: string }) => void;
}>({
  state: initialState,
  dispatch: () => null,
  getAllProductVariations: () => {},
  getSingleProductVariation: () => {},
  getProductVariationsByQuery: () => {},
});

// Reducer function to update state based on actions
const reducer = (
  state: ProductVariationStateType,
  action: ProductVariationAction
): ProductVariationStateType => {
  switch (action.type) {
    case 'FETCH_PRODUCT_VARIATIONS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_PRODUCT_VARIATIONS_SUCCESS':
      return {
        ...state,
        loading: false,
        productVariations: action.payload,
      };
    case 'FETCH_PRODUCT_VARIATIONS_BY_QUERY_SUCCESS':
      return {
        ...state,
        loading: false,
        queriedProductVariations: action.payload,
      };
    case 'FETCH_PRODUCT_VARIATIONS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'FETCH_SINGLE_PRODUCT_VARIATION_SUCCESS':
      return {
        ...state,
        loading: false,
        productVariation: action.payload,
      };
    default:
      return state;
  }
};

// ProductVariationProvider Component
export const ProductVariationProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getAllProductVariations = useCallback(async () => {
    dispatch({ type: 'FETCH_PRODUCT_VARIATIONS_REQUEST' });
    try {
      const response = await apiClient.get<ProductVariation[]>(api);
      const productVariations = response.data;
      dispatch({
        type: 'FETCH_PRODUCT_VARIATIONS_SUCCESS',
        payload: productVariations,
      });
    } catch (error: any) {
      dispatch({
        type: 'FETCH_PRODUCT_VARIATIONS_FAILURE',
        payload: error.message,
      });
    }
  }, []);

  const getSingleProductVariation = useCallback(async (id: number) => {
    dispatch({ type: 'FETCH_PRODUCT_VARIATIONS_REQUEST' });
    try {
      console.log(id);
      const response = await apiClient.get<ProductVariation>(`${api}/${id}`);
      const productVariation = response.data;
      console.log(productVariation);
      dispatch({
        type: 'FETCH_SINGLE_PRODUCT_VARIATION_SUCCESS',
        payload: productVariation,
      });
    } catch (error: any) {
      dispatch({
        type: 'FETCH_PRODUCT_VARIATIONS_FAILURE',
        payload: error.message,
      });
    }
  }, []);

  const getProductVariationsByQuery = useCallback(
    async (filters: { key: string; value: string; category: string }) => {
      dispatch({ type: 'FETCH_PRODUCT_VARIATIONS_REQUEST' });
      try {
        // Create a filter object with a dynamic key
        const queryParams = new URLSearchParams();
        queryParams.append(filters.key, filters.value);
        queryParams.append('category', filters.category);

        const queryString = queryParams.toString();
        console.log('ProductVariation Context getProductVariationsByQuery', queryString);

        const response = await apiClient.get<ProductVariation[]>(`${api}?${queryString}`);

        const productVariations = response.data;
        console.log(
          'ProductVariation Context getProductVariationsByQuery',
          productVariations.length
        );

        dispatch({
          type: 'FETCH_PRODUCT_VARIATIONS_BY_QUERY_SUCCESS',
          payload: productVariations,
        });
      } catch (error: any) {
        console.error('Error fetching product variations:', error.message || error);
        dispatch({
          type: 'FETCH_PRODUCT_VARIATIONS_FAILURE',
          payload: error.message || 'An unknown error occurred.',
        });
      }
    },
    []
  );

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
      getAllProductVariations,
      getSingleProductVariation,
      getProductVariationsByQuery,
    }),
    [state, getAllProductVariations, getSingleProductVariation, getProductVariationsByQuery]
  );

  useEffect(() => {
    getAllProductVariations();
  }, [getAllProductVariations]);

  return (
    <ProductVariationContext.Provider value={contextValue}>
      {children}
    </ProductVariationContext.Provider>
  );
};

// Custom Hook to use ProductVariationContext
export const useProductVariations = () => {
  const context = useContext(ProductVariationContext);
  if (!context) {
    throw new Error('useProductVariations must be used within a ProductVariationProvider');
  }
  return context;
};
