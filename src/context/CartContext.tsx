"use client";

import React, {
  useState,
  useContext,
  createContext,
  useMemo,
  useEffect,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';



type CartItem = {
  salePrice: number;
  realPrice: number;
  quantity: number;
  productId: number;
  name: string;
  images: string[];
  attributes: Record<string, string>;
};

type CartContextType = {
  cart: CartItem[];
  increment: (productId: number) => void;
  decrement: (productId: number) => void;
  addToCart: (item: CartItem, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  productsCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

const CartProvider = ({ children }: { children: ReactNode }) => {
  const getCartKey = () => {
    const userId = state.user?._id || state.user?.id;
    return userId ? `cart_${userId}` : "cart_guest";
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
        console.error("Failed to load cart from AsyncStorage:", error);
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
        console.error("Failed to save cart to AsyncStorage:", error);
      }
    };
    saveCart();
    setProductsCount(cart.length);
  }, [cart, state.user]);


  


  useEffect(() => {
    if (state.user) {
      console.log("After login",state.user)
      mergeGuestCartWithUserCart();
      console.log(cart)
    }
  }, [state.user]);

  const mergeGuestCartWithUserCart = async () => {
    try {
      const guestCartKey = "cart_guest";
      const userCartKey = getCartKey();
      console.log(userCartKey);

      const guestCart = await AsyncStorage.getItem(guestCartKey);
      const userCart = await AsyncStorage.getItem(userCartKey);

      console.log("guestCart", guestCart);
      console.log("userCart", userCart);

      let guestCartItems: CartItem[] = [];
      let userCartItems: CartItem[] = [];

      try {
        guestCartItems = guestCart ? JSON.parse(guestCart) : [];
        userCartItems = userCart ? JSON.parse(userCart) : [];
      } catch (error) {
        console.error("Failed to parse cart data:", error);
      }

      // Merge logic: add guest items not in user cart
      const mergedCart = [...userCartItems];
      guestCartItems.forEach((guestItem) => {
        const exists = mergedCart.some(
          (userItem) => userItem.productId === guestItem.productId
        );
        if (!exists) {
          mergedCart.push(guestItem);
        }
      });

      await AsyncStorage.setItem(userCartKey, JSON.stringify(mergedCart));
      await AsyncStorage.removeItem(guestCartKey);
      setCart(mergedCart);
    } catch (error) {
      console.error("Failed to merge guest cart with user cart:", error);
    }
  };

  const mergeCarts = (
    guestCart: CartItem[],
    userCart: CartItem[]
  ): CartItem[] => {
    const map = new Map<number, CartItem>();

    userCart.forEach((item) => map.set(item.productId, item));
    guestCart.forEach((item) => {
      if (map.has(item.productId)) {
        const existingItem = map.get(item.productId)!;
        existingItem.quantity += item.quantity;
      } else {
        map.set(item.productId, item);
      }
    });

    return Array.from(map.values());
  };

  const increment = (productId: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrement = (productId: number) => {
    const item = cart.find((item) => item.productId === productId);

    if (!item) return;

    if (item.quantity === 1) {
      removeFromCart(productId);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  const addToCart = (newItem: CartItem, quantity: number = 1) => {
    if(!cart) return;
    const existingItem = cart.find(
      (item) => item.productId === newItem.productId
    );

    if (existingItem) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.productId === existingItem.productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...newItem, quantity }]);
    }
    const truncatedProductName = truncateText(newItem.name, 30);
    alert(`${truncatedProductName} added to cart!`);
  };

  const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const removeFromCart = (productId: number) => {
    const productName =
      cart.find((item) => item.productId === productId)?.name || "";
    const truncatedProductName = truncateText(productName, 30);
    setCart((prevCart) =>
      prevCart.filter((item) => item.productId !== productId)
    );
    alert(`${truncatedProductName} removed from cart.`);
  };

  const clearCart = () => {
    setCart([]);
    alert(`Cart cleared successfully!`);
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

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export { useCart, CartProvider };
