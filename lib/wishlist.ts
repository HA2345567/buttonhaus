"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "./types";

interface WishlistStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  totalItems: () => number;
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => {
        const { items } = get();
        const existingItem = items.find(item => item.id === product.id);
        
        if (!existingItem) {
          set({ items: [...items, product] });
        }
      },
      
      removeItem: (productId) => {
        const { items } = get();
        set({ items: items.filter(item => item.id !== productId) });
      },
      
      isInWishlist: (productId) => {
        const { items } = get();
        return items.some(item => item.id === productId);
      },
      
      clearWishlist: () => set({ items: [] }),
      
      totalItems: () => {
        const { items } = get();
        return items.length;
      },
    }),
    {
      name: "buttonhaus-wishlist",
    }
  )
);