import { RouterProvider } from 'react-router-dom';
import { useCreateRouter } from '@/app/hooks';

export const AppRouter = () => {
  return <RouterProvider router={useCreateRouter()} />;
};
