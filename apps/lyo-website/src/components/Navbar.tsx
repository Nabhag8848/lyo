export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-stone-100">
      <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-1 cursor-pointer group">
          <span className="font-display text-3xl tracking-wide font-normal group-hover:text-stone-600 transition-colors">
            LYO.
          </span>
        </div>
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
        <button className="bg-black text-white px-6 py-3 text-[10px] font-bold tracking-[0.2em] hover:bg-stone-800 transition-all shadow-lg uppercase">
          Early Access
        </button>
      </div>
    </nav>
  );
};

