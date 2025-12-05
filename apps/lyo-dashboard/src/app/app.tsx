export function App() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-stone-100">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-1 cursor-pointer group">
            <span className="font-display text-3xl tracking-wide font-normal group-hover:text-stone-600 transition-colors">
              LYO.
            </span>
          </a>
          <button className="text-[10px] font-bold tracking-[0.2em] text-stone-500 hover:text-black transition-colors uppercase">
            Sign Out
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border border-stone-200 rounded-full text-[10px] font-bold tracking-[0.2em] text-stone-500 uppercase bg-white shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Account Active
            </div>
            <h1 className="font-display text-5xl lg:text-6xl leading-[1.1] text-black mb-4 uppercase">
              Welcome back,
              <br />
              <span className="text-stone-400">{'User'}</span>
            </h1>
            <p className="text-lg text-stone-500 font-light">
              Manage your LYO experience and preferences.
            </p>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden mb-8">
            <div className="p-8 border-b border-stone-100">
              <h2 className="text-[11px] font-bold tracking-[0.2em] text-stone-400 uppercase mb-6">
                Profile
              </h2>
              <div className="flex items-center gap-6">
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
