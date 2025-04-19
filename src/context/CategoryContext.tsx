'use client';
import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import apiClient from './apiClient';
import { apiEndpoint } from '../utils/constants';

const api = apiEndpoint+"/categories";

export type Category = {
  categoryDiscount: number | null;
  id: number;
  name: string;
  parentId?: number;
  valuesAvailable: string[];
  images: string[];
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  parent?: Category;
  children: Category[];
  products: Product[];
};

type Product = {
  id: number;
  sku: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  isReturnable: boolean;
  createdAt: Date;
  updatedAt: Date;
  keyFeatures: string[];
  prodSpecification: string[];
  categoryId: number;
};

// Define the state type for categories
type CategoryStateType = {
  categories: Category[];
  category: Category | null;
  loading: boolean;
  error: string | null;
};

// Define action types
type CategoryAction =
  | { type: 'FETCH_CATEGORIES_REQUEST' }
  | { type: 'FETCH_CATEGORIES_SUCCESS'; payload: Category[] }
  | { type: 'FETCH_CATEGORIES_FAILURE'; payload: string }
  | { type: 'FETCH_SINGLE_CATEGORY_SUCCESS'; payload: Category };

// Create initial state
const initialState: CategoryStateType = {
  categories: [],
  category: null,
  loading: false,
  error: null,
};

// Create the context with correct types
const CategoryContext = createContext<{
  state: CategoryStateType;
  dispatch: React.Dispatch<CategoryAction>;
  getAllCategories: () => void;
  getSingleCategory: (id: number) => void;
}>({
  state: initialState,
  dispatch: () => null,
  getAllCategories: () => {},
  getSingleCategory: () => {},
});

// Reducer function to update state based on actions
const reducer = (state: CategoryStateType, action: CategoryAction): CategoryStateType => {
  switch (action.type) {
    case 'FETCH_CATEGORIES_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_CATEGORIES_SUCCESS':
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    case 'FETCH_CATEGORIES_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'FETCH_SINGLE_CATEGORY_SUCCESS':
      return {
        ...state,
        loading: false,
        category: action.payload,
      };
    default:
      return state;
  }
};

// CategoryProvider Component
export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getAllCategories = useCallback(async () => {
    dispatch({ type: 'FETCH_CATEGORIES_REQUEST' });
    try {
      const response = await apiClient.get<Category[]>(`${api}`);
      const categories = response.data; // Extract data from AxiosResponse
      dispatch({ type: 'FETCH_CATEGORIES_SUCCESS', payload: categories });
    } catch (error: any) {
      dispatch({ type: 'FETCH_CATEGORIES_FAILURE', payload: error.message });
    }
  }, []);

  const getSingleCategory = useCallback(async (id: number) => {
    dispatch({ type: 'FETCH_CATEGORIES_REQUEST' });
    try {
      const response = await apiClient.get<Category>(`${api}/${id}`);
      const category = response.data;
      dispatch({ type: 'FETCH_SINGLE_CATEGORY_SUCCESS', payload: category });
    } catch (error: any) {
      dispatch({ type: 'FETCH_CATEGORIES_FAILURE', payload: error.message });
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
      getAllCategories,
      getSingleCategory,
    }),
    [state, dispatch, getAllCategories, getSingleCategory]
  );

  // Fetch categories on mount
  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

  return <CategoryContext.Provider value={contextValue}>{children}</CategoryContext.Provider>;
};

// Custom Hook to use CategoryContext
export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
};
