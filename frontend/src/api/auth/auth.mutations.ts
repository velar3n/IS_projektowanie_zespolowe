import axios from 'axios';
import backendUrl from '../backendUrl';
import { LoginCredentials, RegisterData } from './types';

const login = async (details: LoginCredentials) => {
  const endpoint = `${backendUrl}/login`;
  await axios.post(endpoint, details);
};

const register = async (details: RegisterData) => {
  const endpoint = `${backendUrl}/register`;
  await axios.post(endpoint, details);
};

const logout = async () => {
  return;
};

const AUTH_MUTATIONS = {
  login,
  register,
  logout,
};

export default AUTH_MUTATIONS;
