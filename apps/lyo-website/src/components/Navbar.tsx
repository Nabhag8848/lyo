import useSWR from 'swr';
import { fetchUser, userKey, loginWithGoogle } from '@/lib/auth';

export const Navbar = () => {
  const { data: user } = useSWR(userKey, fetchUser, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-stone-100">
      <div className="mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-12  h-14 md:h-16 flex items-center justify-between">
        <a
          href="#hero"
          className="flex items-center gap-1 cursor-pointer group"
        >
          <span className="font-display text-2xl sm:text-2xl md:text-3xl tracking-wide font-normal group-hover:text-stone-600 transition-colors">
            LYO.
          </span>
        </a>

        <div className="hidden md:flex items-center gap-10 text-[11px] font-bold tracking-[0.2em] text-stone-500 uppercase">
          <a href="#hero" className="hover:text-black transition-colors">
            Home
          </a>
          <a
            href="#how-it-works"
            className="hover:text-black transition-colors"
          >
            How It Works
          </a>
          <a href="#pricing" className="hover:text-black transition-colors">
            Pricing
          </a>
        </div>

        {user ? (
          <a
            href={import.meta.env.VITE_APP_URL}
            className="flex items-center gap-1.5 sm:gap-2 md:text-[11px] text-[9px] font-bold tracking-[0.2em] text-stone-500 hover:text-black transition-colors uppercase group"
          >
            <span className="md:hidden">Dashboard</span>
            <span className="hidden md:inline">Go to Dashboard</span>
            <span className="group-hover:translate-x-0.5 transition-all -translate-y-px">
              →
            </span>
          </a>
        ) : (
          <button
            onClick={loginWithGoogle}
            className="bg-black text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-[9px] sm:text-[10px] font-bold tracking-[0.2em] hover:bg-stone-800 transition-all shadow-lg uppercase"
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
    <div className="mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-12 h-14 md:h-16 flex items-center justify-between">
      <span className="font-display text-3xl tracking-wide">LYO.</span>
      <div className="hidden md:flex items-center gap-10 text-[1.1rem] font-bold tracking-[0.2em] text-stone-500 uppercase">
        <span>Home</span>
        <span>How It Works</span>
        <span>Pricing</span>
      </div>
      <div className="w-24 h-10 bg-stone-100 animate-pulse rounded" />
    </div>
  </nav>
);
