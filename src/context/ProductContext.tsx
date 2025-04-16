"use client";
import {
  ReactNode,
  createContext,
  useReducer,
  useContext,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";
import apiClient from "./apiClient";



 const api = `${process.env.NEXT_PUBLIC_API_URL}/api`;


// Define your Product type
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

// Define the state type for products
type ProductStateType = {
  products: Product[];
  product: Product | null;
  loading: boolean;
  error: string | null;
};

// Define action types
type ProductAction =
  | { type: "FETCH_PRODUCTS_REQUEST" }
  | { type: "FETCH_PRODUCTS_SUCCESS"; payload: Product[] }
  | { type: "FETCH_PRODUCTS_FAILURE"; payload: string }
  | { type: "FETCH_SINGLE_PRODUCT_SUCCESS"; payload: Product };

// Create initial state
const initialState: ProductStateType = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

// Create the context with correct types
const ProductContext = createContext<{
  state: ProductStateType;
  dispatch: React.Dispatch<ProductAction>;
  getAllProducts: () => void;
  getSingleProduct: (productId: number) => void;
}>({
  state: initialState,
  dispatch: () => null,
  getAllProducts: () => {},
  getSingleProduct: () => {},
});

// Reducer function to update state based on actions
const reducer = (
  state: ProductStateType,
  action: ProductAction
): ProductStateType => {
  switch (action.type) {
    case "FETCH_PRODUCTS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_PRODUCTS_SUCCESS":
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case "FETCH_PRODUCTS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "FETCH_SINGLE_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        product: action.payload,
      };
    default:
      return state;
  }
};

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getAllProducts = useCallback(async () => {
    dispatch({ type: "FETCH_PRODUCTS_REQUEST" });
    try {
      const response = await apiClient.get<Product[]>(`${api}/products`);
      const products = response.data; // Extract data from AxiosResponse

      dispatch({ type: "FETCH_PRODUCTS_SUCCESS", payload: products });
    } catch (error: any) {
      dispatch({ type: "FETCH_PRODUCTS_FAILURE", payload: error.message });
    }
  }, []);

  const getSingleProduct = useCallback(async (productId: number) => {
    dispatch({ type: "FETCH_PRODUCTS_REQUEST" });
    try {
      const response = await apiClient.get<Product>(`${api}/products/${productId}`);
      const product = response.data;
      console.log(product)

      dispatch({ type: "FETCH_SINGLE_PRODUCT_SUCCESS", payload: product });
    } catch (error: any) {
      dispatch({ type: "FETCH_PRODUCTS_FAILURE", payload: error.message });
    }
  }, []);

  // Use memoization to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
      getAllProducts,
      getSingleProduct,
    }),
    [state, dispatch, getAllProducts, getSingleProduct]
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
