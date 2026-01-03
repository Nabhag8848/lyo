import useSWR from 'swr';
import { apiClient } from '@/api/util';
import { useReferencePhotoStore } from '@/entrypoints/sidepanel/stores';

const fetchReferencePhoto = async (): Promise<ReferencePhoto | null> => {
  try {
    const res = await apiClient.get<ReferencePhoto>('/reference-photo/active');
    return res.data;
  } catch {
    return null;
  }
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
