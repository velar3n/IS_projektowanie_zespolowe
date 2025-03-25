export type UserStatus = 'active' | 'blocked' | 'deleted';
export type UserRole = 'user' | 'admin';

export type User = {
  name: string;
  email: string;
  status: string;
  role: UserRole;
};

export type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};
