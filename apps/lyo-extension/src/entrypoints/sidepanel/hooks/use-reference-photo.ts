import useSWR from 'swr';
import { api } from '@/api/util';
import { useReferencePhotoStore } from '@/entrypoints/sidepanel/stores';

const fetchReferencePhoto = async (): Promise<ReferencePhoto | null> => {
  const baseUrl = api.serverUrl;
  const res = await fetch(`${baseUrl}/reference-photo/active`, {
    credentials: 'include',
  });

  if (!res.ok) {
    return null;
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
    onSuccess: (data) => {
      useReferencePhotoStore.getState().setReferencePhoto(data);
    },
  });
};
