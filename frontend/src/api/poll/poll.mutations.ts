import axios from 'axios';
import backendUrl from '../backendUrl';
import { FilledPollRequest } from './types';
import { CreatePollRequest } from './types';

const deletePoll = async (pollId: string) => {
  const endpoint = `${backendUrl}/surveys/${pollId}`;
  await axios.delete(endpoint);
};

const createPoll = async (data: CreatePollRequest) => {
  const endpoint = `${backendUrl}/surveys`;
  await axios.post(endpoint, data);
};

const submitPoll = async ({
  pollId,
  data,
}: {
  pollId: string;
  data: FilledPollRequest;
}) => {
  const endpoint = `${backendUrl}/surveys/${pollId}`;
  await axios.post(endpoint, data);
};

const POLL_MUTATIONS = {
  deletePoll,
  submitPoll,
  createPoll,
};

export default POLL_MUTATIONS;
