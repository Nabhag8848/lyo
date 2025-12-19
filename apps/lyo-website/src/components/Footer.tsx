export const Footer = () => {
  return (
    <footer className="bg-white border-t border-stone-200 pt-24 pb-12">
      <div className="max-w-[1600px] mx-auto px-6 grid md:grid-cols-4 gap-16 mb-20">
        <div className="space-y-8 md:col-span-1">
          <span className="font-display text-4xl tracking-wide font-normal text-black">
            LYO.
          </span>
          <p className="text-stone-500 text-sm leading-relaxed font-medium">
            The world's most accurate virtual fitting room technology. We bridge
            the gap between digital browsing and physical reality.
          </p>
          <div className="flex gap-4 pt-2">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-600 hover:bg-black hover:text-white transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-600 hover:bg-black hover:text-white transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="md:col-span-1 md:pl-12">
          <h4 className="font-bold text-[11px] uppercase tracking-[0.2em] mb-8 text-black">
            Product
          </h4>
          <ul className="space-y-5 text-xs text-stone-600 font-medium uppercase tracking-wider">
            <li>
              <a
                href="/download"
                className="hover:text-black transition-colors"
              >
                Download
              </a>
            </li>
            <li>
              <a
                href="#how-it-works"
                className="hover:text-black transition-colors"
              >
                How it Works
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-black transition-colors">
                Pricing
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-1">
          <h4 className="font-bold text-[11px] uppercase tracking-[0.2em] mb-8 text-black">
            Support
          </h4>
          <ul className="space-y-5 text-xs text-stone-600 font-medium uppercase tracking-wider">
            <li>
              <a href="/help" className="hover:text-black transition-colors">
                Help Center
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-black transition-colors">
                Privacy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-black transition-colors">
                Terms
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-1">
          <h4 className="font-bold text-[11px] uppercase tracking-[0.2em] mb-8 text-black">
            Stay in Style
          </h4>
          <p className="text-xs text-stone-500 mb-6 leading-relaxed font-medium">
            Get the latest updates on features and fashion tech directly to your
            inbox.
          </p>
          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="ENTER YOUR EMAIL"
              className="bg-stone-50 border border-stone-200 px-4 py-3.5 rounded-[2px] text-xs w-full focus:outline-none focus:border-black tracking-wider placeholder:text-stone-400 font-medium"
            />
            <button className="bg-black text-white px-4 py-3.5 rounded-[2px] text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-stone-800 transition-colors w-full">
              JOIN THE LIST
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-stone-200 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 px-6 max-w-[1600px] mx-auto">
        <div className="text-[10px] text-stone-500 uppercase tracking-wider font-bold">
          © 2025 LYO Technologies.
        </div>
        <div className="flex gap-8 text-[10px] text-stone-500 uppercase tracking-wider font-bold">
          <a href="/privacy" className="hover:text-black transition-colors">
            Privacy
          </a>
          <a href="/terms" className="hover:text-black transition-colors">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
};
