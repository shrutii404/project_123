import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_TOKEN_KEY } from '../utils/constants';

class AuthService {
  private static instance: AuthService;
  private tokenPromise: Promise<string | null> | null = null;

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  /**
   * Gets the current authentication token, with caching to prevent multiple AsyncStorage reads
   */
  async getToken(): Promise<string | null> {
    if (!this.tokenPromise) {
      this.tokenPromise = AsyncStorage.getItem(AUTH_TOKEN_KEY);
    }
    return this.tokenPromise;
  }

  /**
   * Checks if a valid authentication token exists
   */
  async hasToken(): Promise<boolean> {
    try {
      const token = await this.getToken();
      return !!token;
    } catch (error) {
      console.error('Error checking auth token:', error);
      return false;
    }
  }

  /**
   * Stores the authentication token
   */
  async storeToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
      this.tokenPromise = Promise.resolve(token);
    } catch (error) {
      console.error('Error storing auth token:', error);
      throw new Error('Failed to store authentication token');
    }
  }

  /**
   * Removes the authentication token and clears the cache
   */
  async logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
      this.tokenPromise = null;
    } catch (error) {
      console.error('Error during logout:', error);
      throw new Error('Failed to complete logout');
    }
  }
}

export default AuthService.getInstance();
