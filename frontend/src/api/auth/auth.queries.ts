import { UserDetailsResponse } from '../types';
import backendUrl from '../backendUrl';
import axios from 'axios';

const getSessionData = async () => {
  const endpoint = `${backendUrl}/user`;
  const { data } = await axios.get(endpoint, { withCredentials: true });

  return data as UserDetailsResponse | null;
};

export const AUTH_QUERIES = {
  getSessionData,
};
