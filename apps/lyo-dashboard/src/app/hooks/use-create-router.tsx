import { Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { DefaultLayout } from '@/app/layout/components';
import { AppRouterProviders } from '@/app/components';
import { ReferencePhotoOnboarding } from '@/modules/onboarding/components';
import { Settings } from '@/modules/settings/components';
import { AppPath } from '@/app/utils/title';
import { DashboardSkeleton } from '@/modules/onboarding/skeleton';

export const useCreateRouter = (): ReturnType<typeof createBrowserRouter> => {
  return createBrowserRouter(
    createRoutesFromElements(
      <Route element={<AppRouterProviders />}>
        <Route element={<DefaultLayout />}>
          <Route
            path={AppPath.ROOT}
            element={<Navigate to={AppPath.ONBOARDING} replace />}
          />
          <Route
            path={AppPath.ONBOARDING}
            element={
              <Suspense fallback={<DashboardSkeleton />}>
                <ReferencePhotoOnboarding />
              </Suspense>
            }
          />
          <Route
            path={AppPath.SETTINGS}
            element={
              <Suspense fallback={<DashboardSkeleton />}>
                <Settings />
              </Suspense>
            }
          />
        </Route>
      </Route>
    )
  );
};
