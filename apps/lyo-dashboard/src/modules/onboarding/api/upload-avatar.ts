import { getServerEndpointUrl } from '@/app/utils';

export const uploadAvatar = async (file: File): Promise<Avatar | null> => {
  const formData = new FormData();
  formData.append('avatar', file);

  const response = await fetch(getServerEndpointUrl('avatar/upload'), {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data;
};
