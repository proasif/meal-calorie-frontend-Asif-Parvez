import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/user';

/**
 * zustand store that keeps auth state between sessions.
 * it stores the token and user info so you're still logged in.
 */

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (payload: { token: string; user: User }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (payload) => set({ token: payload.token, user: payload.user }),
      logout: () => set({ token: null, user: null }),
    }),
    // saved in localStorage under the "auth" key
    { name: 'auth' }
  )
);
