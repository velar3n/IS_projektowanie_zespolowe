import axios from 'axios';
import backendUrl from '../backendUrl';
import {
  PollResponse,
  PollResultsResponse,
  PollsListingResponse,
  UserSubmission,
  UserSubmissionsResult,
} from './types';

const getPollById = async (id: string) => {
  const endpoint = `${backendUrl}/surveys/${id}`;

  const { data } = await axios.get(endpoint);
  return data as PollResponse;
};

const getUserSubmissions = async () => {
  const endpoint = `${backendUrl}/user/submissions`;
  const { data } = await axios.get(endpoint, { withCredentials: true });
  return data as UserSubmissionsResult;
};

const getPollResults = async (pollId: string) => {
  const endpoint = `${backendUrl}/surveys/${pollId}/results`;
  const { data } = await axios.get(endpoint, { withCredentials: true });

  return data as PollResultsResponse;
};

const getUserSubmission = async (id: string) => {
  const endpoint = `${backendUrl}/user/submissions/${id}`;
  const { data } = await axios.get(endpoint, { withCredentials: true });

  return data as UserSubmission;
};

const getPolls = async (type: 'public' | 'private' | 'all') => {
  const endpoint = `${backendUrl}/surveys?visibility=${type}`;
  const { data } = await axios.get(endpoint);
  return data as PollsListingResponse;
};

const POLL_QUERIES = {
  getPollById,
  getUserSubmissions,
  getPollResults,
  getUserSubmission,
  getPolls,
};

export default POLL_QUERIES;
