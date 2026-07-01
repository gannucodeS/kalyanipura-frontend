import { useState, useEffect } from 'react';
import { Menu, X, Flame, ChevronRight } from 'lucide-react';
import logo from '../assets/logo.png';
import { useLanguage } from '../i18n/LanguageContext';
import { t } from '../i18n/translations';

interface NavbarProps {
  onOpenGiving: () => void;
  onOpenPrayer: () => void;
  onOpenWatch: () => void;
}

export default function Navbar({ onOpenGiving, onOpenPrayer, onOpenWatch }: NavbarProps) {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 navbar-reveal">
      <div className={`mx-4 sm:mx-6 lg:mx-8 mt-4 transition-all duration-500 rounded-2xl ${
        scrolled
          ? 'glass-light shd-nav'
          : 'bg-white/10 backdrop-blur-sm border border-white/10'
      }`}>
        <nav className="max-w-7xl mx-auto px-5 sm:px-8 py-3 flex justify-between items-center">
          {/* Logo */}
          <button onClick={() => { setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2.5 group cursor-pointer">
            <img src={logo} alt="Kalyanipura Church" className={`h-9 w-auto transition-all duration-300 ${scrolled ? '' : 'brightness-0 invert'}`} />
          </button>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {[
              { label: t('navbar', 'services', lang), id: 'service-times' },
              { label: t('navbar', 'ministries', lang), id: 'ministries' },
              { label: t('navbar', 'events', lang), id: 'events' },
            ].map(({ label, id }) => (
              <button key={id} onClick={() => scrollTo(id)}
                className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-lg transition-all duration-300 cursor-pointer ${
                  scrolled
                    ? 'text-[#6b6580] hover:text-[#6b5c93] hover:bg-[#6b5c93]/5'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}>
                {label}
              </button>
            ))}
            <button onClick={onOpenGiving}
              className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-lg transition-all duration-300 cursor-pointer ${
                scrolled
                  ? 'text-[#6b6580] hover:text-[#6b5c93] hover:bg-[#6b5c93]/5'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}>
              {t('navbar', 'giving', lang)}
            </button>
            <button onClick={onOpenPrayer}
              className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-lg transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                scrolled
                  ? 'text-[#e07a68] hover:text-[#d06a58]'
                  : 'text-[#e07a68] hover:text-[#f0a090]'
              }`}>
              <Flame className="w-3 h-3" /> {t('navbar', 'prayer', lang)}
            </button>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button onClick={onOpenWatch}
              className={`text-xs font-semibold tracking-wider uppercase px-6 py-2.5 rounded-xl transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                scrolled
                  ? 'btn-primary'
                  : 'btn-ghost'
              }`}>
              {t('navbar', 'watchLive', lang)}
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg cursor-pointer transition-all duration-300 ${
              scrolled ? 'text-[#1a1625] hover:bg-[#6b5c93]/5' : 'text-white hover:bg-white/10'
            }`}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden mx-4 mt-2 glass-light shd-nav rounded-2xl overflow-hidden transition-all duration-300 ease-out ${
        isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-3 invisible'
      }`}>
        <div className="p-5 sm:p-6 space-y-3 sm:space-y-4">
          {[
            { label: t('navbar', 'services', lang), id: 'service-times' },
            { label: t('navbar', 'ministries', lang), id: 'ministries' },
            { label: t('navbar', 'events', lang), id: 'events' },
          ].map(({ label, id }) => (
            <button key={id} onClick={() => scrollTo(id)}
              className="block w-full text-left text-sm font-semibold text-[#6b6580] hover:text-[#6b5c93] transition py-2 cursor-pointer">
              {label}
            </button>
          ))}
          <button onClick={() => { setIsOpen(false); onOpenGiving(); }}
            className="block w-full text-left text-sm font-semibold text-[#6b5c93] transition py-2 cursor-pointer">
            {t('navbar', 'giving', lang)}
          </button>
          <button onClick={() => { setIsOpen(false); onOpenPrayer(); }}
            className="block w-full text-left text-sm font-semibold text-[#e07a68] transition py-2 cursor-pointer flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5" /> {t('navbar', 'prayerWall', lang)}
          </button>
          <div className="pt-3 border-t border-[#6b5c93]/10">
            <button onClick={() => { setIsOpen(false); onOpenWatch(); }}
              className="inline-flex items-center justify-center w-full bg-[#6b5c93] text-white font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-[#4a3d6e]"
              style={{ fontFamily: 'var(--font-heading)' }}>
              {t('navbar', 'watchLive', lang)}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
