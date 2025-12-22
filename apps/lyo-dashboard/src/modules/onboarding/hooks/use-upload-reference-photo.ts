import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadReferencePhoto } from '@/modules/onboarding/api';

export const useUploadReferencePhoto = () => {
  const queryClient = useQueryClient();
  return useMutation<ReferencePhoto | null, Error, File>({
    mutationFn: (file: File) => uploadReferencePhoto(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reference-photo'] });
    },
  });
};
