import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/modules/sidebar/components/sidebar';
import { getWebsiteUrl } from '@/app/utils';
import { useAuth } from '@/modules/auth/context';

export const DefaultLayout = () => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!isLoading && !isAuthenticated) {
    window.open(getWebsiteUrl(), '_self');
    return null;
  }

  if (isLoading || !user) {
    return null;
  }

  // Check if user is active
  if (!user.isActive) {
    return (
      <div className="h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center px-6 max-w-md">
          <h1 className="font-display text-4xl tracking-wide font-normal text-black mb-4">
            Coming Soon
          </h1>
          <p className="text-stone-600 text-lg leading-relaxed">
            We're working hard to bring you the best experience possible, for
            early access reachout at{' '}
            <a
              href="mailto:nabhag@lyo.fashion"
              className="text-brand-pink hover:underline"
            >
              nabhag@lyo.fashion
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-stone-50 flex overflow-hidden">
      {/* Mobile/Tablet Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Panel */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top Bar */}
        <div className="h-20 bg-white/95 backdrop-blur-xl border-b border-stone-100 flex items-center justify-between px-4 sm:px-6 shrink-0">
          <a
            href={getWebsiteUrl()}
            className="flex items-center gap-1 cursor-pointer group"
          >
            <span className="font-display text-3xl tracking-wide font-normal text-stone-900 group-hover:text-stone-600 transition-colors">
              LYO.
            </span>
          </a>

          {/* Burger Menu Button - Mobile/Tablet Only */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Main Content - Scrollable area */}
        <div className="flex-1 overflow-y-auto min-h-0 overscroll-contain">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
