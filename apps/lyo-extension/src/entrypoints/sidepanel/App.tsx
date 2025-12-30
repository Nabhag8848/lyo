import { useAccessToken } from './hooks/use-access-token';
import { useUser } from './hooks/use-user';
import { SignInScreen } from './components/SignInScreen';
import { InactiveAccountScreen } from './components/InactiveAccountScreen';
import { FittingRoom } from './components/FittingRoom';

function App() {
  const accessToken = useAccessToken();
  const { data: user, isLoading } = useUser();

  if (!accessToken) {
    return <SignInScreen />;
  }

  if (!isLoading && user && !user.isActive) {
    return <InactiveAccountScreen />;
  }

  return <FittingRoom />;
}

export default App;
