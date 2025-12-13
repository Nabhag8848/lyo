import { useMutation } from '@tanstack/react-query';
import { uploadAvatar } from '@/modules/onboarding/api';

export const useUploadAvatar = () => {
  return useMutation<Avatar | null, Error, File>({
    mutationFn: (file: File) => uploadAvatar(file),
  });
};
