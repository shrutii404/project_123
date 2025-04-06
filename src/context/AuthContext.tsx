import React, { createContext, useContext, useEffect, useState } from 'react';
import authService, { AuthUser } from '../services/authService';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phoneNo: string) => Promise<{ success: boolean; error?: string }>;
  verifyOTP: (phoneNo: string, otp: string) => Promise<{ success: boolean; error?: string; user?: AuthUser }>;
  logout: () => Promise<void>;
  requireAuth: (navigation: any) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      await authService.initialize();
      setUser(authService.getCurrentUser());
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
      }
      return result;
    },
    logout: async () => {
      await authService.logout();
      setUser(null);
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
