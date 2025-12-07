import '@tanstack/react-query';

type QueryKey = ['dashboard', 'user', 'profile', ...ReadonlyArray<unknown>];

declare module '@tanstack/react-query' {
  interface Register {
    queryKey: QueryKey;
    mutationKey: QueryKey;
  }
}
