import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiEndpoint } from '../utils/constants';

class ApiService {
  private static instance: ApiService;
  private api: AxiosInstance;

  private constructor() {
    this.api = axios.create({
      baseURL: apiEndpoint,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.api.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        try {
          const userDetailsString = await AsyncStorage.getItem('userDetails');
          const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
          const token = userDetails?.token;

          if (token && config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
          }
        } catch (error) {
          console.error('Error fetching token from AsyncStorage:', error);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          await AsyncStorage.removeItem('userDetails');
          console.log('Unauthorized request');
        }
        return Promise.reject(error);
      }
    );
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  setAuthToken(token: string): void {
    if (this.api.defaults.headers.common) {
      this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }

  clearAuthToken(): void {
    if (this.api.defaults.headers.common) {
      delete this.api.defaults.headers.common['Authorization'];
    }
  }

  // Auth endpoints
  loginUser(data: { phoneNo: string }): Promise<AxiosResponse> {
    return this.api.post('login', data);
  }

  verifyUser(data: { phoneNo: string; otp: string }): Promise<AxiosResponse> {
    return this.api.post('login/verifyOTP', data);
  }

  resendOTP(data: { phoneNo: string }): Promise<AxiosResponse> {
    return this.api.post('login/resendOTP', data);
  }

  // User endpoints
  getUserDetails(userId?: string): Promise<AxiosResponse> {
    const endpoint = userId ? `api/users/${userId}` : 'api/users';
    return this.api.get(endpoint);
  }

  updateUserDetails(userId: string, data: Record<string, unknown>): Promise<AxiosResponse> {
    return this.api.put(`api/users/${userId}`, data);
  }

  // Product endpoints
  getProducts(id?: string): Promise<AxiosResponse> {
    const endpoint = id ? `api/products/${id}` : 'api/products';
    return this.api.get(endpoint);
  }

  getCategories(id?: string): Promise<AxiosResponse> {
    const endpoint = id ? `api/categories/${id}` : 'api/categories';
    return this.api.get(endpoint);
  }

  getProductVariations(id?: string): Promise<AxiosResponse> {
    const endpoint = id ? `api/product-variations/${id}` : 'api/product-variations';
    return this.api.get(endpoint);
  }

  // Cart endpoints
  addToCart(data: { productId: string; quantity: number }): Promise<AxiosResponse> {
    return this.api.post('api/cart', data);
  }

  updateCartItem(itemId: string, quantity: number): Promise<AxiosResponse> {
    return this.api.put(`api/cart/${itemId}`, { quantity });
  }

  removeFromCart(itemId: string): Promise<AxiosResponse> {
    return this.api.delete(`api/cart/${itemId}`);
  }

  // Order endpoints
  createOrder(data: any): Promise<AxiosResponse> {
    return this.api.post('api/orders', data);
  }


  getOrderDetails(orderId: string): Promise<AxiosResponse> {
    return this.api.get(`/api/orders/${orderId}`);
  }

  // Distance endpoints
  getDistance(data: { lat: number; lng: number }): Promise<AxiosResponse> {
    return this.api.post('/api/getDistance/isAvailable', data);
  }

  // Payment endpoints
  phonepePayment(data: { orderId: string; amount: number }): Promise<AxiosResponse> {
    return this.api.post('/api/payment/phonepay', data);
  }

  // Wishlist endpoints
  addToWishlist(userId: string, data: { variationId: string }): Promise<AxiosResponse> {
    return this.api.post(`/api/users/${userId}/wishlist`, data);
  }

  removeFromWishlist(userId: string, variationId: string): Promise<AxiosResponse> {
    return this.api.delete(`/api/users/${userId}/wishlist/${variationId}`);
  }

  getWishlist(userId: string): Promise<AxiosResponse> {
    return this.api.get(`/api/users/${userId}/wishlist`);
  }

  getOrders(userId: string): Promise<AxiosResponse> {
    return this.api.get(`/api/orderView/${userId}`);
  }
}

export default ApiService.getInstance();
