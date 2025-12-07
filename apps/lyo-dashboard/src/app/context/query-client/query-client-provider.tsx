import {
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

type QueryClientProviderProps = {
  children: React.ReactNode;
};

export default function QueryClientProvider({
  children,
}: QueryClientProviderProps) {
  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
    </TanstackQueryClientProvider>
  );
}
