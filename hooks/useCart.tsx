"use client";

import { createContext, useContext, useState, useEffect } from "react";

type CartContextType = {
  cartCount: number;
  setCartCount: (count: number) => void;
  incrementCart: () => void;
  decrementCart: () => void;
  syncCart: (actualCount: number) => void;
};

const API_URL = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8080";

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_COUNT_KEY = "cart_count";

export function CartProvider({
  children,
  initialCount,
  isAuthenticated,
}: {
  children: React.ReactNode;
  initialCount: number;
  isAuthenticated: boolean;
}) {
  const [cartCount, setCartCountState] = useState(initialCount);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CART_COUNT_KEY);
    if (stored !== null) {
      setCartCountState(parseInt(stored, 10));
    }
    setIsHydrated(true);
  }, []);

  const setCartCount = (count: number) => {
    setCartCountState(count);
    localStorage.setItem(CART_COUNT_KEY, count.toString());
  };

  const incrementCart = () => {
    setCartCount(cartCount + 1);
  };

  const decrementCart = () => {
    setCartCount(Math.max(0, cartCount - 1));
  };

  // Sync with server data
  const syncCart = (actualCount: number) => {
    setCartCount(actualCount);
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchAndSyncCart = async () => {
      try {
        const response = await fetch(`${API_URL}/api/cart`, {
          credentials: "include",
        });
        if (!response.ok) return;

        const cart = await response.json();
        const actualCount = cart?.items?.length || 0;

        if (actualCount !== cartCount) {
          syncCart(actualCount);
        }
      } catch (error) {
        console.error("Failed to sync cart:", error);
      }
    };

    const syncInterval = setInterval(fetchAndSyncCart, 5 * 60 * 100);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchAndSyncCart();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      clearInterval(syncInterval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [cartCount]);

  return (
    <CartContext.Provider
      value={{
        cartCount,
        setCartCount,
        incrementCart,
        decrementCart,
        syncCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
