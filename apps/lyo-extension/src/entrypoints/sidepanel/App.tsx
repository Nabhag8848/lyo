import { useAccessToken } from './hooks/use-access-token';
import { useUser } from './hooks/use-user';
import { SignInScreen } from './components/SignInScreen';
import { InactiveAccountScreen } from './components/InactiveAccountScreen';
import { MainContent } from './components/MainContent';

function App() {
  const accessToken = useAccessToken();
  const user = useUser();

  if (!accessToken) {
    return <SignInScreen />;
  }

  if (user && !user.isActive) {
    return <InactiveAccountScreen />;
  }

  return <MainContent />;
}

export default App;
