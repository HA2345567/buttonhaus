"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

// Mock user type for demo purposes
interface MockUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthStore {
  user: MockUser | null;
  loading: boolean;
  setUser: (user: MockUser | null) => void;
  setLoading: (loading: boolean) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  initializeAuth: () => () => void;
}

export const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,

      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ loading }),

      signIn: async (email: string, password: string) => {
        try {
          set({ loading: true });
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock successful login
          const mockUser: MockUser = {
            uid: `user_${Date.now()}`,
            email,
            displayName: email.split('@')[0],
            photoURL: null,
          };
          
          set({ user: mockUser, loading: false });
        } catch (error) {
          set({ loading: false });
          throw new Error("Invalid email or password");
        }
      },

      signUp: async (email: string, password: string, name: string) => {
        try {
          set({ loading: true });
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock successful signup
          const mockUser: MockUser = {
            uid: `user_${Date.now()}`,
            email,
            displayName: name,
            photoURL: null,
          };

          set({ user: mockUser, loading: false });
        } catch (error) {
          set({ loading: false });
          throw new Error("Failed to create account");
        }
      },

      signOut: async () => {
        try {
          set({ user: null });
        } catch (error) {
          throw new Error("Failed to sign out");
        }
      },

      initializeAuth: () => {
        // Mock auth state persistence
        set({ loading: false });
        
        // Return cleanup function
        return () => {};
      },
    }),
    {
      name: "buttonhaus-auth",
      partialize: (state) => ({ user: state.user }),
    }
  )
);