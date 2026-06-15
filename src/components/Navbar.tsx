import { useState, useEffect } from 'react';
import { Menu, X, Flame } from 'lucide-react';
import logo from '../assets/logo.png';

interface NavbarProps {
  onOpenGiving: () => void;
  onOpenPrayer: () => void;
  onOpenWatch: () => void;
}

export default function Navbar({ onOpenGiving, onOpenPrayer, onOpenWatch }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: 'smooth' });
  };

  const navBg = 'bg-white border-b border-[#e5e0ec]';

  return (
    <header className="w-full z-50">
      <nav className={`w-full fixed top-0 transition-all duration-300 px-6 sm:px-12 ${scrolled ? 'py-4 shadow-sm' : 'py-5'} ${navBg}`}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">

          {/* Logo */}
          <button onClick={() => { setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-3 group cursor-pointer">
            <img src={logo} alt="Kalyanipura Church" className="h-10 w-auto" />
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex landscape-nav items-center gap-8">
            {[
              { label: 'Services', id: 'service-times' },
              { label: 'Ministries', id: 'ministries' },
              { label: 'Events', id: 'events' },
            ].map(({ label, id }) => (
              <button key={id} onClick={() => scrollTo(id)}
                className="text-xs font-semibold tracking-widest uppercase transition cursor-pointer hover:text-[#7b6ba3] text-[#4a4456]">
                {label}
              </button>
            ))}
            <button onClick={onOpenGiving}
              className="text-xs font-semibold tracking-widest uppercase transition cursor-pointer hover:text-[#7b6ba3] text-[#4a4456]">
              Giving
            </button>
            <button onClick={onOpenPrayer}
              className="text-xs font-mono tracking-widest flex items-center gap-1.5 transition cursor-pointer hover:text-[#7b6ba3] text-[#7b6ba3]">
              <Flame className="w-3.5 h-3.5" /> Prayer Wall
            </button>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex landscape-nav items-center gap-3">
            <button onClick={onOpenWatch}
              className="btn-outline text-xs py-2.5 px-5 transition">
              Watch Live
            </button>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setIsOpen(!isOpen)}
            className="md:hidden landscape-toggle p-2 cursor-pointer transition text-[#1a1625]">
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu — always mounted, GPU-accelerated animation */}
        <div className={`md:hidden landscape-menu absolute top-full left-0 right-0 bg-white border-b border-[#e5e0ec] shadow-sm z-50 transition-all duration-300 ease-out ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto visible' : 'opacity-0 -translate-y-2 pointer-events-none invisible'}`}>
          <div className="px-6 py-6 space-y-5">
            <div className="space-y-4 border-b border-[#e5e0ec] pb-5">
              {[
                { label: 'Ministries', id: 'ministries' },
                { label: 'Events', id: 'events' },
                { label: 'Services', id: 'service-times' },
              ].map(({ label, id }) => (
                <button key={id} onClick={() => scrollTo(id)}
                  className="block w-full text-left text-xs font-semibold tracking-widest uppercase text-[#4a4456] hover:text-[#7b6ba3] transition cursor-pointer py-1">
                  {label}
                </button>
              ))}
              <button onClick={() => { setIsOpen(false); onOpenGiving(); }}
                className="block w-full text-left text-xs font-semibold tracking-widest uppercase text-[#7b6ba3] cursor-pointer py-1">
                Giving
              </button>
              <button onClick={() => { setIsOpen(false); onOpenPrayer(); }}
                className="block w-full text-left text-xs font-mono tracking-widest uppercase text-[#7b6ba3] cursor-pointer py-1 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" /> Prayer Wall
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <button onClick={() => { setIsOpen(false); onOpenWatch(); }} className="btn-outline w-full text-center">Watch Live</button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
