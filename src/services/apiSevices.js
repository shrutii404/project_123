import axios from 'axios';
import store from '../store'; // Adjust this import path to match your project structure
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'https://ecommercedev-production.up.railway.app/';

const api = axios.create({
  baseURL,
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor
api.interceptors.request.use(
  async config => {
    try {
      // Retrieve user details from AsyncStorage
      const userDetailsString = await AsyncStorage.getItem('userDetails');

      // Parse the retrieved string to an object
      const userDetails = userDetailsString
        ? JSON.parse(userDetailsString)
        : null;

      // Extract the token
      const token = userDetails ? userDetails.token : null;

      // If token exists, attach it to the headers
      if (token) {
        config.headers['x-auth-token'] = token;
      }
    } catch (error) {
      console.error('Error fetching token from AsyncStorage:', error);
      // Optionally, you can handle the error by redirecting the user or other means
    }

    return config;
  },
  error => Promise.reject(error),
);

const apiService = {
  loginUser: data => api.post('login', data),

  verifyUser: data => api.post('login/verifyOTP', data),

  resendOTP: data => api.post('login/resendOTP', data),

  getCategories: (id = null) => {
    const endpoint = id ? `api/categories/${id}` : 'api/categories';
    return api.get(endpoint);
  },

  getProducts: (id = null) => {
    const endpoint = id ? `api/products/${id}` : 'api/products';
    return api.get(endpoint);
  },

  getProductVariations: (id = null) => {
    const endpoint = id
      ? `api/product-variations/${id}`
      : 'api/product-variations';
    return api.get(endpoint);
  },

  getUserDetails: (id = null) => {
    const endpoint = id ? `api/users/${id}` : 'api/users';
    return api.get(endpoint);
  },

  updateUserDetails: (id, data) => {
    return api.put(`api/users/${id}`, data);
  },

  addToWishlist: (userId, data) => {
    return api.post(`api/users/${userId}/addWishlist`, data);
  },

  removeWishlist: (userId, data) => {
    return api.post(`api/users/${userId}/removeWishlist`, data);
  },

  addAddress: data => {
    return api.post(`api/address`, data);
  },
  updateAddress: (id, data) => {
    return api.put(`api/address/${id}`, data);
  },
  removeAddress: id => {
    return api.delete(`api/address/${id}`);
  },
  getDistance: data => {
    return api.post(`/api/getDistance/isAvailable`, data);
  },
  phonepePayment: data => {
    return api.post(`/api/phonePay/order`, data);
  },
  getOrders: userId => {
    return api.get(`/api/orderView/${userId}`);
  },
};

export default apiService;
