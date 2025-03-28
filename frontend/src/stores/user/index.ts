import { create } from 'zustand';
import { UserStore } from './types';

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => {
    set({ user });
  },
  clearUser: () => set({ user: null }),
}));
