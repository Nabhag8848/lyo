import useSWR from 'swr';
import { api } from '@/api/util';

const fetchReferencePhoto = async (): Promise<ReferencePhoto | null> => {
  const baseUrl = api.serverUrl;
  const res = await fetch(`${baseUrl}/reference-photo/active`, {
    credentials: 'include',
  });

  if (!res.ok) {
    if (res.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch reference photo');
  }

  return res.json();
};

const getReferencePhotoKey = () => {
  return ['reference-photo', 'active'];
};

export const useReferencePhoto = () => {
  return useSWR(getReferencePhotoKey, fetchReferencePhoto, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};
