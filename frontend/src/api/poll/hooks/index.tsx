import { useMutation, useQuery } from '@tanstack/react-query';
import POLL_MUTATIONS from '../poll.mutations';
import POLL_QUERIES from '../poll.queries';
import POLL_KEYS from '@/api/poll/poll.keys';

export const useDeletePoll = () => {
  return useMutation({
    mutationFn: POLL_MUTATIONS.deletePoll,
  });
};

export const usePollDetails = (id?: string) => {
  return useQuery({
    queryFn: () => POLL_QUERIES.getPollById(id!),
    queryKey: [...POLL_KEYS.GET_POLL],
    enabled: Boolean(id),
  });
};
