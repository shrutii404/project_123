import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://ecommercedev-production.up.railway.app/';

// Define your base query with the token included in headers
const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeader: (headers, {getState}) => {
    const token = getState(); // Updated path to the token

    if (token) {
      headers.set('x-auth-token', token);
    }
    return headers;
  },
});

// Define a service using a base URL and expected endpoints
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
        // Construct the endpoint based on the presence of an ID
        const endpoint = id ? `api/categories/${id}` : 'api/categories';
        return endpoint;
      },
    }),
    getProducts: builder.query({
      query: id => {
        // Construct the endpoint based on the presence of an ID
        const endpoint = id ? `api/products/${id}` : 'api/products';
        return endpoint;
      },
    }),
    getProductVariations: builder.query({
      query: id => {
        // Construct the endpoint based on the presence of an ID
        const endpoint = id
          ? `api/product-variations${id}`
          : 'api/product-variations';
        return endpoint;
      },
    }),
    getUserDetails: builder.query({
      query: id => {
        // Construct the endpoint based on the presence of an ID
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

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
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
