import { useQuery } from '@tanstack/react-query';
import { fetchReferencePhoto } from '@/modules/onboarding/api';

export const useReferencePhoto = () => {
  return useQuery<ReferencePhoto | null>({
    queryKey: ['reference-photo'],
    queryFn: fetchReferencePhoto,
  });
};
