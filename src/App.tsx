import { useState } from "react";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
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

export default function App() {
  const [isWatchOpen, setIsWatchOpen] = useState(false);
  const [isGivingOpen, setIsGivingOpen] = useState(false);
  const [isPrayerOpen, setIsPrayerOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0c1409] flex flex-col font-sans">
      <Navbar
        onOpenGiving={() => setIsGivingOpen(true)}
        onOpenPrayer={() => setIsPrayerOpen(true)}
        onOpenWatch={() => setIsWatchOpen(true)}
      />
      <main className="flex-1">
        <Hero onOpenWatch={() => setIsWatchOpen(true)} onOpenContact={() => setIsContactOpen(true)} />
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
  );
}
