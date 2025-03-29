export type ErrorWithStatus = Error & { status: number };

export type UserStatus = 'active' | 'blocked' | 'deleted';
export type AuthRoles = 'admin' | 'user';

export type UserInfoResponse = {
  username: string;
  email: string;
  created_at: string;
  last_login: string;
  status: UserStatus;
};

export type AuthRolesResponse = {
  roles: AuthRoles[];
};
