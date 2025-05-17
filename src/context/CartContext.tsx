import React, { useState, useContext, createContext, useMemo, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  attributes: Record<string, string>;
};

type CartContextType = {
  cart: CartItem[];
  increment: (id: string) => void;
  decrement: (id: string) => void;
  addToCart: (item: CartItem, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  productsCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

const CartProvider = ({ children }: { children: ReactNode }) => {
  const getCartKey = () => {
    const userId = state.user?._id || state.user?.id;
    return userId ? `cart_${userId}` : 'cart_guest';
  };

  const { state } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [productsCount, setProductsCount] = useState<number>(0);

  // Load cart from AsyncStorage on mount or user change
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartKey = getCartKey();
        const savedCart = await AsyncStorage.getItem(cartKey);
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        } else {
          setCart([]);
        }
      } catch (error) {
        console.error('Failed to load cart from AsyncStorage:', error);
        setCart([]);
      }
    };
    fetchCart();
  }, [state.user]);

  // Save cart to AsyncStorage whenever it changes
  useEffect(() => {
    const saveCart = async () => {
      try {
        const cartKey = getCartKey();
        await AsyncStorage.setItem(cartKey, JSON.stringify(cart));
      } catch (error) {
        console.error('Failed to save cart to AsyncStorage:', error);
      }
    };
    saveCart();
    setProductsCount(cart.length);
  }, [cart, state.user]);

  useEffect(() => {
    if (state.user) {
      console.log('After login', state.user);
      mergeGuestCartWithUserCart();
      console.log(cart);
    }
  }, [state.user]);

  const mergeGuestCartWithUserCart = async () => {
    try {
      const guestCartKey = 'cart_guest';
      const userCartKey = getCartKey();
      console.log(userCartKey);

      const guestCart = await AsyncStorage.getItem(guestCartKey);
      const userCart = await AsyncStorage.getItem(userCartKey);

      console.log('guestCart', guestCart);
      console.log('userCart', userCart);

      let guestCartItems: CartItem[] = [];
      let userCartItems: CartItem[] = [];

      try {
        guestCartItems = guestCart ? JSON.parse(guestCart) : [];
        userCartItems = userCart ? JSON.parse(userCart) : [];
      } catch (error) {
        console.error('Failed to parse cart data:', error);
      }

      // Merge logic: add guest items not in user cart
      const mergedCart = [...userCartItems];
      guestCartItems.forEach((guestItem) => {
        const exists = mergedCart.some((userItem) => userItem.id === guestItem.id);
        if (!exists) {
          mergedCart.push(guestItem);
        }
      });

      await AsyncStorage.setItem(userCartKey, JSON.stringify(mergedCart));
      await AsyncStorage.removeItem(guestCartKey);
      setCart(mergedCart);
    } catch (error) {
      console.error('Failed to merge guest cart with user cart:', error);
    }
  };

  const mergeCarts = (guestCart: CartItem[], userCart: CartItem[]): CartItem[] => {
    const map = new Map<string, CartItem>();

    userCart.forEach((item) => map.set(item.id, item));
    guestCart.forEach((item) => {
      if (map.has(item.id)) {
        const existingItem = map.get(item.id)!;
        existingItem.quantity += item.quantity;
      } else {
        map.set(item.id, item);
      }
    });

    return Array.from(map.values());
  };

  const increment = (id: string) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  const decrement = (id: string) => {
    const item = cart.find((item) => item.id === id);

    if (!item) return;

    if (item.quantity === 1) {
      removeFromCart(id);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
      );
    }
  };

  const addToCart = (newItem: CartItem, quantity: number = 1) => {
    if (!cart) return;
    const existingItem = cart.find((item) => item.id === newItem.id);

    if (existingItem) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === existingItem.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...newItem, quantity }]);
    }
    const truncatedProductName = truncateText(newItem.name, 30);
    Toast.show({
      type: 'success',
      text1: `${truncatedProductName} added to cart!`,
      position: 'bottom',
    });
  };

  const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const removeFromCart = (id: string) => {
    const productName = cart.find((item) => item.id === id)?.name || '';
    const truncatedProductName = truncateText(productName, 30);
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    Toast.show({
      type: 'info',
      text1: `${truncatedProductName} removed from cart.`,
      position: 'bottom',
    });
  };

  const clearCart = () => {
    setCart([]);
    Toast.show({ type: 'info', text1: `Cart cleared successfully!`, position: 'bottom' });
  };

  const contextValue = useMemo(
    () => ({
      cart,
      increment,
      decrement,
      addToCart,
      removeFromCart,
      clearCart,
      productsCount,
    }),
    [cart, productsCount]
  );

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export { useCart, CartProvider };
