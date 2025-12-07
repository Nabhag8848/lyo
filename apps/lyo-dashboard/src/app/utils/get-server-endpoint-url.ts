const API_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000/v1';

export const getServerEndpointUrl = (path: string): string => {
  return `${API_URL}/${path}`;
};
