import { InteractiveBrowser } from './InteractiveBrowser';

export const Hero = () => {
  return (
    <section className="pt-14 md:pt-16 pb-3 sm:pb-4 md:pb-5 lg:pb-5 xl:pb-6 bg-stone-50 min-h-screen flex items-center overflow-y-auto">
      <div className="mx-auto px-4 md:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-5 xl:gap-8 items-center">
          {/* LEFT: Copywriting */}
          <div className="animate-slide-up pl-4 lg:pl-4 xl:pl-12">
            {/* Badge with Myntra Focus */}
            <div className="inline-flex items-center gap-1 md:gap-1.5 px-2.5 sm:px-3 md:px-4 py-0.5 sm:py-1 md:py-1.5 mb-3 sm:mb-4 lg:mb-4 xl:mb-6 border border-stone-200 rounded-full text-[0.45rem] sm:text-[0.5rem] md:text-[0.55rem] lg:text-[0.55rem] xl:text-[0.625rem] font-bold tracking-[0.2em] text-stone-500 uppercase bg-white shadow-sm">
              <span className="w-0.5 h-0.5 md:w-1 md:h-1 rounded-full bg-brand-pink animate-pulse"></span>
              Works on Myntra
            </div>

            {/* HIGH IMPACT HEADING with Tenor Sans */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-7xl 2xl:text-8xl leading-[1.1] text-black mb-3 sm:mb-4 lg:mb-4 xl:mb-6 uppercase">
              Stop Guessing.
              <br />
              <span className="text-stone-400">Start Wearing.</span>
            </h1>

            {/* Readable Description with Manrope */}
            <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl text-stone-600 mb-4 sm:mb-5 md:mb-6 lg:mb-5 xl:mb-8 max-w-xl leading-relaxed font-light">
              The virtual fitting room for your{' '}
              <strong className="text-stone-900 font-bold">Myntra</strong>{' '}
              addiction. Instantly see how that outfit looks on <i>your</i>
              body, not the model's. No returns, just perfect fits.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 lg:gap-4 xl:gap-6">
              <button className="bg-black text-white px-6 md:px-8 lg:px-8 xl:px-12 py-3 md:py-3.5 lg:py-3.5 xl:py-5 text-[0.55rem] md:text-[0.625rem] lg:text-[0.625rem] xl:text-xs font-bold tracking-[0.2em] hover:bg-stone-800 transition-all shadow-xl hover:-translate-y-1 duration-300 flex items-center gap-2 md:gap-2.5 group uppercase">
                Add to Chrome
                <span className="group-hover:translate-x-1 transition-transform text-sm md:text-base lg:text-base xl:text-lg">
                  →
                </span>
              </button>

              {/* Social Proof */}
              <div className="flex items-center gap-3 md:gap-4">
                <div className="flex -space-x-2 md:-space-x-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-stone-50 bg-stone-200 bg-[url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100')] bg-cover"></div>
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-stone-50 bg-stone-300 bg-[url('https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100')] bg-cover"></div>
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-stone-50 bg-stone-400 bg-[url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100')] bg-cover"></div>
                </div>
                <div className="flex flex-col">
                  <div className="flex text-yellow-500 text-[0.625rem] md:text-xs gap-0.5">
                    ★★★★★
                  </div>
                  <p className="text-[0.5rem] md:text-[0.55rem] text-stone-400 font-bold uppercase tracking-[0.2em] mt-0.5 md:mt-1">
                    2,000+ Joined
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: The Interactive Browser */}
          <InteractiveBrowser />
        </div>
      </div>
    </section>
  );
};
