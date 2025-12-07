import { User } from '@/@types';

const API_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000/v1';

// Cache for the user promise to avoid refetching
let userPromise: Promise<User | null> | null = null;

export const fetchUser = (): Promise<User | null> => {
  if (!userPromise) {
    userPromise = fetch(`${API_URL}/user/profile`, {
      credentials: 'include',
    })
      .then((res) => (res.ok ? res.json() : null))
      .catch(() => null);
  }
  return userPromise;
};

export const invalidateUser = () => {
  userPromise = null;
};

export const loginWithGoogle = () => {
  window.location.href = `${API_URL}/auth/google`;
};

export const logout = async () => {
  await fetch(`${API_URL}/auth/logout`, { credentials: 'include' });
  invalidateUser();
};
