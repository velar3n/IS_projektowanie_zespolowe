import { UserDetailsResponse } from '@/api/types';

export type User = UserDetailsResponse;

export type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};
