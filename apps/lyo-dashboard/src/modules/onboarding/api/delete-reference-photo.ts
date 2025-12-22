import { getServerEndpointUrl } from '@/app/utils';

export const deleteReferencePhoto = async (): Promise<void> => {
  const response = await fetch(getServerEndpointUrl('reference-photo/active'), {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to delete reference photo');
  }
};
