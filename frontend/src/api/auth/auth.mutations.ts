import axios from 'axios';
import backendUrl from '../backendUrl';
import { LoginCredentials, RegisterData } from './types';
import { UserDetailsResponse } from '../types';

const login = async (details: LoginCredentials) => {
  const endpoint = `${backendUrl}/login`;
  const { data } = await axios.post(endpoint, details, {
    withCredentials: true,
  });
  return data as UserDetailsResponse;
};

const logout = async () => {
  const endpoint = `${backendUrl}/logout`;
  await axios.post(endpoint, undefined, { withCredentials: true });
};

const register = async (details: RegisterData) => {
  const endpoint = `${backendUrl}/register`;
  await axios.post(endpoint, details, { withCredentials: true });
};

const AUTH_MUTATIONS = {
  login,
  register,
  logout,
};

export default AUTH_MUTATIONS;
