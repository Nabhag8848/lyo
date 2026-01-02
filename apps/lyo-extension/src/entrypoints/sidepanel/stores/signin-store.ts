import { getAccessToken } from '@/api/get-access-token';
import { create } from 'zustand';

type SignInState = {
  accessToken: string | null;
  isHydrated: boolean;
  setAccessToken: (accessToken: string | null) => void;
  hydrate: () => Promise<void>;
};

export const useSignInStore = create<SignInState>()((set, get) => ({
  accessToken: null,
  isHydrated: false,
  setAccessToken: (accessToken: string | null) => set({ accessToken }),
  hydrate: async () => {
    if (get().isHydrated) return;
    const accessToken = await getAccessToken();
    set({ accessToken, isHydrated: true });
  },
}));
