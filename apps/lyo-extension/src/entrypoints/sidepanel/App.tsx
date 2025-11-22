function App() {
  return (
    <div className="flex flex-col h-screen bg-stone-50">
      {/* Header */}
      <div className="h-16 border-b border-stone-200 flex items-center justify-between px-8 shrink-0 bg-white">
        <div className="flex items-center gap-2">
          <span className="font-display text-2xl tracking-wide text-black">
            LYO.
          </span>
          <span className="text-[9px] bg-black text-white px-2 py-1 rounded-full font-bold tracking-widest">
            BETA
          </span>
        </div>
        <button
          onClick={() => {
            window.close();
          }}
          className="text-stone-400 hover:text-black text-2xl px-2 transition-colors"
        >
          ×
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <h1 className="font-display text-4xl text-stone-900 tracking-wide uppercase">
          LYO Sidepanel
        </h1>
      </div>
    </div>
  );
}

export default App;
