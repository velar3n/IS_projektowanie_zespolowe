import { useMutation } from '@tanstack/react-query';
import AUTH_MUTATIONS from '@app/api/auth/auth.mutations';
import AUTH_KEYS from '@app/api/auth/auth.keys';

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ login, password }: { login: string; password: string }) =>
      AUTH_MUTATIONS.login(login, password),
    mutationKey: [...AUTH_KEYS.LOGIN],
  });
};
