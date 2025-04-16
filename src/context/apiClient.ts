// apiClient.ts
import axios from 'axios';
import Cookies from 'js-cookie';
import { apiEndpoint } from '../utils/constants';

// Base URL for the API
const BASE_URL = apiEndpoint;

// Create an axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
});

// Axios request interceptor to attach the token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('auth_token');
    if (token) {
      console.log(token);
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
