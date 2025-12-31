import { useAccessToken } from './hooks/use-access-token';
import { useUser } from './hooks/use-user';
import { SignInScreen } from './components/SignInScreen';
import { InactiveAccountScreen } from './components/InactiveAccountScreen';
import { FittingRoom } from './components/FittingRoom';

function App() {
  const accessToken = useAccessToken();
  const { data: user, isLoading: isUserLoading } = useUser();

  // Show loader while checking authentication
  if (isUserLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="w-10 h-10 border-2 border-stone-200 border-t-brand-pink rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!accessToken) {
    return <SignInScreen />;
  }

  if (user && !user.isActive) {
    return <InactiveAccountScreen />;
  }

  return <FittingRoom />;
}

export default App;
