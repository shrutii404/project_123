import React, { createContext, useContext, useEffect, useState } from 'react';
import authService, { AuthUser } from '../services/authService';
import apiService from '../services/apiService';
import { useDispatch } from 'react-redux';
import { userLogin, userLogout } from '../store/slices/userSlice';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phoneNo: string) => Promise<{ success: boolean; error?: string }>;
  verifyOTP: (
    phoneNo: string,
    otp: string
  ) => Promise<{ success: boolean; error?: string; user?: AuthUser }>;
  logout: () => Promise<void>;
  requireAuth: (navigation: any) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const user = await authService.initialize();
      if (user) {
        setUser(user);
        dispatch(userLogin(user)); // Dispatch userLogin action
        // Fetch user details
        if (user && user.id) {
          try {
            const userDetails = await apiService.getUserDetails(user.id);
            if (userDetails.data) {
              dispatch(userLogin(userDetails.data)); // Update user details in store
            }
          } catch (error) {
            console.error('Error fetching user details:', error);
          }
        } else {
          console.error('User or user ID is missing.');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login: async (phoneNo: string) => {
      const result = await authService.login(phoneNo);
      return result;
    },
    verifyOTP: async (phoneNo: string, otp: string) => {
      const result = await authService.verifyOTP(phoneNo, otp);
      if (result.success && result.user) {
        setUser(result.user);
        dispatch(userLogin(result.user)); // Dispatch userLogin action
      }
      return result;
    },
    logout: async () => {
      await authService.logout();
      setUser(null);
      dispatch(userLogout()); // Dispatch userLogout action
    },
    requireAuth: authService.requireAuth.bind(authService),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
