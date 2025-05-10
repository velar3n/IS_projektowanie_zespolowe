import { AuthRoles } from '@/api/types';

export type User = {
  username: string;
  email: string;
  status: string;
  roles: AuthRoles[];
};

export type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};
