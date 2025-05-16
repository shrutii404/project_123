// client/src/WishlistContext.tsx
import React, { createContext, ReactNode, useContext, useEffect, useReducer } from 'react';
import apiClient from './apiClient';
import { apiEndpoint } from '../utils/constants';
import { useAuth } from './AuthContext';

const route = `${apiEndpoint}/wishlist`;

type WishListItem = {
  id: string;
  userId: string;
  productVariationId: string;
};

type WishListState = {
  wishlist: WishListItem[];
  loading: boolean;
  error: string | null;
  message: string | null;
};

type WishListAction =
  | { type: 'FETCH_ALL_WISHLIST_ITEMS_REQUEST' }
  | { type: 'FETCH_ALL_WISHLIST_ITEMS_SUCCESS'; payload: WishListItem[] }
  | { type: 'FETCH_ALL_WISHLIST_ITEMS_FAILURE'; payload: string }
  | { type: 'FETCH_SINGLE_WISHLIST_ITEM_SUCCESS'; payload: WishListItem }
  | { type: 'ADD_TO_WISHLIST_SUCCESS'; payload: WishListItem }
  | { type: 'DELETE_FROM_WISHLIST_SUCCESS'; payload: string }
  | { type: 'UPDATE_WISHLIST_ITEM_SUCCESS'; payload: WishListItem };

const initialState: WishListState = {
  wishlist: [],
  loading: false,
  error: null,
  message: null,
};

const WishlistContext = createContext<{
  state: WishListState;
  dispatch: React.Dispatch<WishListAction>;
}>({ state: initialState, dispatch: () => null });

const reducer = (state: WishListState, action: WishListAction): WishListState => {
  switch (action.type) {
    case 'FETCH_ALL_WISHLIST_ITEMS_REQUEST':
      return { ...state, loading: true, error: null, message: null };
    case 'FETCH_ALL_WISHLIST_ITEMS_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        wishlist: action.payload,
        message: null,
      };
    case 'FETCH_ALL_WISHLIST_ITEMS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'FETCH_SINGLE_WISHLIST_ITEM_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        message: null,
      };
    case 'ADD_TO_WISHLIST_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        wishlist: [...state.wishlist, action.payload],
        message: 'Item Added to Wishlist Successfully',
      };
    case 'DELETE_FROM_WISHLIST_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        wishlist: state.wishlist.filter((item) => item.id !== action.payload),
        message: 'Item Deleted from Wishlist Successfully',
      };
    case 'UPDATE_WISHLIST_ITEM_SUCCESS':
      const updatedIndex = state.wishlist.findIndex((item) => item.id === action.payload.id);
      if (updatedIndex !== -1) {
        const updatedWishlist = [...state.wishlist];
        updatedWishlist[updatedIndex] = action.payload;
        return {
          ...state,
          loading: false,
          error: null,
          wishlist: updatedWishlist,
          message: 'Wishlist item updated Successfully',
        };
      }
      return state;
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { state: authState } = useAuth();
  const userId = authState.user?._id || authState.user?.id;

  useEffect(() => {
    if (!userId) return;
    const fetchWishlist = async () => {
      dispatch({ type: 'FETCH_ALL_WISHLIST_ITEMS_REQUEST' });
      try {
        const resp = await apiClient.get<{ FavouriteProd: string[] }>(
          `${apiEndpoint}/users/${userId}`
        );
        const items: WishListItem[] = resp.data.FavouriteProd.map((id) => ({ id, userId, productVariationId: id }));
        dispatch({ type: 'FETCH_ALL_WISHLIST_ITEMS_SUCCESS', payload: items });
      } catch (error: any) {
        dispatch({ type: 'FETCH_ALL_WISHLIST_ITEMS_FAILURE', payload: error.message });
      }
    };
    fetchWishlist();
  }, [userId]);

  const getSingleWishlistItem = async (id: string) => {
    try {
      const response = await apiClient.get<WishListItem>(`${route}/${id}`);
      dispatch({
        type: 'FETCH_SINGLE_WISHLIST_ITEM_SUCCESS',
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: 'FETCH_ALL_WISHLIST_ITEMS_FAILURE',
        payload: error.message || 'Failed to fetch wishlist item',
      });
    }
  };

  const addToWishlist = async (_userId: string, productVariationId: string) => {
    if (!userId) return;
    try {
      await apiClient.post(`${apiEndpoint}/users/${userId}/addWishlist`, { variationId: productVariationId });
      dispatch({
        type: 'ADD_TO_WISHLIST_SUCCESS',
        payload: { id: productVariationId, userId, productVariationId },
      });
    } catch (error: any) {
      dispatch({ type: 'FETCH_ALL_WISHLIST_ITEMS_FAILURE', payload: error.message });
    }
  };

  const removeFromWishlist = async (_id: string) => {
    if (!userId) return;
    try {
      await apiClient.post(`${apiEndpoint}/users/${userId}/removeWishlist`, { variationId: _id });
      dispatch({ type: 'DELETE_FROM_WISHLIST_SUCCESS', payload: _id });
    } catch (error: any) {
      dispatch({ type: 'FETCH_ALL_WISHLIST_ITEMS_FAILURE', payload: error.message });
    }
  };

  const updateWishlistItem = async (id: string, userId: string, productVariationId: string) => {
    try {
      const response = await apiClient.put<WishListItem>(`${route}/${id}`, {
        userId,
        productVariationId,
      });
      dispatch({
        type: 'UPDATE_WISHLIST_ITEM_SUCCESS',
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: 'FETCH_ALL_WISHLIST_ITEMS_FAILURE',
        payload: error.message || 'Failed to update wishlist item',
      });
    }
  };

  const contextValue = {
    state,
    dispatch,
    getSingleWishlistItem,
    addToWishlist,
    removeFromWishlist,
    updateWishlistItem,
  };

  return <WishlistContext.Provider value={contextValue}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
