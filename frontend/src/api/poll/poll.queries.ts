import axios from 'axios';
import backendUrl from '../backendUrl';
import { PollResponse } from './types';

const getPollById = async (id: string) => {
  const endpoint = `${backendUrl}/surveys/${id}`;

  const { data } = await axios.get(endpoint);
  return data as PollResponse;
};

const POLL_QUERIES = {
  getPollById,
};

export default POLL_QUERIES;
