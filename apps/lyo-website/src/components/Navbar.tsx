import { useNavigate, Link } from 'react-router-dom';
import useSWR from 'swr';
import { fetchUser, userKey, loginWithGoogle, signOut } from '@/lib/auth';

export const Navbar = () => {
  const { data: user, mutate } = useSWR(userKey, fetchUser, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    mutate(null, false);
    navigate('/');
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-stone-100">
      <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1 cursor-pointer group">
          <span className="font-display text-3xl tracking-wide font-normal group-hover:text-stone-600 transition-colors">
            LYO.
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10 text-[11px] font-bold tracking-[0.2em] text-stone-500 uppercase">
          <a
            href="#how-it-works"
            className="hover:text-black transition-colors"
          >
            Experience
          </a>
          <a href="#pricing" className="hover:text-black transition-colors">
            Pricing
          </a>
        </div>

        {user ? (
          <div className="flex items-center gap-4">
            <a
              href={import.meta.env.VITE_APP_URL}
              className="flex items-center gap-3 hover:bg-stone-50 px-3 py-2 rounded-lg transition-colors"
            >
              {user.picture ? (
                <img
                  src={user.picture}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-stone-200"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-stone-200" />
              )}
              <span className="text-[11px] font-bold tracking-[0.15em] text-stone-700 uppercase hidden sm:block">
                {user.firstName || 'Dashboard'}
              </span>
            </a>
            <button
              onClick={handleSignOut}
              className="text-[10px] font-bold tracking-[0.2em] text-stone-400 hover:text-stone-600 transition-colors uppercase"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={loginWithGoogle}
            className="bg-black text-white px-6 py-3 text-[10px] font-bold tracking-[0.2em] hover:bg-stone-800 transition-all shadow-lg uppercase"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

// Loading fallback for Suspense
export const NavbarSkeleton = () => (
  <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-stone-100">
    <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
      <span className="font-display text-3xl tracking-wide">LYO.</span>
      <div className="hidden md:flex items-center gap-10 text-[11px] font-bold tracking-[0.2em] text-stone-500 uppercase">
        <span>Experience</span>
        <span>Pricing</span>
      </div>
      <div className="w-24 h-10 bg-stone-100 animate-pulse rounded" />
    </div>
  </nav>
);
