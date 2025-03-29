export type LoginCredentials = {
  username: string;
  password: string;
};

export type RegisterData = LoginCredentials & { email: string };
