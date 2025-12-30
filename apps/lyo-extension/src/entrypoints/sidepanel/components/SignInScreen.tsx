export function SignInScreen() {
  const handleSignIn = () => {
    browser.tabs.create({ url: 'https://lyo.fashion' });
  };

  return (
    <div className="flex flex-col h-screen bg-stone-50 items-center justify-center p-6">
      <div className="flex flex-col items-center gap-8 max-w-sm w-full">
        {/* Logo/Brand */}
        <div className="flex flex-col items-center gap-4">
          <span className="font-display text-4xl tracking-wide font-normal text-black">
            LYO.
          </span>
        </div>

        {/* Message */}
        <div className="text-center space-y-3">
          <h2 className="text-lg font-semibold text-stone-900">
            Welcome to Lyo
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed font-light max-w-md">
            Sign in to try on clothes and discover your perfect style
          </p>
        </div>

        {/* Sign In Button */}
        <button
          onClick={handleSignIn}
          className="w-full bg-black text-white px-6 py-3.5 text-[0.625rem] font-bold tracking-[0.2em] hover:bg-stone-800 transition-all shadow-xl hover:-translate-y-1 duration-300 flex items-center justify-center gap-2.5 group uppercase"
        >
          <span>Sign In</span>
          <span className="group-hover:translate-x-1 transition-transform text-base">
            →
          </span>
        </button>

        {/* Footer */}
        <p className="text-[0.625rem] text-stone-400 text-center mt-2 font-light">
          You'll be redirected to lyo.fashion to sign in
        </p>
      </div>
    </div>
  );
}
