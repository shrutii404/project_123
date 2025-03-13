import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiEndpoint} from '../../utils/constants';

const baseUrl = apiEndpoint;

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeader: (headers, {getState}) => {
    const token = getState();

    if (token) {
      headers.set('x-auth-token', token);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  endpoints: builder => ({
    loginUser: builder.mutation({
      query: data => ({
        url: 'login',
        method: 'POST',
        body: data,
      }),
    }),
    verifyUser: builder.mutation({
      query: data => ({
        url: 'login/verifyOTP',
        method: 'POST',
        body: data,
      }),
    }),
    resendOTP: builder.mutation({
      query: data => ({
        url: 'login/resendOTP',
        method: 'POST',
        body: data,
      }),
    }),
    getCategories: builder.query({
      query: id => {
        const endpoint = id ? `api/categories/${id}` : 'api/categories';
        return endpoint;
      },
    }),
    getProducts: builder.query({
      query: id => {
        const endpoint = id ? `api/products/${id}` : 'api/products';
        return endpoint;
      },
    }),
    getProductVariations: builder.query({
      query: id => {
        const endpoint = id
          ? `api/product-variations${id}`
          : 'api/product-variations';
        return endpoint;
      },
    }),
    getUserDetails: builder.query({
      query: id => {
        const endpoint = id ? `api/users/${id}` : 'api/users';
        return endpoint;
      },
    }),
    addToWishlist: builder.mutation({
      query: (accessToken, userId, data) => ({
        url: `api/users/${userId}/addWishlist`,
        method: 'POST',
        body: data,
        headers: {
          'x-auth-token': accessToken,
        },
      }),
    }),
    removeWishlist: builder.mutation({
      query: (userId, data) => ({
        url: `api/users/${userId}/removeWishlist`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useVerifyUserMutation,
  useResendOTPMutation,
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetProductVariationsQuery,
  useLazyGetProductVariationsQuery,
  useGetUserDetailsQuery,
  useAddToWishlistMutation,
  useRemoveWishlistMutation,
} = apiSlice;
