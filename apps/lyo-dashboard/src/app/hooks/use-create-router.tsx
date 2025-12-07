import { Route } from 'react-router-dom';
import { Suspense } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { DefaultLayout } from '@/app/layout/components';
import { AppRouterProviders } from '@/app/components';
import { Dashboard } from '@/modules/dashboard/components';
import { AppPath } from '@/app/utils/title';
import { DashboardSkeleton } from '@/modules/dashboard/skeleton';

export const useCreateRouter = (): ReturnType<typeof createBrowserRouter> => {
  return createBrowserRouter(
    createRoutesFromElements(
      <Route element={<AppRouterProviders />}>
        <Route element={<DefaultLayout />}>
          <Route
            path={AppPath.ROOT}
            element={
              <Suspense fallback={<DashboardSkeleton />}>
                <Dashboard />
              </Suspense>
            }
          />
        </Route>
      </Route>
    )
  );
};
