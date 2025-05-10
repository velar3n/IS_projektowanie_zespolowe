export type UserStatus = 'active' | 'blocked' | 'deleted';

export type UserRow = {
  username: string;
  email: string;
  createdAt: string;
  lastLogin: string;
  status: UserStatus;
};
