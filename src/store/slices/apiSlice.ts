import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiEndpoint, AUTH_TOKEN_KEY } from '../../utils/constants';
import { userSlice } from './userSlice';
import {
  LoginRequest,
  VerifyOtpRequest,
  LoginResponse,
  ResendOtpRequest,
  User,
  UserAddress,
} from '../../types/auth';

// Create a custom base query with auth token handling
const baseQuery = fetchBaseQuery({
  baseUrl: apiEndpoint,
  prepareHeaders: async (headers) => {
    try {
      const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    } catch (error) {
      console.error('Error reading auth token:', error);
    }
    return headers;
  },
});

// Create a wrapper for baseQuery to handle auth errors
const baseQueryWithAuthHandling = async (args: any, api: any, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    // Token is invalid or expired
    try {
      await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
      // Dispatch logout action to clear user state
      api.dispatch(userSlice.actions.userLogout());
    } catch (error) {
      console.error('Error handling auth error:', error);
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithAuthHandling,
  tagTypes: ['User', 'Product', 'Cart', 'Order', 'Wishlist', 'Category', 'Review'],
  endpoints: (builder) => ({
    // Removed refreshToken endpoint for now
    // --- Authentication endpoints ---
    loginUser: builder.mutation<{ message: string }, LoginRequest>({
      query: (data) => ({
        url: 'login',
        method: 'POST',
        body: data,
      }),
    }), // Close loginUser mutation here
    verifyUser: builder.mutation<LoginResponse, VerifyOtpRequest>({
      // Re-add verifyUser
      query: (data) => ({
        url: 'login/verifyOTP',
        method: 'POST',
        body: data,
      }),
      // Consider invalidating ['User'] if verifyOTP returns full user profile.
    }),
    resendOTP: builder.mutation<{ message: string }, ResendOtpRequest>({
      // Re-add resendOTP
      query: (data) => ({
        url: 'login/resendOTP',
        //     method: 'POST',
        method: 'POST',
        body: data,
      }),
    }),
    // verifyToken: builder.mutation<any, { token: string }>({ // From apiService - needed?
    //   query: (data) => ({
    //     url: 'verifyToken',
    //     method: 'POST',
    //     body: data,
    //   }),
    // }),

    // --- User endpoints ---
    getCurrentUserDetails: builder.query<User, void>({
      // Keep this
      // New endpoint for fetching logged-in user
      query: () => 'api/users/me', // Assuming this endpoint exists
      providesTags: ['User'],
    }),
    getUserDetailsById: builder.query<User, string>({
      // Renamed for clarity
      query: (id: string) => `api/users/${id}`, // Kept original logic if needed elsewhere
      providesTags: (result: User | undefined, error: any, id: string) => [{ type: 'User', id }],
    }),
    updateUserDetails: builder.mutation<User, Partial<User> & { id: string }>({
      // Ensure ID is passed if needed by API
      query: ({ id, ...data }) => ({
        url: `api/users/${id}`, // Use ID in URL
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'User', id: 'me' },
        { type: 'User', id },
      ], // Invalidate general 'me' and specific ID
    }),

    // --- Product endpoints ---
    getProducts: builder.query<any, string | void>({
      // Define 'any' for now, replace with specific Product type later
      // Allow void for fetching all
      query: (id?: string) => (id ? `api/products/${id}` : 'api/products'),
      providesTags: (
        result: any[] | undefined,
        error: any,
        id: string | void // Correct id type
      ) => (id ? [{ type: 'Product', id }, 'Product'] : ['Product']), // Tag list and specific item
    }),
    searchProducts: builder.query<any, string>({
      // Define 'any' for now
      query: (query: string) => `search?q=${encodeURIComponent(query)}`,
      providesTags: ['Product'], // Search results potentially invalidate the Product list
    }),

    // --- Category endpoints ---
    getCategories: builder.query<any, string | void>({
      // Define 'any' for now
      // Allow void for fetching all
      query: (id?: string) => (id ? `api/categories/${id}` : 'api/categories'),
      providesTags: (
        result: any[] | undefined,
        error: any,
        id: string | void // Correct id type
      ) => (id ? [{ type: 'Category', id }, 'Category'] : ['Category']), // Tag list and specific item
    }),

    // --- Product Variation endpoints ---
    getProductVariations: builder.query<any, string | void>({
      // Define 'any' for now
      // Allow void for fetching all
      query: (id?: string) => (id ? `api/product-variations/${id}` : 'api/product-variations'),
      providesTags: (
        result: any[] | undefined,
        error: any,
        id: string | void // Correct id type
      ) => (id ? [{ type: 'Product', id: `variation-${id}` }, 'Product'] : ['Product']), // Tag variations specifically? And Product list?
    }),

    // --- Cart endpoints ---
    // TODO: Define specific types for Cart items/responses instead of 'any'
    getCart: builder.query<any, void>({
      query: () => 'api/cart', // Assuming endpoint returns the whole cart
      providesTags: ['Cart'],
    }),
    addToCart: builder.mutation<any, { productId: string; quantity: number }>({
      query: (data) => ({
        url: 'api/cart',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Cart'],
    }),
    updateCartItem: builder.mutation<any, { itemId: string; quantity: number }>({
      query: ({ itemId, quantity }) => ({
        url: `api/cart/${itemId}`,
        method: 'PUT',
        body: { quantity },
      }),
      invalidatesTags: ['Cart'],
    }),
    removeFromCart: builder.mutation<any, string>({
      // Pass itemId directly
      query: (itemId) => ({
        url: `api/cart/${itemId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),

    // --- Order endpoints ---
    // TODO: Define specific types for Order items/responses instead of 'any'
    createOrder: builder.mutation<any, any>({
      // TODO: Define specific type for order data argument
      query: (data: any) => ({
        url: 'api/orders',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Order', 'Cart'], // Creating order might clear cart
    }),
    getOrderDetails: builder.query<any, string>({
      query: (orderId: string) => `/api/orders/${orderId}`,
      providesTags: (result: any | undefined, error: any, orderId: string) => [
        { type: 'Order', id: orderId },
      ],
    }),
    getUserOrders: builder.query<any, string>({
      // Assuming response is an array of orders
      // Renamed from getOrders for clarity
      query: (userId: string) => `/api/orderView/${userId}`, // Assuming this fetches orders for a user
      providesTags: ['Order'], // Provides the list of orders
    }),

    // --- Payment endpoints ---
    // TODO: Define specific types instead of 'any'
    phonepePayment: builder.mutation<any, { orderId: string; amount: number }>({
      query: (data: { orderId: string; amount: number }) => ({
        url: '/api/payment/phonepay',
        method: 'POST',
        body: data,
      }),
      // Invalidate Order tag?
    }),

    // --- Distance endpoint ---
    // TODO: Define specific types instead of 'any'
    getDistanceAvailability: builder.mutation<
      any,
      { sourcePincode: number; destinationPincode: number }
    >({
      query: (data: { sourcePincode: number; destinationPincode: number }) => ({
        url: '/api/getDistance/isAvailable',
        method: 'POST',
        body: data,
      }),
    }),

    // --- Wishlist endpoints ---
    // TODO: Define specific types instead of 'any'
    getWishlist: builder.query<any, string>({
      // Assuming userId is needed and returns array of wishlist items
      query: (userId: string) => `/api/users/${userId}/wishlist`,
      providesTags: ['Wishlist', 'User'], // Wishlist is part of user data
    }),
    addToWishlist: builder.mutation<any, { userId: string; variationId: string }>({
      // variationId based on apiService
      query: ({ userId, variationId }: { userId: string; variationId: string }) => ({
        url: `/api/users/${userId}/wishlist`,
        method: 'POST',
        body: { variationId },
      }),
      invalidatesTags: ['Wishlist', 'User'],
    }),
    removeFromWishlist: builder.mutation<any, { userId: string; variationId: string }>({
      // variationId based on apiService
      query: ({ userId, variationId }: { userId: string; variationId: string }) => ({
        url: `/api/users/${userId}/wishlist/${variationId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Wishlist', 'User'],
    }),

    // --- Review endpoints ---
    // TODO: Define specific types instead of 'any'
    getReviews: builder.query<any, string>({
      // Assuming returns array of reviews
      // productId
      query: (productId: string) => `/api/reviews/${productId}`,
      providesTags: (result: any[] | undefined, error: any, productId: string) => [
        { type: 'Review', id: productId },
      ],
    }),
    createReview: builder.mutation<any, { productId: string; rating: number; comment: string }>({
      query: (data: { productId: string; rating: number; comment: string }) => ({
        url: '/api/reviews',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (
        result: any | undefined,
        error: any,
        { productId }: { productId: string }
      ) => [{ type: 'Review', id: productId }],
    }),
    // Removed duplicated block below
    // verifyToken: builder.mutation<any, { token: string }>({ // From apiService - needed?
    //   query: (data: { token: string }) => ({
    //     url: 'verifyToken',
    //     method: 'POST',
    //     body: data,
    //   }),
    // }), // Removed extra closing parenthesis here
  }), // Close endpoints definition
}); // Close createApi call

export const {
  useLoginUserMutation,
  useVerifyUserMutation,
  useUpdateUserDetailsMutation,
  useResendOTPMutation,
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetProductVariationsQuery,
  useLazyGetProductVariationsQuery,
  useAddToWishlistMutation,
  useGetCurrentUserDetailsQuery,
  useLazyGetCurrentUserDetailsQuery,
  useGetUserDetailsByIdQuery,
  useLazyGetUserDetailsByIdQuery,
  useSearchProductsQuery,
  useLazySearchProductsQuery,
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  useGetUserOrdersQuery,
  usePhonepePaymentMutation,
  useGetDistanceAvailabilityMutation,
  useGetWishlistQuery,
  useRemoveFromWishlistMutation, // Both names are exported to maintain compatibility
  useGetReviewsQuery,
  useCreateReviewMutation,
} = apiSlice;

// Add alias for backward compatibility
export const useRemoveWishlistMutation = useRemoveFromWishlistMutation;
export const useGetUserDetailsQuery = useGetUserDetailsByIdQuery;
