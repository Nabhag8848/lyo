import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/modules/sidebar/components/sidebar';
import { getWebsiteUrl } from '@/app/utils';
import { useAuth } from '@/modules/auth/context';

export const DefaultLayout = () => {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (!isLoading && !isAuthenticated) {
    window.open(getWebsiteUrl(), '_self');
    return null;
  }

  if (isLoading || !user) {
    return null;
  }

  return (
    <div className="h-screen bg-stone-50 flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Panel */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="h-20 bg-white/95 backdrop-blur-xl border-b border-stone-100 flex items-center justify-between px-6 shrink-0">
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
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
