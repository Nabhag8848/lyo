import useSWR from 'swr';
import { apiClient } from '@/api/util';

const fetchUser = async (): Promise<User | null> => {
  try {
    const res = await apiClient.get<User>('/user/me');
    return res.data;
  } catch {
    return null;
  }
};

// Create a key function that depends on the access token
const getUserKey = () => {
  return ['user', 'profile'];
};

export const useUser = () => {
  return useSWR(getUserKey, fetchUser, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};
