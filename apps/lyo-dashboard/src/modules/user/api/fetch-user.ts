import { User } from '@/@types';
import { getServerEndpointUrl } from '@/app/utils';

export const fetchUser = async (): Promise<User | null> => {
  const res = await fetch(getServerEndpointUrl('user/profile'), {
    credentials: 'include',
  });
  if (!res.ok) {
    return null;
  }
  return res.json();
};
