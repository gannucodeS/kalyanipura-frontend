import { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export default function LangToggle() {
  const { lang, toggleLang } = useLanguage();
  const [pastHero, setPastHero] = useState(false);
  const isEn = lang === 'en';

  useEffect(() => {
    const handleScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.85);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      onClick={toggleLang}
      className={`lang-toggle-reveal fixed top-[96px] right-[33px] z-50 flex items-center gap-1.5 max-sm:gap-1 px-3 max-sm:px-2 py-1.5 max-sm:py-1.5 rounded-full backdrop-blur-md border cursor-pointer transition-all duration-300 hover:scale-105 ${
        pastHero
          ? 'bg-[#6b5c93]/90 border-[#6b5c93]/30 hover:bg-[#6b5c93]'
          : 'bg-white/10 border-white/20 hover:bg-white/20'
      }`}
      title={isEn ? 'Switch to Hindi' : 'Switch to English'}
    >
      <span
        className="text-xs max-sm:text-[0.6rem] font-bold transition-all duration-300"
        style={{
          color: isEn ? '#fff' : 'rgba(255,255,255,0.4)',
          transform: isEn ? 'scale(1)' : 'scale(0.85)',
        }}
      >
        A
      </span>
      <span className="text-white/30 text-[0.5rem] max-sm:text-[0.45rem]">/</span>
      <span
        className="text-xs max-sm:text-[0.6rem] transition-all duration-300"
        style={{
          fontFamily: "'Noto Sans Devanagari', sans-serif",
          color: isEn ? 'rgba(255,255,255,0.4)' : '#fff',
          transform: isEn ? 'scale(0.85)' : 'scale(1)',
        }}
      >
        अ
      </span>
    </button>
  );
}
