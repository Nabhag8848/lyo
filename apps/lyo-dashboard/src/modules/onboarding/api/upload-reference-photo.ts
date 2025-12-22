import { getServerEndpointUrl } from '@/app/utils';

export const uploadReferencePhoto = async (
  file: File
): Promise<ReferencePhoto | null> => {
  const formData = new FormData();
  formData.append('reference-photo', file);

  const response = await fetch(getServerEndpointUrl('reference-photo/upload'), {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
};
