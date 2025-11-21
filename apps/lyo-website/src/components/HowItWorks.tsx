export const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="py-32 bg-white border-t border-stone-200 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 space-y-40">
        {/* Section Header */}
        <div className="text-center space-y-8 max-w-3xl mx-auto mb-24">
          <div className="inline-block border border-stone-200 rounded-full px-4 py-2">
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-stone-500">
              The Magic of LYO
            </span>
          </div>
          <h2 className="font-display text-6xl md:text-7xl text-black tracking-wide uppercase">
            Fitting Room, Right In your browser.
          </h2>
          <p className="text-stone-600 text-lg font-light leading-relaxed">
            See how clothes actually fit you before you buy, and shop with
            confidence.
          </p>
        </div>

        {/* STEP 01 */}
        <div className="grid md:grid-cols-2 gap-20 items-center group">
          <div className="relative pl-6 md:pl-0">
            <div className="absolute -top-12 -left-10 md:-top-20 md:-left-20 text-[140px] md:text-[180px] font-display text-stone-100 font-bold -z-10 select-none opacity-50">
              01
            </div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-stone-300"></div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">
                  The Genesis
                </span>
              </div>
              <h3 className="text-4xl md:text-5xl font-display mb-8 text-black uppercase tracking-wide leading-tight">
                Create Your
                <br />
                Digital Twin
              </h3>
              <div className="space-y-6">
                <p className="text-lg text-stone-600 font-light leading-relaxed">
                  Forget the measuring tape. Upload a single{' '}
                  <strong className="text-black font-medium">
                    full-body photo
                  </strong>{' '}
                  to your private vault.
                </p>
                <p className="text-sm text-stone-500 leading-relaxed border-l-2 border-brand-pink/30 pl-4">
                  Our AI instantly maps your unique geometry to build a
                  hyper-realistic 3D model that moves and fits exactly like you
                  do.
                </p>
                <div className="pt-2">
                  <button className="group flex items-center gap-3 bg-stone-100 hover:bg-stone-900 hover:text-white text-stone-600 px-4 py-2.5 rounded-full transition-all duration-300">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                      One-Click Scan
                    </span>
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* VISUAL 01 */}
          <div className="bg-stone-50 h-[450px] rounded-2xl border border-stone-200 flex items-center justify-center relative overflow-hidden shadow-inner">
            <div className="w-72 h-[380px] bg-white border border-stone-200 shadow-2xl rounded-lg flex flex-col overflow-hidden relative">
              <div className="h-12 border-b border-stone-100 flex items-center justify-between px-5 bg-stone-50 shrink-0">
                <span className="font-display text-xl tracking-wide">LYO.</span>
                <span className="text-[9px] bg-black text-white px-2 py-1 rounded-full tracking-widest font-bold">
                  SETUP
                </span>
              </div>
              <div className="flex-1 p-8 flex flex-col relative justify-center">
                <div className="w-full aspect-[3/4] border-2 border-dashed border-stone-200 rounded-md bg-stone-50 relative flex items-center justify-center overflow-hidden">
                  <div className="absolute flex flex-col items-center gap-3 s1-prompt text-stone-400">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em]">
                      Upload Photo
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center s1-loader">
                    <div className="w-10 h-10 border-2 border-stone-200 border-t-black rounded-full animate-spin"></div>
                  </div>
                  <div className="absolute inset-0 s1-photo">
                    <img
                      src="/user-model-pic.png"
                      className="w-full h-full object-cover opacity-80"
                      alt="uploaded"
                    />
                    <div className="absolute w-full h-0.5 bg-green-500 shadow-[0_0_15px_rgba(34,197,94,1)] s1-scan z-20"></div>
                    <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-green-500"></div>
                    <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-green-500"></div>
                    <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-green-500"></div>
                    <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-green-500"></div>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <div className="h-2 w-full bg-stone-100 rounded"></div>
                  <div className="h-2 w-2/3 bg-stone-100 rounded"></div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 s1-cursor pointer-events-none">
                  <svg
                    className="w-8 h-8 text-black drop-shadow-xl"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3.5 3.5L10 19l2.5-6 6-2.5-15-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 02 */}
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="order-2 md:order-1 bg-stone-50 h-[450px] rounded-2xl border border-stone-200 flex items-center justify-center relative shadow-inner overflow-hidden">
            <div className="w-96 bg-white rounded-lg shadow-2xl border border-stone-200 overflow-hidden flex flex-col">
              <div className="bg-stone-50 p-3 flex gap-2 border-b border-stone-200">
                <div className="w-2.5 h-2.5 rounded-full bg-stone-300"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-stone-300"></div>
              </div>
              <div className="p-6 flex gap-6">
                <div className="w-1/2 aspect-[3/4] bg-stone-200 rounded-sm relative overflow-hidden group">
                  <div className="absolute inset-0 flex items-center justify-center text-stone-400">
                    <img
                      src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800"
                      className="w-full h-full object-cover opacity-90"
                      alt="Store Item"
                    />
                  </div>
                </div>
                <div className="w-1/2 space-y-3 pt-2">
                  <div className="h-4 w-full bg-stone-800 rounded-sm"></div>
                  <div className="h-3 w-2/3 bg-stone-300 rounded-sm"></div>
                  <div className="h-8 w-24 bg-stone-100 rounded-sm mt-6"></div>
                  <div className="mt-10 relative z-0">
                    <div className="bg-yellow-400 text-black py-3 px-4 rounded shadow-lg flex items-center justify-center gap-3 step2-btn ring-2 ring-yellow-100">
                      <span className="bg-black text-white px-1.5 py-[2px] text-[7px] rounded-[1px] font-bold tracking-wider">
                        LYO
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                        Try On
                        <svg
                          className="w-3 h-3"
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
                      </span>
                    </div>
                    <svg
                      className="w-8 h-8 absolute top-4 left-4 text-black drop-shadow-xl step2-cursor z-20 pointer-events-none"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3.5 3.5L10 19l2.5-6 6-2.5-15-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 relative pl-6 md:pl-0">
            <div className="absolute -top-12 -left-10 md:-top-20 md:-left-20 text-[140px] md:text-[180px] font-display text-stone-100 font-bold -z-10 select-none opacity-50">
              02
            </div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-stone-300"></div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">
                  Shop Flow
                </span>
              </div>
              <h3 className="text-4xl md:text-5xl font-display mb-8 text-black uppercase tracking-wide leading-tight">
                Shop Your
                <br />
                Favorites
              </h3>
              <div className="space-y-6">
                <p className="text-lg text-stone-600 font-light leading-relaxed">
                  Browse{' '}
                  <strong className="text-black font-medium">Myntra</strong>{' '}
                  like it's your personal closet. Spot a crush-worthy top?
                </p>
                <p className="text-sm text-stone-500 leading-relaxed">
                  Look for the{' '}
                  <strong className="text-brand-pink">TRY ON</strong> button
                  right next to "Add to Bag". Tap it to see how it looks on you
                  before buying.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 03 */}
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="relative pl-6 md:pl-0">
            <div className="absolute -top-12 -left-10 md:-top-20 md:-left-20 text-[140px] md:text-[180px] font-display text-stone-100 font-bold -z-10 select-none opacity-50">
              03
            </div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-stone-300"></div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">
                  The Reveal
                </span>
              </div>
              <h3 className="text-4xl md:text-5xl font-display mb-8 text-black uppercase tracking-wide leading-tight">
                See It
                <br />
                On You
              </h3>
              <div className="space-y-6">
                <p className="text-lg text-stone-600 font-light leading-relaxed">
                  No more imagination games. The sidebar slides open to reveal{' '}
                  <strong className="text-black font-medium">
                    you wearing the outfit
                  </strong>{' '}
                  instantly.
                </p>
                <p className="text-sm text-stone-500 leading-relaxed">
                  Check the length, the tightness, and the vibe. Make confident
                  decisions before you ever spend a rupee.
                </p>
                {/* Micro Interaction */}
                <div className="pt-2 flex items-center gap-4">
                  <div className="inline-flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded text-green-700">
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-[10px] font-bold tracking-wider uppercase">
                      Perfect Fit
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest border-b border-stone-300 cursor-pointer hover:text-black transition-colors">
                    View Analysis
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* VISUAL 03 */}
          <div className="bg-stone-50 h-[450px] rounded-2xl border border-stone-200 flex items-center justify-center relative shadow-inner">
            <div className="w-72 h-[380px] bg-white border border-stone-200 shadow-2xl rounded-lg flex flex-col overflow-hidden relative">
              <div className="h-12 border-b border-stone-100 flex items-center justify-between px-5 bg-stone-50 shrink-0">
                <span className="font-display text-xl tracking-wide">LYO.</span>
                <span className="text-stone-400 text-xl font-light">×</span>
              </div>
              <div className="flex-1 p-5 flex flex-col relative">
                <div className="flex-1 bg-stone-100 rounded-sm relative overflow-hidden flex items-center justify-center border border-stone-100">
                  <div className="absolute inset-0 flex items-center justify-center step3-loader z-20 bg-stone-50">
                    <div className="w-10 h-10 border-2 border-stone-200 border-t-brand-pink rounded-full animate-spin"></div>
                  </div>
                  <div className="absolute inset-0 step3-image z-10">
                    <img
                      src="/user-model.png"
                      className="w-full h-full object-cover"
                      alt="Result"
                    />
                    <div className="absolute top-3 left-3 bg-green-500 text-white px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.2em] rounded-sm shadow-sm">
                      Live Render
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-sm shadow-lg border border-stone-200 step3-badge z-30">
                    <div className="text-[9px] font-bold text-green-700 tracking-wider">
                      98% MATCH
                    </div>
                  </div>
                </div>
                <div className="mt-5 space-y-3">
                  <div className="h-2.5 w-3/4 bg-stone-800 rounded-full"></div>
                  <div className="h-2.5 w-1/2 bg-stone-300 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NEW CTA SECTION (CLEAN & DARK) */}
        <div className="mt-32 relative group">
          {/* Main Card */}
          <div className="bg-stone-900 rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden border border-stone-800 shadow-2xl">
            <div className="relative z-10 flex flex-col items-center">
              {/* Headline (Sentence Case) */}
              <h3 className="font-display text-5xl md:text-7xl text-white leading-tight mb-6">
                Never return an <br />
                <span className="italic text-stone-400">outfit again.</span>
              </h3>
              {/* Subtext */}
              <p className="text-stone-400 text-lg font-light max-w-xl mb-10 leading-relaxed">
                See exactly how that Myntra dress fits <em>your</em> body. No
                more guessing games, just confidence.
              </p>
              {/* CTA Block */}
              <div className="flex flex-col items-center gap-4 w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-white text-black px-12 py-5 rounded-sm text-xs font-bold tracking-[0.2em] hover:bg-brand-pink hover:text-white transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,63,108,0.6)] uppercase flex items-center justify-center gap-3">
                  Start free trial
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
                  14-Day Free Trial • Cancel Anytime
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
