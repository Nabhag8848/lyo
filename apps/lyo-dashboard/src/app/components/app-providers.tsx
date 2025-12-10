import { Outlet } from 'react-router-dom';
import { StrictMode } from 'react';
import { PageTitle } from '@/app/utils';
import { HelmetProvider } from 'react-helmet-async';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClientProvider } from '@/app/context/query-client';
import { AuthProvider } from '@/modules/auth/context';

export const AppRouterProviders = () => {
  return (
    <StrictMode>
      <HelmetProvider>
        <QueryClientProvider>
          <AuthProvider>
            <PageTitle />
            <Outlet />
            <ReactQueryDevtools initialIsOpen={false} />
          </AuthProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </StrictMode>
  );
};
