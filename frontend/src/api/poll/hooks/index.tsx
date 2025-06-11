import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import POLL_MUTATIONS from '../poll.mutations';
import POLL_QUERIES from '../poll.queries';
import POLL_KEYS from '@/api/poll/poll.keys';

export const useDeletePoll = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: POLL_MUTATIONS.deletePoll,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [...POLL_KEYS.GET_POLLS],
      });
    },
  });
};

export const usePollDetails = (id?: string) => {
  return useQuery({
    queryFn: () => POLL_QUERIES.getPollById(id!),
    queryKey: [...POLL_KEYS.GET_POLL],
    enabled: Boolean(id),
  });
};

export const useSubmitPoll = () => {
  return useMutation({
    mutationFn: POLL_MUTATIONS.submitPoll,
  });
};

export const useUserSubmissions = () => {
  return useQuery({
    queryFn: POLL_QUERIES.getUserSubmissions,
    queryKey: POLL_KEYS.GET_SUBMISSIONS,
  });
};

export const usePollResults = (id?: string) => {
  return useQuery({
    queryFn: () => POLL_QUERIES.getPollResults(id!),
    queryKey: POLL_KEYS.GET_POLL_RESULTS,
    enabled: Boolean(id),
  });
};

export const useUserSubmission = (id?: string) => {
  return useQuery({
    queryFn: () => POLL_QUERIES.getUserSubmission(id!),
    queryKey: [...POLL_KEYS.GET_SUBMISSION, id],
    enabled: Boolean(id),
  });
};

export const useCreatePoll = () => {
  return useMutation({
    mutationFn: POLL_MUTATIONS.createPoll,
  });
};

export const usePolls = (type: 'public' | 'private' | 'all' = 'all') => {
  return useQuery({
    queryFn: () => POLL_QUERIES.getPolls(type),
    queryKey: [...POLL_KEYS.GET_POLLS, type],
  });
};
