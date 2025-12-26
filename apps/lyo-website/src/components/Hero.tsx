import { InteractiveBrowser } from './InteractiveBrowser';
import { Heading } from './Heading';

export const Hero = () => {
  return (
    <section className="pt-14 md:pt-16 pb-3 sm:pb-4 md:pb-5 lg:pb-5 xl:pb-6 bg-stone-50 min-h-screen flex items-center overflow-y-auto">
      <div className="mx-auto px-4 md:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-5 xl:gap-8 items-center">
          {/* LEFT: Copywriting */}
          <Heading />
          {/* RIGHT: The Interactive Browser */}
          <InteractiveBrowser />
        </div>
      </div>
    </section>
  );
};
