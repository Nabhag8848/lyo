import { createContext, useContext, ReactNode } from 'react';
import { User } from '@/@types';
import { useUser } from '@/modules/user/hooks';
import { useSignInWithGoogle } from '@/modules/auth/hooks/use-sigin-with-google';
import { useSignOutWithGoogle } from '@/modules/auth/hooks/use-signout-with-google';

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { data: user, isLoading } = useUser();
  const { signInWithGoogle } = useSignInWithGoogle();
  const { mutate: signOutWithGoogle } = useSignOutWithGoogle();

  const value: AuthContextValue = {
    user: user ?? null,
    isLoading,
    isAuthenticated: !isLoading && !!user,
    signIn: signInWithGoogle,
    signOut: signOutWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
