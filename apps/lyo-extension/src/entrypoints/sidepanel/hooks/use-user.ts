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
  const { data: user } = useSWR(getUserKey, fetchUser, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return user ?? null;
};
