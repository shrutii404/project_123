'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import apiClient from './apiClient';
import { apiEndpoint } from '../utils/constants';

interface AuthState {
  user: any;
  loading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'LOGIN_REQUEST' }
  | { type: 'LOGIN_SUCCESS'; user: any }
  | { type: 'LOGIN_FAILURE'; error: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' };

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const api = apiEndpoint.slice(0, -4);
const AUTH_TOKEN_KEY = 'auth_token';

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.user, loading: false };
    case 'LOGIN_FAILURE':
      return { ...state, error: action.error, loading: false };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

interface AuthContextType {
  state: AuthState;
  login: (phoneNo: string) => Promise<{ success: boolean; error?: string }>;
  resendOTP: (phoneNo: string) => Promise<{ success: boolean; error?: string }>;
  verifyOTP: (phoneNo: string, otp: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<{ success: boolean; error?: string }>;
}

interface DecodedToken {
  _id: string;
  name: string;
  phoneNo: string;
  isAdmin: boolean;
}

export async function decodeAuthToken(): Promise<DecodedToken | null> {
  try {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) {
      console.error('Cannot find token');
      return null;
    }

    const decoded = jwtDecode<DecodedToken>(token);
    console.log('Decoded Token:', decoded);
    return decoded;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const loadUserData = async () => {
    const decodedToken = await decodeAuthToken();
    if (decodedToken) {
      dispatch({ type: 'LOGIN_SUCCESS', user: decodedToken });
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const login = async (phoneNo: string) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
      await apiClient.post(`${api}/login`, { phoneNo });
      dispatch({ type: 'LOGIN_SUCCESS', user: null });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', error: 'Failed to send OTP' });
      return { success: false, error: 'Failed to send OTP' };
    }
  };

  const verifyOTP = async (phoneNo: string, otp: string) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
      const { data } = await apiClient.post(`${api}/login/verifyOTP`, { phoneNo, otp });
      console.log('User logged in:', data);
      dispatch({ type: 'LOGIN_SUCCESS', user: data.user });
      const token = data?.token;
      if (token) {
        await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
      }
      return { success: true };
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', error: 'Invalid OTP' });
      return { success: false, error: 'Invalid OTP' };
    }
  };

  const resendOTP = async (phoneNo: string) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
      const { data } = await apiClient.post(`${api}/login/resendOTP`, {
        phoneNo,
      });
      console.log(data);
      dispatch({ type: 'LOGIN_SUCCESS', user: null });
      return { success: true };
    } catch (error) {
      console.log(error);
      dispatch({ type: 'LOGIN_FAILURE', error: 'Failed to resend OTP' });
      return { success: false, error: 'Failed to resend OTP' };
    }
  };

  const logout = async () => {
    dispatch({ type: 'LOGOUT' });
    try {
      await apiClient.get(`${api}/api/logout`);
      await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false, error: 'Failed to logout' };
    }
  };

  return (
    <AuthContext.Provider value={{ state, login, verifyOTP, logout, resendOTP }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
