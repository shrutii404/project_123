import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiEndpoint } from '../../utils/constants';
import apiService from '../../services/apiService';
import refreshToken from './userSlice';
import { userSlice } from './userSlice';
import {
  LoginRequest,
  VerifyOtpRequest,
  LoginResponse,
  ResendOtpRequest,
  User,
  UserAddress,
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
    let newHeaders = headers;
    try {
      const userDetailsString = await AsyncStorage.getItem('userDetails');
      const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
      let token = userDetails?.token;

      if (token) {
        newHeaders.set('Authorization', `Bearer ${token}`);
      }
    } catch (error) {
      console.error('Error setting auth header:', error);
    }
    return newHeaders;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // try to get a new token
    try {
      const refreshResult = await api.dispatch(refreshToken);
      if (refreshResult?.payload?.token) {
        // store the new token
        const userDetailsString = await AsyncStorage.getItem('userDetails');
        const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
        if (userDetails) {
          userDetails.token = refreshResult.payload.token;
          await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));
          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        }
      } else {
        api.dispatch(userSlice.actions.userLogout());
      }
    } catch (refreshError) {
      console.error('Error refreshing token:', refreshError);
      api.dispatch(userSlice.actions.userLogout());
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    refreshToken: builder.mutation<{ token: string }, void>({
      query: () => ({
        url: 'login/refreshToken',
        method: 'POST',
      }),
    }),
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
    addToWishlist: builder.mutation<any, { userId: string; productId: string }>({
      query: ({ userId, productId }) => ({
        url: `api/users/${userId}/addWishlist`,
        method: 'POST',
        body: { productId },
      }),
      invalidatesTags: ['User'],
    }),
    removeWishlist: builder.mutation<any, { userId: string; productId: string }>({
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
