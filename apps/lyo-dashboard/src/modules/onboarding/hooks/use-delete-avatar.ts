import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteAvatar } from '@/modules/onboarding/api';

export const useDeleteAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, void>({
    mutationFn: () => deleteAvatar(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['avatar'] });
    },
  });
};
