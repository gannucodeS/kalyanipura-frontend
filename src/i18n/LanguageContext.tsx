import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Lang } from './translations';

const STORAGE_KEY = 'kc_lang';

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  isHindi: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  toggleLang: () => {},
  isHindi: false,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    return stored === 'en' || stored === 'hi' ? stored : 'en';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const toggleLang = () => setLang(prev => (prev === 'en' ? 'hi' : 'en'));
  return (
    <LanguageContext.Provider value={{ lang, toggleLang, isHindi: lang === 'hi' }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
