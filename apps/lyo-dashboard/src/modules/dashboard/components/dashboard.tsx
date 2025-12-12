import { getWebsiteUrl } from '@/app/utils';
import { useAuth } from '@/modules/auth/context';
import { Sidebar } from './sidebar';
import { AvatarOnboarding } from './avatar-onboarding';

export const Dashboard = () => {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (!isLoading && !isAuthenticated) {
    window.open(getWebsiteUrl(), '_self');
    return null;
  }

  if (isLoading || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Sidebar */}
      <Sidebar activeItem="onboarding" />

      {/* Main Panel */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-20 bg-white/95 backdrop-blur-xl border-b border-stone-100 flex items-center justify-between px-6">
          <a
            href={getWebsiteUrl()}
            className="flex items-center gap-1 cursor-pointer group"
          >
            <span className="font-display text-3xl tracking-wide font-normal text-stone-900 group-hover:text-stone-600 transition-colors">
              LYO.
            </span>
          </a>
        </div>

        {/* Main Content */}
        <AvatarOnboarding />
      </div>
    </div>
  );
};
