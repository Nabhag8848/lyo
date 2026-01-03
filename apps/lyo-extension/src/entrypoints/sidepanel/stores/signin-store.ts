import { getAccessToken } from '@/api/get-access-token';
import { create } from 'zustand';

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
