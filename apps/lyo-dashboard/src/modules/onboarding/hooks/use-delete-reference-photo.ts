import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteReferencePhoto } from '@/modules/onboarding/api';

export const useDeleteReferencePhoto = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, void>({
    mutationFn: () => deleteReferencePhoto(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reference-photo'] });
    },
  });
};
