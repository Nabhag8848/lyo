import { fetchUser, invalidateUser, logout } from '@/lib/auth';
import { use } from 'react';

export const Dashboard = () => {
  const user = use(fetchUser());

  // Get main website URL helper
  const getMainWebsiteUrl = () =>
    import.meta.env.VITE_FRONT_URL ?? 'http://localhost:4200';

  // Redirect if not authenticated - redirect to main website
  if (!user) {
    window.location.href = getMainWebsiteUrl();
    return null;
  }

  const handleLogout = async () => {
    await logout();
    invalidateUser();
    // Redirect to main website after logout
    window.location.href = getMainWebsiteUrl();
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-stone-100">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          <a
            href={getMainWebsiteUrl()}
            className="flex items-center gap-1 cursor-pointer group"
          >
            <span className="font-display text-3xl tracking-wide font-normal group-hover:text-stone-600 transition-colors">
              LYO.
            </span>
          </a>
          <button
            onClick={handleLogout}
            className="text-[10px] font-bold tracking-[0.2em] text-stone-500 hover:text-black transition-colors uppercase"
          >
            Sign Out
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border border-stone-200 rounded-full text-[10px] font-bold tracking-[0.2em] text-stone-500 uppercase bg-white shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Account Active
            </div>
            <h1 className="font-display text-5xl lg:text-6xl leading-[1.1] text-black mb-4 uppercase">
              Welcome back,
              <br />
              <span className="text-stone-400">{user.firstName || 'User'}</span>
            </h1>
            <p className="text-lg text-stone-500 font-light">
              Manage your LYO experience and preferences.
            </p>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden mb-8">
            <div className="p-8 border-b border-stone-100">
              <h2 className="text-[11px] font-bold tracking-[0.2em] text-stone-400 uppercase mb-6">
                Profile
              </h2>
              <div className="flex items-center gap-6">
                {user.picture ? (
                  <img
                    src={user.picture}
                    alt="Profile"
                    className="w-20 h-20 rounded-full border-2 border-stone-100 shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-stone-200 flex items-center justify-center">
                    <span className="font-display text-2xl text-stone-400">
                      {user.firstName?.[0] || '?'}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="font-display text-2xl text-stone-900 uppercase tracking-wide">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-stone-500 text-sm mt-1">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-stone-50">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <span className="text-[9px] font-bold tracking-[0.2em] text-stone-400 uppercase block mb-2">
                    Member Since
                  </span>
                  <span className="text-stone-700 font-medium">
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-bold tracking-[0.2em] text-stone-400 uppercase block mb-2">
                    Account Status
                  </span>
                  <span className="inline-flex items-center gap-2 text-green-600 font-medium">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid sm:grid-cols-2 gap-4">
            <a
              href={getMainWebsiteUrl()}
              className="bg-white rounded-xl border border-stone-200 p-6 hover:border-stone-300 hover:shadow-sm transition-all group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">
                    Try On Clothes
                  </h3>
                  <p className="text-sm text-stone-500">
                    Browse and virtually try on outfits
                  </p>
                </div>
                <span className="text-stone-300 group-hover:text-stone-500 group-hover:translate-x-1 transition-all text-2xl">
                  →
                </span>
              </div>
            </a>
            <button
              onClick={handleLogout}
              className="bg-white rounded-xl border border-stone-200 p-6 hover:border-red-200 hover:bg-red-50 transition-all group text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-stone-900 group-hover:text-red-600 mb-1">
                    Sign Out
                  </h3>
                  <p className="text-sm text-stone-500">
                    Sign out of your account
                  </p>
                </div>
                <span className="text-stone-300 group-hover:text-red-400 transition-all text-xl">
                  ↗
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
