import axios from 'axios';
import backendUrl from '../backendUrl';
import { FilledPollRequest } from './types';

const deletePoll = (pollId: string) => {
  // TODO perform delete call to the backend endpoint
  // eslint-disable-next-line no-console
  console.log(pollId);
  return new Promise(() => {});
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
};

export default POLL_MUTATIONS;
