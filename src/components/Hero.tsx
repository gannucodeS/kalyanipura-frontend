import { Play, MapPin } from 'lucide-react';
import heroBg from '../assets/hero demo 1.png';
import heroMobileBg from '../assets/hero mobile.png';

interface HeroProps {
  onOpenWatch: () => void;
  onOpenContact: () => void;
}

export default function Hero({ onOpenWatch, onOpenContact }: HeroProps) {

  return (
    <section id="hero" className="relative w-full aspect-[853/1844] sm:aspect-video overflow-hidden">
      {/* Mobile bg */}
      <div className="absolute inset-0 sm:hidden" style={{
        backgroundImage: `url(${heroMobileBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} />
      {/* Desktop bg */}
      <div className="absolute inset-0 hidden sm:block" style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/5" />

      {/* Content */}
      <div className="absolute inset-0 z-10 max-w-6xl mx-auto px-6 sm:px-12 pt-16 sm:pt-20 pb-4 flex flex-col gap-2 sm:gap-6 justify-center overflow-y-auto">
        <div className="space-y-2 sm:space-y-3 max-w-2xl fade-up">
          <div className="label text-xs tracking-widest">Established 1954</div>

          <h1 className="h1 h1-mobile text-white" style={{ lineHeight: 1.1 }}>
            Where Every<br />Soul Belongs
          </h1>

          <div className="w-16 h-px bg-white/80" />

          <p className="text-sm sm:text-sm text-white/70 max-w-xl font-light leading-relaxed">
            A spiritual sanctuary in Kalyanipura dedicated to fostering belonging, renewal, and eternal purpose through faithful fellowship and genuine worship.
          </p>
        </div>

        <div className="fade-up-delay flex gap-2 sm:gap-3 max-w-sm">
          <button onClick={onOpenWatch}
            className="btn-primary bg-white text-[#7b6ba3] hover:bg-[#f9f7fc] text-[10px] sm:text-sm px-1.5 py-0.5 sm:px-7 sm:py-3.5">
            <Play className="w-2 h-2 sm:w-4 sm:h-4 inline mr-0.5 sm:mr-2 fill-current" />
            Watch
          </button>
          <button onClick={onOpenContact}
            className="btn-outline border-white text-white hover:bg-white/10 text-[10px] sm:text-sm px-1.5 py-0.5 sm:px-7 sm:py-3.5">
            <MapPin className="w-2 h-2 sm:w-4 sm:h-4 inline mr-0.5 sm:mr-2" />
            Visit
          </button>
        </div>

        <div className="fade-up-delay-2 pt-3 space-y-2">
          <div className="h-px bg-white/30 w-[75vw] sm:w-[50vw]" />
          <div className="flex items-center gap-2 text-sm font-light leading-relaxed" style={{ color: '#6b5c93' }}>
            <MapPin className="w-4 h-4 sm:w-4 sm:h-4 shrink-0" style={{ color: '#6b5c93' }} />
            Kalyanipura, Ajmer, Rajasthan
          </div>
        </div>
      </div>
    </section>
  );
}
