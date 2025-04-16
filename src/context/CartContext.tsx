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
import { toast } from "@/components/ui/use-toast";

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
    if (typeof window !== "undefined") {
      const userId = state.user?._id || state.user?.id;
      console.log("userId",userId)
      return userId ? `cart_${userId}` : "cart_guest";
      
    }
    return "cart_guest";
  };

  const loadCart = () => {
    if (typeof window !== "undefined") {
      const cartKey = getCartKey();
      const savedCart = localStorage.getItem(cartKey);
      if (savedCart) {
        try {
          return JSON.parse(savedCart);
        } catch (error) {
          console.error("Failed to parse cart data:", error);
          return [];
        }
      }
    }
  };
  const { state } = useAuth();
   const [cart, setCart] = useState<CartItem[]>(() => {
      return loadCart() || [];
   });
  const [productsCount, setProductsCount] = useState<number>(cart?.length || 0);

  

  const saveCart = () => {
    if (typeof window !== "undefined") {
      const cartKey = getCartKey();
      localStorage.setItem(cartKey, JSON.stringify(cart));
    }
  };

  

  useEffect(() => {
    saveCart(); // Save cart data to localStorage when cart changes
    setProductsCount(cart?.length);
  }, [cart]);

  useEffect(() => {
    if (state.user) {
      console.log("After login",state.user)
      mergeGuestCartWithUserCart();
      console.log(cart)
    }
  }, [state.user]);

  const mergeGuestCartWithUserCart = () => {
    if (typeof window !== "undefined") {
      const guestCartKey = "cart_guest";
      const userCartKey = getCartKey();
      console.log(userCartKey)

      const guestCart = localStorage.getItem(guestCartKey);
      const userCart = localStorage.getItem(userCartKey);

      console.log("guestCart",guestCart)
      console.log("userCart",userCart)

      let guestCartItems: CartItem[] = [];
      let userCartItems: CartItem[] = [];

      try {
        guestCartItems = guestCart ? JSON.parse(guestCart) : [];
      } catch (error) {
        console.error("Failed to parse guest cart data:", error);
      }

      try {
        userCartItems = userCart ? JSON.parse(userCart) : [];
      } catch (error) {
        console.error("Failed to parse user cart data:", error);
      }

      // Merge carts and update localStorage
      const mergedCart = mergeCarts(guestCartItems, userCartItems);
      localStorage.setItem(userCartKey, JSON.stringify(mergedCart));
      localStorage.removeItem(guestCartKey);

      setCart(mergedCart);
      console.log("Merged cart:", mergedCart); // Add this line
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
    toast({
      description: `${truncatedProductName} added to cart!`,
    });
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
    toast({ description: `${truncatedProductName} removed from cart.` });
  };

  const clearCart = () => {
    setCart([]);
    toast({
      description: `Cart cleared successfully!`,
    });
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
