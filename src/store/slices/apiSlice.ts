import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiEndpoint } from '../../utils/constants';
import { 
  LoginRequest, 
  VerifyOtpRequest, 
  LoginResponse, 
  ResendOtpRequest, 
  User,
  UserAddress
} from '../../types/auth';

const baseUrl = apiEndpoint;

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: async (headers) => {
    try {
      const userDetailsString = await AsyncStorage.getItem('userDetails');
      const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
      const token = userDetails?.token;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    } catch (error) {
      console.error('Error setting auth header:', error);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    // Authentication endpoints
    loginUser: builder.mutation<{ message: string }, LoginRequest>({
      query: (data) => ({
        url: 'login',
        method: 'POST',
        body: data,
      }),
    }),
    verifyUser: builder.mutation<LoginResponse, VerifyOtpRequest>({
      query: (data) => ({
        url: 'login/verifyOTP',
        method: 'POST',
        body: data,
      }),
    }),
    resendOTP: builder.mutation<{ message: string }, ResendOtpRequest>({
      query: (data) => ({
        url: 'login/resendOTP',
        method: 'POST',
        body: data,
      }),
    }),
    
    // Category endpoints
    getCategories: builder.query<any, string | null>({
      query: (id) => {
        const endpoint = id ? `api/categories/${id}` : 'api/categories';
        return endpoint;
      },
    }),
    
    // User endpoints
    updateUserDetails: builder.mutation<User, Partial<User>>({
      query: (data) => ({
        url: 'user/update',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    getUserDetails: builder.query<User, string>({
      query: (id) => {
        const endpoint = id ? `api/users/${id}` : 'api/users';
        return endpoint;
      },
      providesTags: ['User'],
    }),
    
    // Product endpoints
    getProducts: builder.query<any, string | null>({
      query: (id) => {
        const endpoint = id ? `api/products/${id}` : 'api/products';
        return endpoint;
      },
    }),
    getProductVariations: builder.query<any, string | null>({
      query: (id) => {
        const endpoint = id ? `api/product-variations${id}` : 'api/product-variations';
        return endpoint;
      },
    }),
    
    // Wishlist endpoints
    addToWishlist: builder.mutation<any, { userId: string, productId: string }>({
      query: ({ userId, productId }) => ({
        url: `api/users/${userId}/addWishlist`,
        method: 'POST',
        body: { productId },
      }),
      invalidatesTags: ['User'],
    }),
    removeWishlist: builder.mutation<any, { userId: string, productId: string }>({
      query: ({ userId, productId }) => ({
        url: `api/users/${userId}/removeWishlist`,
        method: 'POST',
        body: { productId },
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useVerifyUserMutation,
  useUpdateUserDetailsMutation,
  useResendOTPMutation,
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetProductVariationsQuery,
  useLazyGetProductVariationsQuery,
  useGetUserDetailsQuery,
  useAddToWishlistMutation,
  useRemoveWishlistMutation,
} = apiSlice;
