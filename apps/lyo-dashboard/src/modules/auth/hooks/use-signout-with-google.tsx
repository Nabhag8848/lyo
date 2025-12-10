import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getServerEndpointUrl, getWebsiteUrl } from '@/app/utils';

export const useSignOutWithGoogle = () => {
  const signOutWithGoogle = async (): Promise<void> => {
    await fetch(getServerEndpointUrl('auth/signout'), {
      credentials: 'include',
    });
  };
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signOutWithGoogle,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['dashboard', 'user', 'profile'] });
      window.open(getWebsiteUrl(), '_self');
    },
  });
};
