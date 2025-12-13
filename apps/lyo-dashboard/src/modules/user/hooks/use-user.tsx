import { fetchUser } from '@/modules/user/api/fetch-user';
import { useQuery } from '@tanstack/react-query';

export const useUser = () => {
  return useQuery<User | null>({
    queryKey: ['dashboard', 'user', 'profile'],
    queryFn: fetchUser,
  });
};
