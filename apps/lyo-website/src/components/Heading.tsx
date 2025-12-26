export const Heading = () => {
  return (
    <div className="animate-slide-up pl-4 lg:pl-4 xl:pl-12 mb-2">
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
      <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl text-stone-600 mb-4 sm:mb-5 md:mb-6 lg:mb-5 xl:mb-8 max-w-xl md:max-w-md xl:max-w-160 leading-relaxed font-light">
        <span className="font-semibold text-stone-800">
          Virtual Fitting Room
        </span>{' '}
        for your{' '}
        <span className="relative font-bold text-brand-pink">
          Myntra
          <svg
            className="absolute left-0 -bottom-1 w-full h-2"
            viewBox="0 0 50 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            style={{ pointerEvents: 'none' }}
          >
            <path
              d="M1 7 Q12 1 25 6 Q38 11 49 3"
              stroke="#FC2F80"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </span>{' '}
        shopping — instantly see how that outfit looks on you. Upload your photo
        once & start wearing.
      </p>

      <button className="bg-black text-white px-6 md:px-8 lg:px-8 xl:px-12 py-3 md:py-3.5 lg:py-3.5 xl:py-5 text-[0.55rem] md:text-[0.625rem] lg:text-[0.625rem] xl:text-xs font-bold tracking-[0.2em] hover:bg-stone-800 transition-all shadow-xl hover:-translate-y-1 duration-300 flex items-center gap-2 md:gap-2.5 group uppercase">
        Add to Browser
        <span className="group-hover:translate-x-1 transition-transform text-sm md:text-base lg:text-base xl:text-lg">
          →
        </span>
      </button>
    </div>
  );
};
