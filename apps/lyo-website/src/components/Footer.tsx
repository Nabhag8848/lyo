export const Footer = () => {
  return (
    <footer className="bg-white border-t border-stone-200 pt-24 pb-12 overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto px-6 grid md:grid-cols-4 gap-16 mb-1">
        <div className="space-y-8 md:col-span-1">
          <span className="font-display text-4xl tracking-wide font-normal text-black">
            LYO.
          </span>
          <p className="text-stone-500 text-sm leading-relaxed font-medium">
            See how clothes look on you before you buy. Your virtual fitting
            room for Myntra shopping.
          </p>
          <div className="flex flex-col gap-4">
            <button
              onClick={() =>
                window.open(
                  'https://chromewebstore.google.com/detail/lyo/galgnmbbkfbmhggdmdjkjloakoilobjn',
                  '_blank',
                  'noopener,noreferrer'
                )
              }
              className="bg-black text-white px-6 py-3 rounded-[2px] text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              Add to Browser
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
            </button>
            <div className="flex gap-4 pt-2">
              <a
                href="https://x.com/lyo_fashion"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-600 hover:bg-black hover:text-white transition-all duration-300"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/lyo_fashion_"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-600 hover:bg-black hover:text-white transition-all duration-300"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="hidden md:flex md:col-span-1 md:pl-12 flex-col items-start lg:items-center">
          <h4 className="font-bold text-[11px] uppercase tracking-[0.2em] mb-8 text-black lg:text-center">
            Product
          </h4>
          <ul className="space-y-5 text-xs text-stone-600 font-medium uppercase tracking-wider lg:text-center">
            <li>
              <a href="#hero" className="hover:text-black transition-colors">
                Home
              </a>
            </li>
            <li>
              <a
                href="#how-it-works"
                className="hover:text-black transition-colors"
              >
                How It Works
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-black transition-colors">
                Pricing
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2 flex items-end overflow-hidden">
          <div className="relative w-full max-h-[160px] sm:max-h-[180px] md:max-h-[200px] lg:max-h-[220px] rounded-lg overflow-hidden flex items-end justify-center">
            <div className="flex items-end justify-center gap-0 -space-x-1 sm:-space-x-2 md:-space-x-3 lg:-space-x-4 xl:-space-x-5 w-full min-w-0">
              {[
                '/website/model-1-removebg-preview.png',
                '/website/model-5-removebg-preview.png',
                '/website/model-7-removebg-preview.png',
                '/website/model-4-removebg-preview.png',
                '/website/model-6-removebg-preview.png',
                '/website/model-2-removebg-preview.png',
                '/website/model-3-removebg-preview.png',
                '/website/model-8-removebg-preview.png',
              ].map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Avatar ${index + 1}`}
                  className={`h-full max-h-[160px] sm:max-h-[180px] md:max-h-[200px] lg:max-h-[220px] w-auto object-contain shrink min-w-0 ${
                    index >= 5 ? 'hidden sm:block' : ''
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-stone-200 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 px-6 max-w-[1400px] mx-auto">
        <div className="text-[10px] text-stone-500 uppercase tracking-wider font-bold">
          © 2026 LYO.
        </div>
        <div className="flex gap-8 text-[10px] text-stone-500 uppercase tracking-wider font-bold">
          <a href="/privacy" className="hover:text-black transition-colors">
            Privacy Policy
          </a>
          <a
            href="mailto:nabhag@lyo.fashion"
            className="hover:text-black transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};
