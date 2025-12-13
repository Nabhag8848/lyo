import { getServerEndpointUrl } from '@/app/utils';
export const fetchAvatar = async (): Promise<Avatar | null> => {
  const res = await fetch(getServerEndpointUrl('avatar'), {
    credentials: 'include',
  });
  if (!res.ok) {
    return null;
  }
  return res.json();
};
