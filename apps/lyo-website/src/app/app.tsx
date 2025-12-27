import { Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { Pricing } from '@/components/Pricing';
import { Footer } from '@/components/Footer';
import { OGPreview } from '@/components/OGPreview';

const Home = () => (
  <>
    <Navbar />
    <Hero />
    <HowItWorks />
    <Pricing />
    <Footer />
  </>
);

const OGPage = () => (
  <div className="min-h-screen bg-stone-50 flex items-center justify-center p-8 relative">
    <OGPreview />
    {/* LYO Logo in bottom right of screen */}
    <div className="fixed bottom-8 right-8 z-10">
      <span className="font-display text-4xl tracking-wide font-normal text-black">
        LYO.
      </span>
    </div>
  </div>
);

const App = () => {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/og" element={<OGPage />} />
      </Routes>
    </div>
  );
};

export default App;
