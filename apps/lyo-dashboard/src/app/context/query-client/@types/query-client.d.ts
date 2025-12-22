import '@tanstack/react-query';

type QueryKey = ['dashboard', 'user', 'profile'] | ['reference-photo'];

declare module '@tanstack/react-query' {
  interface Register {
    queryKey: QueryKey;
    mutationKey: QueryKey;
  }
}
