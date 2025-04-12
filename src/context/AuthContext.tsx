import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import authService from '../services/authService';
import { useDispatch } from 'react-redux';
import { userLogin, userLogout } from '../store/slices/userSlice';
import {
  useLoginUserMutation,
  useVerifyUserMutation,
  useLazyGetCurrentUserDetailsQuery,
  apiSlice,
} from '../store/slices/apiSlice';
import { User } from '../types/auth';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (phoneNo: string) => Promise<{ success: boolean; error?: string }>;
  verifyOTP: (phoneNo: string, otp: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // RTK Query Hooks
  const [loginUserMutation] = useLoginUserMutation();
  const [verifyUserMutation] = useVerifyUserMutation();
  const [triggerGetUserDetails] = useLazyGetCurrentUserDetailsQuery();

  const handleError = (error: string) => {
    setAuthState((prev) => ({ ...prev, error }));
  };

  const clearError = useCallback(() => {
    setAuthState((prev) => ({ ...prev, error: null }));
  }, []);

  const handleLogout = useCallback(async () => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));
    try {
      await authService.logout();
      dispatch(userLogout());
      dispatch(apiSlice.util.resetApiState());
      setAuthState({ isAuthenticated: false, isLoading: false, error: null });
    } catch (error) {
      handleError('Failed to logout properly');
      // Still clear auth state even if logout fails
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        error: 'Failed to logout properly',
      });
    }
  }, [dispatch]);

  const login = useCallback(
    async (phoneNo: string) => {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const result = await loginUserMutation({ phoneNo }).unwrap();
        setAuthState((prev) => ({ ...prev, isLoading: false }));
        return { success: true };
      } catch (error: any) {
        const errorMessage = error?.data?.message || 'Failed to send OTP';
        handleError(errorMessage);
        setAuthState((prev) => ({ ...prev, isLoading: false }));
        return { success: false, error: errorMessage };
      }
    },
    [loginUserMutation]
  );

  const verifyOTP = useCallback(
    async (phoneNo: string, otp: string) => {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const result = await verifyUserMutation({ phoneNo, otp }).unwrap();
        if (result?.token) {
          await authService.storeToken(result.token);
          if (result.user) {
            dispatch(userLogin(result.user));
          } else {
            // If user details not in verify response, fetch them
            const userDetails = await triggerGetUserDetails().unwrap();
            if (userDetails) {
              dispatch(userLogin(userDetails));
            }
          }
          setAuthState({ isAuthenticated: true, isLoading: false, error: null });
          return { success: true };
        } else {
          throw new Error('No token received');
        }
      } catch (error: any) {
        const errorMessage = error?.data?.message || 'Failed to verify OTP';
        handleError(errorMessage);
        setAuthState((prev) => ({ ...prev, isLoading: false }));
        return { success: false, error: errorMessage };
      }
    },
    [verifyUserMutation, dispatch, triggerGetUserDetails]
  );

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        const hasToken = await authService.hasToken();
        if (hasToken) {
          const userDetails = await triggerGetUserDetails().unwrap();
          if (userDetails) {
            dispatch(userLogin(userDetails));
            setAuthState({ isAuthenticated: true, isLoading: false, error: null });
          } else {
            // Token exists but no user details - logout
            await handleLogout();
          }
        } else {
          setAuthState({ isAuthenticated: false, isLoading: false, error: null });
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        await handleLogout();
      }
    };

    initAuth();
  }, [dispatch, handleLogout, triggerGetUserDetails]);

  const value: AuthContextType = {
    ...authState,
    login,
    verifyOTP,
    logout: handleLogout,
    clearError,
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
