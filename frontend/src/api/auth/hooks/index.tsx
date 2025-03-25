import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import AUTH_MUTATIONS from '@/api/auth/auth.mutations';
import AUTH_KEYS from '@/api/auth/auth.keys';
import { AUTH_QUERIES } from '../auth.queries';
import { useUserStore } from '@/stores/user';

export const useLogin = (settings?: {
  onInvalidCredentials?: () => void;
  onServerError?: () => void;
}) => {
  return useMutation({
    mutationFn: ({ login, password }: { login: string; password: string }) =>
      AUTH_MUTATIONS.login(login, password),
    mutationKey: [...AUTH_KEYS.LOGIN],
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

export const useLogout = () => {
  const deleteUser = useUserStore((state) => state.clearUser);
  return useMutation({
    mutationFn: () => {
      deleteUser();
      return AUTH_MUTATIONS.logout();
    },
  });
};

export const useSessionData = () => {
  return useQuery({
    queryFn: AUTH_QUERIES.getSessionData,
    queryKey: [...AUTH_KEYS.GET_SESSION_DATA],
    staleTime: 10 * 60 * 1000,
  });
};
