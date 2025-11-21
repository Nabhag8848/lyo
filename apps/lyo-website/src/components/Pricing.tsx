export const Pricing = () => {
  return (
    <section
      id="pricing"
      className="py-32 bg-stone-50 border-t border-stone-200"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-block border border-stone-200 rounded-full px-4 py-2 mb-6 bg-white shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-500">
              Membership
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl mb-6 text-black tracking-wide uppercase">
            Shop Your Way
          </h2>
          <p className="text-stone-600 text-xl font-light">
            Simple, transparent pricing for every kind of shopper. Upgrade
            anytime.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Plan 1 */}
          <div className="bg-white p-10 rounded-2xl border border-stone-200 flex flex-col hover:shadow-xl transition-all duration-300 relative overflow-hidden group hover:-translate-y-2">
            <div className="mb-8">
              <span className="bg-stone-100 text-stone-500 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">
                Window Shopper
              </span>
            </div>
            <h3 className="font-display text-6xl mb-2">Free</h3>
            <p className="text-stone-400 text-sm mb-10 font-bold uppercase tracking-wider">
              Try before you buy.
            </p>
            <div className="text-4xl font-bold mb-10 text-stone-900">
              $0
              <span className="text-sm text-stone-400 font-bold ml-1 uppercase tracking-wider">
                /forever
              </span>
            </div>
            <ul className="space-y-5 mb-12 flex-1">
              <li className="flex items-center gap-4 text-sm text-stone-700 font-bold">
                <div className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center shrink-0 text-black">
                  ✓
                </div>
                3 Try-ons per day
              </li>
              <li className="flex items-center gap-4 text-sm text-stone-600 font-medium">
                <div className="w-5 h-5 rounded-full bg-stone-50 flex items-center justify-center shrink-0 text-stone-300">
                  ✓
                </div>
                Standard Render Speed
              </li>
              <li className="flex items-center gap-4 text-sm text-stone-600 font-medium">
                <div className="w-5 h-5 rounded-full bg-stone-50 flex items-center justify-center shrink-0 text-stone-300">
                  ✓
                </div>
                Works on Myntra & AJIO
              </li>
            </ul>
            <button className="w-full py-5 border border-stone-200 rounded text-xs font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white hover:border-black transition-colors">
              Add to Chrome
            </button>
          </div>

          {/* Plan 2 */}
          <div className="bg-stone-900 text-white p-10 rounded-2xl shadow-2xl flex flex-col relative transform md:-translate-y-6 overflow-hidden border border-stone-800">
            <div className="absolute top-0 right-0 bg-brand-pink text-white text-[10px] font-bold px-4 py-2 rounded-bl-xl uppercase tracking-[0.2em]">
              Best Value
            </div>
            <div className="mb-8">
              <span className="bg-stone-800 text-stone-300 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">
                Fashionista
              </span>
            </div>
            <h3 className="font-display text-6xl mb-2">
              $4.99
              <span className="text-xl font-light text-stone-500 ml-1">
                /mo
              </span>
            </h3>
            <p className="text-stone-400 text-sm mb-10 font-bold uppercase tracking-wider">
              For the Myntra addict.
            </p>
            <ul className="space-y-5 mb-12 flex-1">
              <li className="flex items-center gap-4 text-sm text-white font-bold">
                <div className="w-5 h-5 rounded-full bg-brand-pink flex items-center justify-center shrink-0 text-white text-[10px]">
                  ✓
                </div>
                50 Try-ons per day
              </li>
              <li className="flex items-center gap-4 text-sm text-stone-300 font-medium">
                <div className="w-5 h-5 rounded-full bg-stone-800 flex items-center justify-center shrink-0 text-stone-500 text-[10px]">
                  ✓
                </div>
                Fast "Priority" Rendering
              </li>
              <li className="flex items-center gap-4 text-sm text-stone-300 font-medium">
                <div className="w-5 h-5 rounded-full bg-stone-800 flex items-center justify-center shrink-0 text-stone-500 text-[10px]">
                  ✓
                </div>
                Save Outfits to Closet
              </li>
              <li className="flex items-center gap-4 text-sm text-stone-300 font-medium">
                <div className="w-5 h-5 rounded-full bg-stone-800 flex items-center justify-center shrink-0 text-stone-500 text-[10px]">
                  ✓
                </div>
                Compare 2 Items Side-by-Side
              </li>
            </ul>
            <button className="w-full py-5 bg-white text-black rounded text-xs font-bold uppercase tracking-[0.2em] hover:bg-stone-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Unlock Closet
            </button>
          </div>

          {/* Plan 3 */}
          <div className="bg-white p-10 rounded-2xl border border-stone-200 flex flex-col hover:shadow-xl transition-all duration-300 relative overflow-hidden group hover:-translate-y-2">
            <div className="mb-8">
              <span className="bg-stone-100 text-stone-500 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">
                Style Icon
              </span>
            </div>
            <h3 className="font-display text-6xl mb-2">
              $9.99
              <span className="text-xl font-light text-stone-400 ml-1">
                /mo
              </span>
            </h3>
            <p className="text-stone-400 text-sm mb-10 font-bold uppercase tracking-wider">
              No boundaries.
            </p>
            <ul className="space-y-5 mb-12 flex-1">
              <li className="flex items-center gap-4 text-sm text-stone-700 font-bold">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 text-green-600 text-[10px]">
                  ✓
                </div>
                Unlimited Try-ons
              </li>
              <li className="flex items-center gap-4 text-sm text-stone-600 font-medium">
                <div className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center shrink-0 text-stone-400 text-[10px]">
                  ✓
                </div>
                4K Ultra-High Res
              </li>
              <li className="flex items-center gap-4 text-sm text-stone-600 font-medium">
                <div className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center shrink-0 text-stone-400 text-[10px]">
                  ✓
                </div>
                Multiple Body Profiles
              </li>
              <li className="flex items-center gap-4 text-sm text-stone-600 font-medium">
                <div className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center shrink-0 text-stone-400 text-[10px]">
                  ✓
                </div>
                Early Access Features
              </li>
            </ul>
            <button className="w-full py-5 border border-stone-200 rounded text-xs font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white hover:border-black transition-colors">
              Go Unlimited
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
