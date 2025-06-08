import axios from 'axios';
import backendUrl from '../backendUrl';
import { PollResponse } from './types';

const getPollById = async (id: string) => {
  const endpoint = `${backendUrl}/surveys/${id}`;

  const { data } = await axios.get(endpoint);
  return data as PollResponse;
};

const getUserSubmissions = async () => {
  const endpoint = `${backendUrl}/user/submissions`;
  const { data } = await axios.get(endpoint, { withCredentials: true });
  return data;
};

const POLL_QUERIES = {
  getPollById,
  getUserSubmissions,
};

export default POLL_QUERIES;
