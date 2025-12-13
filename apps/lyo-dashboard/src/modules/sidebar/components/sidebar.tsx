import { NavLink } from 'react-router-dom';
import { useAuth } from '@/modules/auth/context';
import { getWebsiteUrl } from '@/app/utils';
import { AppPath } from '@/app/utils/title';

export const Sidebar = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2 text-[11px] font-bold tracking-[0.15em] uppercase transition-colors ${
      isActive
        ? 'bg-stone-100 text-stone-900'
        : 'text-stone-500 hover:bg-stone-50 hover:text-stone-900'
    }`;

  return (
    <div className="w-64 min-h-screen bg-white text-stone-900 flex flex-col border-r border-stone-200">
      {/* User Profile Section */}
      <div className="p-6 border-b border-stone-200">
        <div className="flex items-center gap-3 mb-3">
          <h2 className="font-display text-lg font-normal text-stone-900 tracking-wide">
            {user?.firstName} {user?.lastName}
          </h2>
        </div>
        <div className="text-[11px] font-bold tracking-[0.2em] text-stone-500 uppercase mb-2">
          Pro Plan
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <NavLink to={AppPath.ONBOARDING} className={navLinkClass}>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span>Onboarding</span>
        </NavLink>

        <NavLink to={AppPath.SETTINGS} className={navLinkClass}>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>Settings</span>
        </NavLink>

        <a
          href={getWebsiteUrl()}
          className="flex items-center gap-3 px-3 py-2 text-[11px] font-bold tracking-[0.15em] uppercase text-stone-500 hover:bg-stone-50 hover:text-stone-900 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span>Try On Clothes</span>
        </a>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-stone-200">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2 text-[10px] font-bold tracking-[0.2em] uppercase text-stone-500 hover:text-stone-900 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};
