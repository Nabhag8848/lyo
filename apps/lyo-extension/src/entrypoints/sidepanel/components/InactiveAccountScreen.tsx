export const InactiveAccountScreen = () => {
  return (
    <div className="h-screen bg-stone-50 flex items-center justify-center p-6">
      <div className="text-center px-6 max-w-md">
        <h1 className="font-display text-2xl tracking-wide font-normal text-black mb-4">
          Coming Soon
        </h1>
        <p className="text-stone-600 text-md leading-relaxed">
          We're working hard to bring you the best experience possible, for
          early access reachout at{' '}
          <a
            href="mailto:nabhag@lyo.fashion"
            className="text-brand-pink hover:underline"
          >
            nabhag@lyo.fashion
          </a>
        </p>
      </div>
    </div>
  );
}
