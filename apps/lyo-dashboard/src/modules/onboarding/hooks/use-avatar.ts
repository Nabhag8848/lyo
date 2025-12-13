import { useQuery } from '@tanstack/react-query';
import { fetchAvatar } from '@/modules/onboarding/api';

export const useAvatar = () => {
  return useQuery<Avatar | null>({
    queryKey: ['avatar'],
    queryFn: fetchAvatar,
  });
};
