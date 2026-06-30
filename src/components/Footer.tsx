import { useEffect, useRef } from 'react';
import { Rss, Share2, Globe, Mail, Phone, MapPin, Flame, ArrowUp } from 'lucide-react';
import footLogo from '../assets/foot-logo.png';

interface FooterProps {
  onOpenContact: () => void;
  onOpenGiving: () => void;
  onOpenPrayer: () => void;
}

export default function Footer({ onOpenContact, onOpenGiving, onOpenPrayer }: FooterProps) {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll('.reveal').forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 80));
      });
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <footer ref={ref} className="bg-[#1a1625] text-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 pb-10 sm:pb-12">
          {/* Brand */}
          <div className="md:col-span-5 space-y-6 reveal reveal-left">
            <button onClick={() => scrollTo('hero')} className="flex items-center gap-3 group cursor-pointer">
              <img src={footLogo} alt="Kalyanipura Church" className="h-10 w-auto transition-transform duration-300 group-hover:scale-105" />
            </button>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              A beacon of hope and center for spiritual growth. Sharing Christ's love through action, fellowship, and worship since 1954.
            </p>
            <div className="flex gap-3">
              {[Rss, Share2, Globe].map((Icon, i) => (
                <a key={i} href="#" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-[#6b5c93] hover:bg-[#6b5c93]/20 transition-all duration-300 hover:scale-110 hover:shadow-[0_4px_20px_rgba(107,92,147,0.3)]">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-5 reveal reveal-left reveal-delay-2">
            <span className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-[#7b6ba3]">Quick Links</span>
            <ul className="space-y-3">
              {[
                { label: 'Our History', action: () => scrollTo('hero') },
                { label: 'Beliefs', action: () => scrollTo('service-times') },
                { label: 'Leadership', action: () => scrollTo('ministries') },
                { label: 'Giving', action: onOpenGiving },
                { label: 'Contact', action: onOpenContact },
              ].map(({ label, action }) => (
                <li key={label}>
                  <button onClick={action}
                    className="text-sm text-white/35 hover:text-white transition-all duration-300 cursor-pointer hover:translate-x-1 inline-flex items-center gap-2">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4 space-y-5 reveal reveal-right reveal-delay-3">
            <span className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-[#7b6ba3]">Contact</span>
            <ul className="space-y-4">
              {[
                { Icon: Mail, text: 'hello@kalyanipurachurch.org' },
                { Icon: Phone, text: '(555) 123-4567' },
                { Icon: MapPin, text: 'Kalyanipura, Ajmer, Rajasthan' },
              ].map(({ Icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-sm text-white/35 hover:text-white/60 transition-all duration-300 cursor-pointer group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#6b5c93]/20 transition">
                    <Icon className="w-3.5 h-3.5 text-[#7b6ba3]" />
                  </div>
                  <span className="group-hover:translate-x-0.5 transition-transform pt-1.5">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-[0.6rem] font-medium text-white/20 tracking-[0.12em] uppercase">
            &copy; 2026 Kalyanipura Church. All Rights Reserved.
          </span>
          <div className="flex items-center gap-4">
            <button onClick={onOpenPrayer}
              className="flex items-center gap-1.5 text-[0.6rem] font-semibold tracking-[0.12em] uppercase text-[#7b6ba3] hover:text-[#c0b4d8] transition-all duration-300 cursor-pointer">
              <Flame className="w-3 h-3" /> Prayer Wall
            </button>
            <button onClick={() => scrollTo('hero')}
              className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/30 hover:text-white hover:bg-[#6b5c93]/30 transition-all duration-300 cursor-pointer">
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
