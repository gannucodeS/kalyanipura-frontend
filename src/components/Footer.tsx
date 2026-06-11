import { Rss, Share2, Globe, Mail, Phone, MapPin, Flame } from 'lucide-react';
import footLogo from '../assets/foot-logo.png';

interface FooterProps {
  onOpenContact: () => void;
  onOpenGiving: () => void;
  onOpenPrayer: () => void;
}

export default function Footer({ onOpenContact, onOpenGiving, onOpenPrayer }: FooterProps) {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="bg-[#1a1625] text-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-12 pb-12 relative">
          <div className="absolute bottom-0 left-0 right-0" style={{ height: '1px', background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 10%, rgba(255,255,255,0.35) 90%, transparent 100%)' }} />
          {/* Brand */}
          <div className="md:col-span-2 space-y-6">
            <button onClick={() => scrollTo('hero')} className="flex items-center gap-3 group cursor-pointer">
              <div className="relative inline-block">
                <img src={footLogo} alt="Kalyanipura Church" className="h-10 w-auto block" />
                <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 2px 1px #1a1625' }} />
              </div>
            </button>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              A beacon of hope and center for spiritual growth. Sharing Christ's love through action, fellowship, and worship since 1954.
            </p>
            <div className="flex gap-3">
              {[Rss, Share2, Globe].map((Icon, i) => (
                <a key={i} href="#" target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition">
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-5">
            <div className="text-[10px] font-mono tracking-widest uppercase text-[#7b6ba3]">Quick Links</div>
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
                    className="text-xs text-white/40 hover:text-white transition tracking-wider uppercase cursor-pointer font-mono">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <div className="text-[10px] font-mono tracking-widest uppercase text-[#7b6ba3]">Contact</div>
            <ul className="space-y-4">
              {[
                { Icon: Mail, text: 'hello@kalyanipurachurch.org' },
                { Icon: Phone, text: '(555) 123-4567' },
                { Icon: MapPin, text: 'Kalyanipura, Ajmer, Rajasthan' },
              ].map(({ Icon, text }) => (
                <li key={text} className="flex items-start gap-2.5 text-xs text-white/40 hover:text-white/70 transition cursor-pointer">
                  <Icon className="w-3.5 h-3.5 text-[#7b6ba3] shrink-0 mt-0.5" /> {text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-[10px] font-mono text-white/25 tracking-widest uppercase">
            © 2026 Kalyanipura Church. All Rights Reserved.
          </span>
          <button onClick={onOpenPrayer}
            className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase text-[#7b6ba3] hover:text-[#c0b4d8] transition cursor-pointer">
            <Flame className="w-3 h-3" /> Prayer Wall
          </button>
        </div>
      </div>
    </footer>
  );
}
