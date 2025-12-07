import { getServerEndpointUrl } from '@/app/utils';

export const useSignInWithGoogle = () => {
  const signInWithGoogle = () => {
    window.open(getServerEndpointUrl('auth/google'), '_self');
  };
  return { signInWithGoogle };
};
