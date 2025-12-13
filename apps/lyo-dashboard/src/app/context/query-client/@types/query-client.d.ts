import '@tanstack/react-query';

type QueryKey = ['dashboard', 'user', 'profile'] | ['avatar'];

declare module '@tanstack/react-query' {
  interface Register {
    queryKey: QueryKey;
    mutationKey: QueryKey;
  }
}
