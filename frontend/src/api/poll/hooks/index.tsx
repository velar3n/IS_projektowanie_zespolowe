import { useMutation } from '@tanstack/react-query';
import POLL_MUTATIONS from '../poll.mutations';

export const useDeletePoll = () => {
  return useMutation({
    mutationFn: POLL_MUTATIONS.deletePoll,
  });
};
