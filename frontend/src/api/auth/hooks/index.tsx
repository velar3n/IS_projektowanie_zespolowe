import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import AUTH_MUTATIONS from '@/api/auth/auth.mutations';
import AUTH_KEYS from '@/api/auth/auth.keys';
import { useUserStore } from '@/stores/user';
import { RegisterData } from '../types';
import { AUTH_QUERIES } from '../auth.queries';

export const useLogin = (settings?: {
  onInvalidCredentials?: () => void;
  onServerError?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (details: { username: string; password: string }) =>
      AUTH_MUTATIONS.login(details),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [...AUTH_KEYS.GET_SESSION_DATA],
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          settings?.onInvalidCredentials?.();
        } else {
          settings?.onServerError?.();
        }
      }
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RegisterData) => {
      return AUTH_MUTATIONS.register(data);
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [...AUTH_KEYS.GET_SESSION_DATA] });
    },
    // TODO add proper handling
    onError: () => {
      // eslint-disable-next-line no-console
      console.log('Failed to register');
    },
  });
};

export const useLogout = () => {
  const deleteUser = useUserStore((state) => state.clearUser);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return AUTH_MUTATIONS.logout();
    },
    onSuccess: () => {
      deleteUser();
      queryClient.refetchQueries({
        queryKey: [...AUTH_KEYS.GET_SESSION_DATA],
      });
    },
  });
};

export const useSessionData = () => {
  return useQuery({
    queryFn: AUTH_QUERIES.getSessionData,
    queryKey: [...AUTH_KEYS.GET_SESSION_DATA],
    staleTime: 60 * 60 * 1000,
  });
};
