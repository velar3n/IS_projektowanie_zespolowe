import axios from 'axios';
import backendUrl from '../backendUrl';

// TODO add zustand for storing session data and use sth else than native fetch api
const login = async (login: string, password: string) => {
  const endpoint = `${backendUrl}/login`;

  const data = await axios.post(endpoint, { username: login, password });

  return data;
};

const logout = async () => {
  return;
};

const AUTH_MUTATIONS = {
  login,
  logout,
};

export default AUTH_MUTATIONS;
