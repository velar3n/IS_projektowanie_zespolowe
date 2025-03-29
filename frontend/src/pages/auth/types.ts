export type AuthMode = 'login' | 'register';

export type AuthFormData = {
  username: string;
  email?: string;
  password: string;
};
