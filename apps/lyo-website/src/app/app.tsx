import { Routes, Route } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { Pricing } from '@/components/Pricing';
import { Footer } from '@/components/Footer';

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

const App = () => {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
