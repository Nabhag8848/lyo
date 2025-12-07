export const getWebsiteUrl = () =>
  import.meta.env.VITE_FRONT_URL ?? 'http://localhost:4200';
