export type AuthMode = 'login' | 'register';

export type AuthFormData = {
  email: string;
  password: string;
  name?: string;
};
