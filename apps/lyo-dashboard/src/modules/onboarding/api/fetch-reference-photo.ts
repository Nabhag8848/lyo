import { getServerEndpointUrl } from '@/app/utils';
export const fetchReferencePhoto = async (): Promise<ReferencePhoto | null> => {
  const res = await fetch(getServerEndpointUrl('reference-photo/active'), {
    credentials: 'include',
  });
  if (!res.ok) {
    return null;
  }
  return res.json();
};
