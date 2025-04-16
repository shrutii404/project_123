// apiClient.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiEndpoint } from '../utils/constants';

// Base URL for the API
const BASE_URL = apiEndpoint;

// Create an axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
});

// Axios request interceptor to attach the token to every request
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      if (token) {
        config.headers['x-auth-token'] = token;
      }
    } catch (error) {
      console.error('Error reading token from AsyncStorage:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
