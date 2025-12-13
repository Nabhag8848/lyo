import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadAvatar } from '@/modules/onboarding/api';

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();
  return useMutation<Avatar | null, Error, File>({
    mutationFn: (file: File) => uploadAvatar(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['avatar'] });
    },
  });
};
