const API_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000/v1';

export interface User {
  email: string;
  firstName?: string;
  lastName?: string;
  picture?: string;
  createdAt: string;
}

// SWR fetcher function for user profile
export const fetchUser = async (): Promise<User | null> => {
  const res = await fetch(`${API_URL}/user/profile`, {
    credentials: 'include',
  });
  if (!res.ok) {
    return null;
  }
  return res.json();
};

// SWR key for user profile
export const userKey = '/user/profile';

export const loginWithGoogle = () => {
  window.location.assign(`${API_URL}/auth/google`);
};

export const logout = async () => {
  await fetch(`${API_URL}/auth/logout`, { credentials: 'include' });
};
