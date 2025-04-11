import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import apiService from './apiService';
import { removeUser } from '../utils/user';

const AUTH_TOKEN_KEY = 'authToken';
const USER_DETAILS_KEY = 'userDetails';

export interface AuthUser {
  id: string;
  name: string;
  phoneNo: string;
  email?: string;
  token: string;
}

class AuthService {
  private static instance: AuthService;
  private currentUser: AuthUser | null = null;

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async initialize(): Promise<void> {
    try {
      const [userDetailsStr, token] = await Promise.all([
        AsyncStorage.getItem(USER_DETAILS_KEY),
        AsyncStorage.getItem(AUTH_TOKEN_KEY),
      ]);

      if (userDetailsStr && token) {
        const userDetails = JSON.parse(userDetailsStr);
        this.currentUser = { ...userDetails, token };
        apiService.setAuthToken(token);
      }
    } catch (error) {
      console.error('Error initializing auth service:', error);
    }
  }

  async login(phoneNo: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await apiService.loginUser({ phoneNo });
      if (response.data) {
        return { success: true };
      }
      return { success: false, error: 'Login failed' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An error occurred during login' };
    }
  }

  async verifyOTP(
    phoneNo: string,
    otp: string
  ): Promise<{ success: boolean; error?: string; user?: AuthUser }> {
    try {
      const response = await apiService.verifyUser({ phoneNo, otp });
      if (response.data) {
        const { token, user } = response.data;
        const authUser: AuthUser = {
          id: user.id,
          name: user.name,
          phoneNo: user.phoneNo,
          email: user.email,
          token,
        };

        await this.setAuthData(authUser);
        return { success: true, user: authUser };
      }
      return { success: false, error: 'Verification failed' };
    } catch (error) {
      console.error('OTP verification error:', error);
      return { success: false, error: 'An error occurred during verification' };
    }
  }

  async logout(): Promise<void> {
    try {
      await Promise.all([
        AsyncStorage.removeItem(AUTH_TOKEN_KEY),
        AsyncStorage.removeItem(USER_DETAILS_KEY),
      ]);
      this.currentUser = null;
      apiService.clearAuthToken();
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  private async setAuthData(user: AuthUser): Promise<void> {
    try {
      await Promise.all([
        AsyncStorage.setItem(AUTH_TOKEN_KEY, user.token),
        AsyncStorage.setItem(USER_DETAILS_KEY, JSON.stringify(user)),
      ]);
      this.currentUser = user;
      apiService.setAuthToken(user.token);
    } catch (error) {
      console.error('Error saving auth data:', error);
      throw error;
    }
  }

  getCurrentUser(): AuthUser | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  async requireAuth(navigation: any): Promise<boolean> {
    if (!this.isAuthenticated()) {
      Alert.alert(
        'Login Required',
        'Please log in to continue',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Login', onPress: () => navigation.navigate('Login') },
        ],
        { cancelable: true }
      );
      return false;
    }
    return true;
  }
}

export default AuthService.getInstance();
