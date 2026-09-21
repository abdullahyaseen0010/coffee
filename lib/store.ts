"use client";

import { createContext, createElement, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  selectedWeight: number;
  selectedGrind: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isHydrated: boolean;
  addItem: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartState | null>(null);

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const saved = window.localStorage.getItem("velvet-roast-cart");
        if (!saved) {
          setItems([]);
          setIsHydrated(true);
          return;
        }

        const parsed = JSON.parse(saved) as CartItem[];
        setItems(Array.isArray(parsed) ? parsed : []);
      } catch {
        setItems([]);
      } finally {
        setIsHydrated(true);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    try {
      window.localStorage.setItem("velvet-roast-cart", JSON.stringify(items));
    } catch {
      // Ignore storage write errors and keep the cart in memory.
    }
  }, [isHydrated, items]);

  const value = useMemo<CartState>(() => {
    const addItem = (item: CartItem) => {
      setItems((current) => {
        const existing = current.find((entry) => entry.id === item.id);
        if (existing) {
          return current.map((entry) => (entry.id === item.id ? { ...entry, quantity: entry.quantity + item.quantity } : entry));
        }
        return [...current, item];
      });
    };

    const updateQuantity = (id: string, quantity: number) => {
      setItems((current) => current.map((item) => (item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item)).filter((item) => item.quantity > 0));
    };

    const removeItem = (id: string) => {
      setItems((current) => current.filter((item) => item.id !== id));
    };

    const clearCart = () => setItems([]);

    return {
      items,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      isHydrated,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    };
  }, [isHydrated, items]);

  return createElement(CartContext.Provider, { value }, children);
}
