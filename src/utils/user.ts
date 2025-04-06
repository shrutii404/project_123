import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_DETAILS_KEY = 'userDetails';
const AUTH_TOKEN_KEY = 'authToken';

import { UserAddress } from '../types/auth';

export interface UserData {
  token: string;
  user: {
    id: string;
    _id?: string; // Support for both id formats
    phoneNo: string;
    name?: string;
    email?: string;
    address?: UserAddress | UserAddress[];
    FavouriteProd?: string[];
    isAdmin?: boolean;
  };
}

export const setUser = async (data: UserData): Promise<void> => {
  try {
    // Store token separately for easier access
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, data.token);

    // Store complete user data
    const userData = JSON.stringify(data);
    await AsyncStorage.setItem(USER_DETAILS_KEY, userData);
  } catch (error) {
    console.error('Error saving user data:', error);
    throw new Error('Failed to save user data');
  }
};

export const getUser = async (): Promise<UserData | null> => {
  try {
    const userData = await AsyncStorage.getItem(USER_DETAILS_KEY);
    if (!userData) return null;

    const parsedData = JSON.parse(userData);
    
    // Verify token still exists
    const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) {
      await removeUser(); // Clear corrupted state
      return null;
    }

    return parsedData;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

export const getAuthToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

export const removeUser = async (): Promise<void> => {
  try {
    // Remove both user data and token
    await AsyncStorage.multiRemove([USER_DETAILS_KEY, AUTH_TOKEN_KEY]);
  } catch (error) {
    console.error('Error removing user data:', error);
    throw new Error('Failed to remove user data');
  }
};
