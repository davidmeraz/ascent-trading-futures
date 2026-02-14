import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarketTicker from './components/MarketTicker';
import Features from './components/Features';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Navbar />
      <Hero />
      <MarketTicker />
      <Features />
      <Footer />
    </div>
  );
}

export default App;
