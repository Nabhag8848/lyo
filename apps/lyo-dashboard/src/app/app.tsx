import { HelmetProvider } from 'react-helmet-async';
import { AppRouter } from '@/app/components';

export function App() {
  return (
    <HelmetProvider>
      <AppRouter />
    </HelmetProvider>
  );
}

export default App;
