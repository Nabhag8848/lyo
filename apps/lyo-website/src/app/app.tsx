import { Routes, Route } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { Pricing } from '@/components/Pricing';
import { Footer } from '@/components/Footer';
import { OGPreview } from '@/components/OGPreview';

const Home = () => (
  <>
    <SEO />
    <Navbar />
    <Hero />
    <HowItWorks />
    <Pricing />
    <Footer />
  </>
);

const OGPage = () => (
  <div className="min-h-screen bg-stone-50 flex items-center justify-center p-8">
    <OGPreview />
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
