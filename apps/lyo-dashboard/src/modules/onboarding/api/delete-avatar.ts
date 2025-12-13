import { getServerEndpointUrl } from '@/app/utils';

export const deleteAvatar = async (): Promise<void> => {
  const response = await fetch(getServerEndpointUrl('avatar'), {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to delete avatar');
  }
};
