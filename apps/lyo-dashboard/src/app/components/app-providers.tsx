import { Outlet } from 'react-router-dom';
import { StrictMode } from 'react';
import { PageTitle } from '@/app/utils/page-title';

export const AppRouterProviders = () => {
  return (
    <StrictMode>
      <PageTitle />
      <Outlet />
    </StrictMode>
  );
};
