"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
  updateProfile
} from "firebase/auth";
import { auth } from "./firebase";

interface AuthStore {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  initializeAuth: () => void;
}

export const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      loading: true,

      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ loading }),

      signIn: async (email: string, password: string) => {
        try {
          set({ loading: true });
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          set({ user: userCredential.user, loading: false });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      signUp: async (email: string, password: string, name: string) => {
        try {
          set({ loading: true });
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          
          // Update the user's display name
          await updateProfile(userCredential.user, {
            displayName: name,
          });

          set({ user: userCredential.user, loading: false });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      signOut: async () => {
        try {
          await firebaseSignOut(auth);
          set({ user: null });
        } catch (error) {
          throw error;
        }
      },

      initializeAuth: () => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          set({ user, loading: false });
        });
        return unsubscribe;
      },
    }),
    {
      name: "buttonhaus-auth",
      partialize: (state) => ({ user: state.user }),
    }
  )
);