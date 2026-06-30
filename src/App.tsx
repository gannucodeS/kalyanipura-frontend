import { useState, useEffect } from "react";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScriptureBanner from './components/ScriptureBanner';
import ServiceTimes from './components/ServiceTimes';
import Gallery from './components/Gallery';
import Ministries from './components/Ministries';
import Events from './components/Events';
import GivingBanner from './components/GivingBanner';
import Footer from './components/Footer';
import WatchOnlineModal from './components/WatchOnlineModal';
import GivingModal from './components/GivingModal';
import PrayerRequestModal from './components/PrayerRequestModal';
import ContactModal from './components/ContactModal';
import curtainImg from './assets/kalyanipura curtain.png';

export default function App() {
  const [isWatchOpen, setIsWatchOpen] = useState(false);
  const [isGivingOpen, setIsGivingOpen] = useState(false);
  const [isPrayerOpen, setIsPrayerOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [curtainPhase, setCurtainPhase] = useState<'loading' | 'opening' | 'lifted'>('loading');

  useEffect(() => {
    const openTimer = setTimeout(() => setCurtainPhase('opening'), 2200);
    const liftTimer = setTimeout(() => setCurtainPhase('lifted'), 3200);
    return () => { clearTimeout(openTimer); clearTimeout(liftTimer); };
  }, []);

  return (
    <>
      {/* ─── Curtain Intro ─── */}
      <div className={`curtain-overlay ${curtainPhase === 'opening' ? 'opening' : ''} ${curtainPhase === 'lifted' ? 'lifted' : ''}`}>
        {/* Left panel */}
        <div className="curtain-left" />
        {/* Right panel */}
        <div className="curtain-right" />

        {/* Center content — loading bar + image */}
        <div className="curtain-center">
          <svg className="curtain-loader" viewBox="0 0 300 300">
            <circle className="curtain-loader-track" cx="150" cy="150" r="140" />
            <circle className="curtain-loader-ring" cx="150" cy="150" r="140" />
          </svg>
          <img
            src={curtainImg}
            alt="Kalyanipura Church"
            className="curtain-logo w-48 sm:w-64 h-auto object-contain"
          />
        </div>
      </div>

      <div className="min-h-screen bg-[var(--color-warm-white)] flex flex-col font-sans">
        <Navbar
          onOpenGiving={() => setIsGivingOpen(true)}
          onOpenPrayer={() => setIsPrayerOpen(true)}
          onOpenWatch={() => setIsWatchOpen(true)}
        />
        <main className="flex-1">
          <Hero onOpenWatch={() => setIsWatchOpen(true)} onOpenContact={() => setIsContactOpen(true)} />
          <ScriptureBanner />
          <ServiceTimes onOpenPrayer={() => setIsPrayerOpen(true)} />
          <Gallery />
          <Ministries />
          <Events />
          <GivingBanner onOpenGiving={() => setIsGivingOpen(true)} />
        </main>
        <Footer
          onOpenContact={() => setIsContactOpen(true)}
          onOpenGiving={() => setIsGivingOpen(true)}
          onOpenPrayer={() => setIsPrayerOpen(true)}
        />
        <WatchOnlineModal isOpen={isWatchOpen} onClose={() => setIsWatchOpen(false)} />
        <GivingModal isOpen={isGivingOpen} onClose={() => setIsGivingOpen(false)} />
        <PrayerRequestModal isOpen={isPrayerOpen} onClose={() => setIsPrayerOpen(false)} />
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      </div>
    </>
  );
}
