import { ClosingCTA } from './ClosingCTA';

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
              3 SIMPLE STEPS
            </span>
          </div>
          <h2 className="font-display text-6xl md:text-7xl text-black tracking-wide uppercase">
            YOUR PERFECT FIT AWAITS
          </h2>
          <p className="text-stone-600 text-base md:text-lg font-light leading-relaxed">
            Get started by uploading your photo once and start wearing.
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
                  STEP 01
                </span>
              </div>
              <h3 className="text-4xl md:text-5xl font-display mb-8 text-black uppercase tracking-wide leading-tight">
                Create Your Avatar
              </h3>
              <div className="space-y-6 max-w-xl">
                <p className="text-lg md:text-xl text-stone-600 font-light leading-relaxed">
                  Upload a{' '}
                  <strong className="text-black font-medium">
                    full-body photo
                  </strong>{' '}
                  and we'll generate multiple avatars.
                </p>
                <p className="text-base md:text-lg text-stone-500 leading-relaxed border-l-2 border-brand-pink/30 pl-4">
                  Each avatar is a virtual version of you in different poses.
                  Choose the one that matches your likeness.
                </p>
              </div>
            </div>
          </div>

          {/* VISUAL 01 */}
          <div className="bg-stone-50 h-[450px] rounded-2xl border border-stone-200 flex items-center justify-center relative overflow-hidden shadow-inner">
            <div className="w-72 h-[380px] bg-white border border-stone-200 shadow-2xl rounded-lg flex flex-col overflow-hidden relative">
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
                  <div className="absolute inset-0 s1-photo flex items-center justify-center">
                    <img
                      src="/website/model.png"
                      className="w-full h-full object-contain opacity-80"
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
                      src="/website/new.png"
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
                  STEP 02
                </span>
              </div>
              <h3 className="text-4xl md:text-5xl font-display mb-8 text-black uppercase tracking-wide leading-tight">
                Try On Clothes
              </h3>
              <div className="space-y-6 max-w-xl">
                <p className="text-lg md:text-xl text-stone-600 font-light leading-relaxed">
                  Browse{' '}
                  <strong className="text-black font-medium">Myntra</strong> and
                  when you find clothes you like, use try on to see how they
                  look on you.
                </p>
                <p className="text-base md:text-lg text-stone-500 leading-relaxed border-l-2 border-brand-pink/30 pl-4">
                  The clothes appear on your selected avatar, so you can see
                  exactly how they look on you before you buy.
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
                  STEP 03
                </span>
              </div>
              <h3 className="text-4xl md:text-5xl font-display mb-8 text-black uppercase tracking-wide leading-tight">
                Your Virtual Wardrobe
              </h3>
              <div className="space-y-6 max-w-xl">
                <p className="text-lg md:text-xl text-stone-600 font-light leading-relaxed">
                  In a few seconds, you can see the clothes on you in your{' '}
                  <strong className="text-black font-medium">wardrobe </strong>
                  while you browse through all your favorites before you buy.
                </p>
                <p className="text-base md:text-lg text-stone-500 leading-relaxed border-l-2 border-brand-pink/30 pl-4">
                  Your style journey starts here.
                </p>
              </div>
            </div>
          </div>

          {/* VISUAL 03 */}
          <div className="bg-stone-50 h-[450px] rounded-2xl border border-stone-200 flex items-center justify-center relative shadow-inner">
            <div className="w-72 h-[380px] bg-white border border-stone-200 shadow-2xl rounded-lg flex flex-col overflow-hidden relative">
              <div className="flex-1 p-5 flex flex-col relative">
                <div className="flex-1 rounded-sm relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center step3-loader z-20 bg-stone-50">
                    <div className="w-10 h-10 border-2 border-stone-200 border-t-brand-pink rounded-full animate-spin"></div>
                  </div>
                  <div className="absolute inset-0 step3-image z-10 flex items-center justify-center">
                    <img
                      src="/website/model-1-removebg-preview.png"
                      className="w-full h-full object-contain"
                      alt="Result"
                    />
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
        <ClosingCTA />
      </div>
    </section>
  );
};
