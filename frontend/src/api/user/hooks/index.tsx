import { useMutation } from '@tanstack/react-query';
import USER_MUTATIONS, { ChangePasswordData } from '../user.mutations';

export const useChangePassword = (settings?: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  return useMutation({
    mutationFn: (data: ChangePasswordData) =>
      USER_MUTATIONS.changePassword(data),
    onSuccess: () => {
      settings?.onSuccess?.();
    },
    onError: (error) => {
      settings?.onError?.(error);
    },
  });
};
