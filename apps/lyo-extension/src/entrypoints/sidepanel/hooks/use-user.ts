import useSWR from 'swr';
import { api } from '@/api/util';

interface User {
  isActive: boolean;
}

const fetchUser = async (): Promise<User | null> => {
  const baseUrl = api.serverUrl;
  const res = await fetch(`${baseUrl}/user/me`, {
    credentials: 'include',
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
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
