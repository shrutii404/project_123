"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { Router } from "lucide-react";
import apiClient from "./apiClient";

interface AuthState {
  user: any;
  loading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: "LOGIN_REQUEST" }
  | { type: "LOGIN_SUCCESS"; user: any }
  | { type: "LOGIN_FAILURE"; error: string }
  | { type: "LOGOUT" }
  | { type: "CLEAR_ERROR" };

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const api = process.env.NEXT_PUBLIC_API_URL;

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return { ...state, user: action.user, loading: false };
    case "LOGIN_FAILURE":
      return { ...state, error: action.error, loading: false };
    case "LOGOUT":
      return { ...state, user: null };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
};

interface AuthContextType {
  state: AuthState;
  login: (phoneNo: string) => Promise<void>;
  resendOTP: (phoneNo: string) => Promise<void>;
  verifyOTP: (phoneNo: string, otp: string) => Promise<void>;
  logout: () => void;
}

interface DecodedToken {
  _id: string;
  name: string;
  phoneNo: string;
  isAdmin: boolean;
  // Add other fields that you expect in your token payload
}

export async function decodeAuthToken(): Promise<DecodedToken | null> {
  const token = Cookies.get("auth_token");

  if (!token) {
    console.error("Cannot find token");
    return null;
  }

  try {
    // Decode token
    const decoded = jwtDecode<DecodedToken>(token);
    console.log("Decoded Token:", decoded);
    return decoded;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();

  // Function to load user data from token if available
  const loadUserData = async () => {
    const decodedToken = await decodeAuthToken();
    if (decodedToken) {
      dispatch({ type: "LOGIN_SUCCESS", user: decodedToken });
    }
  };

  useEffect(() => {
    // Load user data when the provider mounts
    loadUserData();
  }, []);

  const login = async (phoneNo: string) => {
    dispatch({ type: "LOGIN_REQUEST" });
    try {
      await apiClient.post(`${api}/login`, { phoneNo });
      dispatch({ type: "LOGIN_SUCCESS", user: null });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", error: "Failed to send OTP" });
    }
  };

  const verifyOTP = async (phoneNo: string, otp: string) => {
    dispatch({ type: "LOGIN_REQUEST" });
    try {
      const { data } = await apiClient.post(
        `${api}/login/verifyOTP`,
        { phoneNo, otp },
        { withCredentials: true }
      );
      console.log("User logged in:", data);
      dispatch({ type: "LOGIN_SUCCESS", user: data.user });
      const token = data?.token;
      // Store token in cookies with domain and secure attributes
      const isProduction = process.env.NODE_ENV === "production";
      const fiveYearsInMilliseconds = 60 * 60 * 24 * 365 * 5 * 1000;
      Cookies.set("auth_token", token, {
        secure: isProduction,
        expires: new Date(Date.now() + fiveYearsInMilliseconds),
      });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", error: "Invalid OTP" });
    }
  };

  const resendOTP = async (phoneNo: string) => {
    dispatch({ type: "LOGIN_REQUEST" });
    try {
      const { data } = await apiClient.post(`${api}/login/resendOTP`, {
        phoneNo,
      });
      console.log(data);
      dispatch({ type: "LOGIN_SUCCESS", user: null });
    } catch (error) {
      console.log(error);
      dispatch({ type: "LOGIN_FAILURE", error: "Failed to resend OTP" });
    }
  };

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    try {
      await apiClient.get(`${api}/api/logout`);
      router.push("/");
      Cookies.remove("auth_token");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ state, login, verifyOTP, logout, resendOTP }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
