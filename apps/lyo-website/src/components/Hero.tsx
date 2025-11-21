import { useState } from 'react';

export const Hero = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('bg-stone-400');

  const openPanel = () => {
    setIsPanelOpen(true);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
  };

  const changeColor = (colorClass: string) => {
    setSelectedColor(colorClass);
  };

  return (
    <section className="pt-32 pb-12 lg:pt-40 lg:pb-24 bg-stone-50 min-h-screen flex items-center">
      <div className="max-w-[1800px] mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT: Copywriting */}
          <div className="animate-slide-up pl-4 lg:pl-12">
            {/* Badge with Myntra Focus */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-stone-200 rounded-full text-[10px] font-bold tracking-[0.2em] text-stone-500 uppercase bg-white shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-pink animate-pulse"></span>
              Works on Myntra
            </div>

            {/* HIGH IMPACT HEADING with Tenor Sans */}
            <h1 className="font-display text-6xl lg:text-8xl leading-[1.1] text-black mb-8 uppercase">
              Stop Guessing.
              <br />
              <span className="text-stone-400">Start Wearing.</span>
            </h1>

            {/* Readable Description with Manrope */}
            <p className="text-xl text-stone-600 mb-12 max-w-xl leading-relaxed font-light">
              The virtual fitting room for your{' '}
              <strong className="text-stone-900 font-bold">Myntra</strong>{' '}
              addiction. Instantly see how that outfit looks on <i>your</i>
              body, not the model's. No returns, just perfect fits.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <button className="bg-black text-white px-12 py-5 text-xs font-bold tracking-[0.2em] hover:bg-stone-800 transition-all shadow-xl hover:-translate-y-1 duration-300 flex items-center gap-3 group uppercase">
                Add to Chrome
                <span className="group-hover:translate-x-1 transition-transform text-lg">
                  →
                </span>
              </button>

              {/* Social Proof */}
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-2 border-stone-50 bg-stone-200 bg-[url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100')] bg-cover"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-stone-50 bg-stone-300 bg-[url('https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100')] bg-cover"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-stone-50 bg-stone-400 bg-[url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100')] bg-cover"></div>
                </div>
                <div className="flex flex-col">
                  <div className="flex text-yellow-500 text-xs gap-0.5">
                    ★★★★★
                  </div>
                  <p className="text-[9px] text-stone-400 font-bold uppercase tracking-[0.2em] mt-1">
                    2,000+ Joined
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: The Interactive Browser */}
          <div className="relative animate-fade-in delay-100 perspective-1000">
            {/* Browser Mockup */}
            <div className="bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col h-[900px] transform transition-transform duration-500">
              {/* Browser Header */}
              <div className="bg-stone-50 border-b border-stone-200 px-5 py-4 flex items-center gap-3 shrink-0">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-stone-300"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-stone-300"></div>
                </div>
                <div className="flex-1 bg-white h-9 rounded border border-stone-200 text-[10px] flex items-center px-4 text-stone-500 font-bold overflow-hidden whitespace-nowrap tracking-widest font-sans">
                  <span
                    className="text-green-600 mr-2"
                    role="img"
                    aria-label="Secure"
                  >
                    🔒
                  </span>
                  MYNTRA.COM/WOMEN/TOPS
                </div>
              </div>

              {/* Viewport */}
              <div className="flex-1 flex relative overflow-hidden">
                {/* 1. STORE VIEW */}
                <div className="flex-1 flex bg-white relative z-0">
                  {/* Breadcrumbs */}
                  <div className="absolute top-6 left-8 text-[9px] text-stone-400 uppercase tracking-[0.2em] z-10 font-bold">
                    Home / Women / <span className="text-black">H&M</span>
                  </div>

                  {/* Store Image */}
                  <div className="w-[50%] relative overflow-hidden bg-stone-100 group">
                    <img
                      src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800"
                      className="w-full h-full object-cover"
                      alt="Store Model"
                    />
                  </div>

                  {/* Store Details */}
                  <div className="w-[50%] p-12 flex flex-col h-full relative justify-center">
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="mb-8">
                        <h3 className="font-display text-5xl text-stone-900 mb-2 uppercase tracking-wide">
                          H&M
                        </h3>
                        <p className="text-stone-500 text-sm font-medium uppercase tracking-widest">
                          Beige Sculpt Tube Top
                        </p>
                      </div>

                      <div className="flex items-center gap-3 mb-8">
                        <div className="flex items-center gap-1 border border-stone-200 px-3 py-1 rounded-[2px] text-xs font-bold text-stone-800">
                          4.4 <span className="text-green-600">★</span>
                        </div>
                        <span className="text-xs text-stone-400 font-bold uppercase tracking-wider">
                          1.2k Ratings
                        </span>
                      </div>

                      <div className="h-px bg-stone-100 w-full mb-8"></div>

                      <div className="mb-10">
                        <div className="flex items-baseline gap-4">
                          <span className="text-4xl font-display text-stone-900">
                            ₹1,499
                          </span>
                          <span className="text-base text-stone-400 line-through font-normal">
                            ₹2,999
                          </span>
                          <span className="text-[10px] text-orange-500 font-bold uppercase tracking-[0.2em]">
                            (50% OFF)
                          </span>
                        </div>
                        <p className="text-[9px] text-green-700 mt-2 font-bold uppercase tracking-[0.2em]">
                          inclusive of all taxes
                        </p>
                      </div>

                      <div className="mb-10">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-900">
                            Select Size
                          </span>
                          <span className="text-[10px] text-brand-pink font-bold cursor-pointer tracking-[0.2em] uppercase">
                            Size Chart &gt;
                          </span>
                        </div>
                        <div className="flex gap-4">
                          <button className="w-12 h-12 rounded-full border border-stone-300 text-xs font-bold text-stone-500 hover:border-brand-pink hover:text-brand-pink transition-colors">
                            S
                          </button>
                          <button className="w-12 h-12 rounded-full border border-brand-pink text-xs font-bold text-black bg-white transition-colors">
                            M
                          </button>
                          <button className="w-12 h-12 rounded-full border border-stone-300 text-xs font-bold text-stone-500 hover:border-brand-pink hover:text-brand-pink transition-colors">
                            L
                          </button>
                          <button className="w-12 h-12 rounded-full border border-stone-300 text-xs font-bold text-stone-500 hover:border-brand-pink hover:text-brand-pink transition-colors">
                            XL
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Actions Area */}
                    <div className="flex flex-col gap-4 mt-auto">
                      {/* Injected Button */}
                      <button
                        onClick={openPanel}
                        className={`w-full relative overflow-hidden bg-yellow-400 text-black px-6 py-5 rounded-[2px] shadow-md text-xs font-bold uppercase tracking-[0.2em] hover:bg-yellow-300 transition-all flex items-center justify-center gap-3 group mb-2 ring-2 ring-yellow-100 duration-300 ${
                          isPanelOpen
                            ? 'opacity-50 pointer-events-none grayscale'
                            : ''
                        }`}
                      >
                        <span className="bg-black text-white px-2 py-0.5 text-[9px] rounded-sm font-bold">
                          LYO
                        </span>
                        <span className="relative z-10 flex items-center gap-2">
                          Try On Now
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
                            />
                          </svg>
                        </span>
                      </button>

                      {/* Myntra Style Buttons */}
                      <div className="flex gap-3">
                        <button className="flex-1 bg-brand-pink text-white px-6 py-5 rounded-[2px] text-xs font-bold uppercase tracking-[0.2em] hover:bg-rose-600 transition-colors flex items-center justify-center gap-2">
                          <svg
                            className="w-4 h-4"
                            fill="white"
                            viewBox="0 0 24 24"
                          >
                            <path d="M16 6v2h2l2 12H0L2 8h2V6a6 6 0 1112 0zm-2 0a4 4 0 10-8 0v2h8V6z" />
                          </svg>
                          Add to Bag
                        </button>
                        <button className="w-20 border border-stone-300 rounded flex items-center justify-center text-stone-400 hover:border-stone-800 hover:text-stone-800">
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. LYO SIDE PANEL */}
                <div
                  className={`absolute top-0 right-0 w-[360px] md:w-[420px] h-full bg-white border-l border-stone-200 shadow-[-20px_0_40px_rgba(0,0,0,0.15)] panel-transition z-20 flex flex-col ${
                    isPanelOpen ? 'panel-open' : 'panel-closed'
                  }`}
                >
                  {/* Header */}
                  <div className="h-16 border-b border-stone-100 flex items-center justify-between px-8 shrink-0 bg-stone-50">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-2xl tracking-wide">
                        LYO.
                      </span>
                      <span className="text-[9px] bg-black text-white px-2 py-1 rounded-full font-bold tracking-widest">
                        BETA
                      </span>
                    </div>
                    <button
                      onClick={closePanel}
                      className="text-stone-400 hover:text-black text-2xl px-2"
                    >
                      ×
                    </button>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col p-8 bg-white overflow-hidden">
                    {/* Image */}
                    <div className="flex-1 relative bg-stone-100 rounded shadow-sm overflow-hidden mb-6 group border border-stone-200">
                      <img
                        src="/public/user-model.png"
                        className="absolute inset-0 w-full h-full object-cover"
                        alt="User Base"
                      />
                      <div
                        className={`absolute inset-0 color-layer ${selectedColor} opacity-30 pointer-events-none`}
                      ></div>
                      <div className="absolute top-4 left-4 bg-green-500/90 backdrop-blur text-white px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] rounded-sm shadow-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                        Live Render
                      </div>
                      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-2 rounded border border-stone-200 shadow-sm">
                        <div className="text-[10px] font-bold text-green-600 tracking-widest">
                          94% MATCH
                        </div>
                      </div>
                    </div>

                    {/* Product Info & Controls */}
                    <div className="shrink-0 space-y-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-display text-stone-900 text-2xl tracking-wide uppercase">
                            H&M
                          </h4>
                          <p className="text-stone-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
                            Sculpt Tube Top
                          </p>
                        </div>
                        <span className="font-display text-2xl">₹1,499</span>
                      </div>

                      <div className="flex justify-between items-end">
                        {/* Size */}
                        <div>
                          <span className="text-[9px] font-bold text-stone-400 uppercase tracking-[0.2em] block mb-2">
                            Size
                          </span>
                          <div className="flex gap-2">
                            <button className="w-10 h-10 rounded-full border border-stone-200 text-xs font-bold text-stone-400 hover:border-black hover:text-black transition-colors">
                              S
                            </button>
                            <button className="w-10 h-10 rounded-full border border-black bg-black text-white text-xs font-bold shadow-md">
                              M
                            </button>
                            <button className="w-10 h-10 rounded-full border border-stone-200 text-xs font-bold text-stone-400 hover:border-black hover:text-black transition-colors">
                              L
                            </button>
                          </div>
                        </div>

                        {/* Color */}
                        <div>
                          <span className="text-[9px] font-bold text-stone-400 uppercase tracking-[0.2em] block mb-2 text-right">
                            Color
                          </span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => changeColor('bg-stone-400')}
                              className="w-8 h-8 rounded-full bg-[#d6d3cd] shadow-sm ring-1 ring-stone-200 ring-offset-2 hover:scale-110 transition-transform"
                            ></button>
                            <button
                              onClick={() => changeColor('bg-stone-900')}
                              className="w-8 h-8 rounded-full bg-stone-900 shadow-sm ring-1 ring-stone-200 ring-offset-2 hover:scale-110 transition-transform"
                            ></button>
                            <button
                              onClick={() => changeColor('bg-rose-900')}
                              className="w-8 h-8 rounded-full bg-rose-900 shadow-sm ring-1 ring-stone-200 ring-offset-2 hover:scale-110 transition-transform"
                            ></button>
                            <button
                              onClick={() => changeColor('bg-blue-900')}
                              className="w-8 h-8 rounded-full bg-blue-900 shadow-sm ring-1 ring-stone-200 ring-offset-2 hover:scale-110 transition-transform"
                            ></button>
                          </div>
                        </div>
                      </div>

                      <div className="bg-stone-50 p-5 rounded border border-stone-200">
                        <p className="text-xs leading-relaxed text-stone-600 font-medium">
                          <span className="font-bold text-black uppercase tracking-widest text-[9px] mr-1">
                            Fit Check:
                          </span>
                          Fitted bodice with structured support. 4-way stretch
                          fabric.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border-t border-stone-100 bg-white shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                    <button className="w-full py-4 bg-brand-pink text-white text-xs font-bold tracking-[0.25em] uppercase hover:bg-rose-600 transition-all shadow-lg hover:shadow-rose-200 flex justify-between px-8">
                      <span>Add to Bag</span>
                      <span>₹1,499</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
