import { Play, MapPin } from 'lucide-react';
import heroBg from '../assets/hero demo 1.png';

interface HeroProps {
  onOpenWatch: () => void;
  onOpenContact: () => void;
}

export default function Hero({ onOpenWatch, onOpenContact }: HeroProps) {

  return (
    <section id="hero" className="relative overflow-hidden" style={{
      backgroundImage: `url(${heroBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      {/* Overlay to darken for text legibility */}
      <div className="absolute inset-0 bg-black/5" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 pt-32 sm:pt-36 pb-20 sm:pb-32 flex flex-col gap-8 sm:gap-12">
        <div className="space-y-6 max-w-2xl fade-up">
          {/* Eyebrow label */}
          <div className="label text-xs tracking-widest">Established 1954</div>

          {/* Main heading */}
          <h1 className="h1 text-white" style={{ lineHeight: 1.1 }}>
            Where Every<br />Soul Belongs
          </h1>

          {/* Hairline accent */}
          <div className="w-16 h-px bg-white/80" />

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-white/70 max-w-xl font-light leading-relaxed">
            A spiritual sanctuary in Kalyanipura dedicated to fostering belonging, renewal, and eternal purpose through faithful fellowship and genuine worship.
          </p>
        </div>

        {/* CTAs */}
        <div className="fade-up-delay flex gap-2 sm:gap-4 max-w-sm">
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

        {/* Address */}
        <div className="fade-up-delay-2 pt-6 sm:pt-8 space-y-3 sm:space-y-4">
          <div className="h-px bg-white/30 w-[75vw] sm:w-[50vw]" />
          <div className="flex items-center gap-2 text-sm sm:text-base font-light leading-relaxed" style={{ color: '#6b5c93' }}>
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" style={{ color: '#6b5c93' }} />
            Kalyanipura, Ajmer, Rajasthan
          </div>
        </div>
      </div>
    </section>
  );
}
