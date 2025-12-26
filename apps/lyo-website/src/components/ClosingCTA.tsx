export const ClosingCTA = () => {
  return (
    <div className="mt-32 relative group">
      {/* Main Card */}
      <div className="bg-stone-900 rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden border border-stone-800 shadow-2xl">
        <div className="relative z-10 flex flex-col items-center">
          {/* Headline (Sentence Case) */}
          <h3 className="font-display text-5xl md:text-7xl text-white leading-tight mb-6">
            Start Your
            <br />
            <span className="italic text-stone-400">Style Journey</span>
          </h3>
          {/* Subtext */}
          <p className="text-stone-400 text-lg font-light max-w-xl mb-10 leading-relaxed">
            Create your avatar, try on clothes from Myntra, and see exactly how
            they look on you. Shop with confidence, every time.
          </p>
          {/* CTA Block */}
          <div className="flex flex-col items-center gap-4 w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-white text-black px-12 py-5 rounded-sm text-xs font-bold tracking-[0.2em] hover:bg-brand-pink hover:text-white transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,63,108,0.6)] uppercase flex items-center justify-center gap-3">
              Start for Free
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </button>
            <p className="text-[10px] text-stone-500 font-medium tracking-wider uppercase">
              5 Credits Free • No Credit Card Required
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
