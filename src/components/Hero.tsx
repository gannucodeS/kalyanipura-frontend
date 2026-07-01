import { useEffect, useRef, useState } from 'react';
import { Play, MapPin, Calendar, Users, BookOpen } from 'lucide-react';
import heroBg from '../assets/hero demo 1.png';
import heroMobileBg from '../assets/hero mobile.png';
import heroTabletBg from '../assets/hero tablet.png';

interface HeroProps {
  onOpenWatch: () => void;
  onOpenContact: () => void;
}

function useCountUp(target: number, duration = 1200, startDelay = 0) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    const timeout = setTimeout(() => {
      const startTime = Date.now();
      const tick = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [started, target, duration, startDelay]);

  return { count, start: () => setStarted(true) };
}

export default function Hero({ onOpenWatch, onOpenContact }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const years = useCountUp(70, 1200, 200);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { years.start(); obs.disconnect(); }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [years]);

  // Parallax offset for hero backgrounds
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const backgrounds = hero.querySelectorAll('.hero-bg-layer');
      backgrounds.forEach((bg) => {
        (bg as HTMLElement).style.transform = `translateY(${scrollY * 0.15}px)`;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* ─── Background Images (parallax layers) ─── */}
      <div className="hero-bg-layer absolute inset-0 sm:hidden anim-scale will-change-transform" style={{
        backgroundImage: `url(${heroMobileBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} />
      <div className="hero-bg-layer absolute inset-0 hidden sm:block lg:hidden anim-scale will-change-transform" style={{
        backgroundImage: `url(${heroTabletBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} />
      <div className="hero-bg-layer absolute inset-0 hidden lg:block anim-scale will-change-transform" style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
      }} />

      {/* ─── Gradient Overlays ─── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />

      {/* ─── Decorative Elements ─── */}
      <div className="anim-float absolute top-[15%] right-[10%] w-3 h-3 rounded-full bg-white/20 pointer-events-none" style={{ animationDelay: '1s' }} />
      <div className="anim-float-slow absolute top-[25%] right-[25%] w-2 h-2 rounded-full bg-[#7a8ac8]/30 pointer-events-none" style={{ animationDelay: '3s' }} />
      <div className="anim-float absolute bottom-[35%] left-[12%] w-2 h-2 rounded-full bg-[#e07a68]/25 pointer-events-none" style={{ animationDelay: '2s' }} />
      <div className="anim-float-slow absolute top-[45%] right-[5%] w-1.5 h-1.5 rounded-full bg-white/15 pointer-events-none" />

      {/* ─── Content ─── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-32 pb-28 sm:pb-40">
        <div className="max-w-3xl">

          {/* Left — Text Content */}
          <div className="space-y-4 sm:space-y-8">
            {/* Badge */}
              <div className="anim-fade-down inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 sm:px-5 sm:py-2" style={{ animationDelay: '0.9s' }}>
              <Calendar className="w-3.5 h-3.5 text-[#e07a68]" />
              <span className="text-[0.6rem] sm:text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-white/80">
                Established 1954
              </span>
            </div>

            {/* Headline — Clip-Path Reveal */}
            <div>
              <h1 className="text-white leading-[1.05] tracking-tight text-[2.5rem] sm:text-[3.5rem] lg:text-[5rem]" style={{ fontFamily: 'var(--font-display)' }}>
                <span className="anim-clip-reveal inline-block" style={{ animationDelay: '1s' }}>Where Every</span>
                <br />
                <span className="anim-clip-reveal inline-block bg-gradient-to-r from-white via-white to-[#a0b0e0] bg-clip-text text-transparent" style={{ animationDelay: '1.15s' }}>
                  Soul Belongs
                </span>
              </h1>
            </div>

            {/* Accent Line — Shimmer */}
            <div style={{ animationDelay: '1.25s' }}>
              <div className="w-16 sm:w-20 h-[3px] rounded-full bg-gradient-to-r from-[#e07a68] via-[#7b6ba3] to-[#7a8ac8] shimmer-line" />
            </div>

            {/* Description */}
            <p className="anim-fade-left text-[0.78rem] sm:text-base text-white/60 max-w-lg leading-relaxed font-light" style={{ animationDelay: '1.3s' }}>
              A spiritual sanctuary in Kalyanipura dedicated to fostering belonging, renewal, and eternal purpose through faithful fellowship and genuine worship.
            </p>

            {/* CTAs */}
            <div className="anim-fade-up flex flex-col sm:flex-row gap-3" style={{ animationDelay: '1.4s' }}>
              <button onClick={onOpenWatch}
                className="inline-flex items-center justify-center gap-2 sm:gap-2.5 bg-[#6b5c93] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl cursor-pointer transition-all duration-300 hover:bg-[#4a3d6e] hover:-translate-y-0.5 w-full sm:w-auto"
                style={{ boxShadow: '0 8px 30px rgba(107, 92, 147, 0.4)', fontFamily: 'var(--font-heading)' }}>
                <Play className="w-4 h-4 fill-current" />
                Watch Live
              </button>
              <button onClick={onOpenContact}
                className="inline-flex items-center justify-center gap-2 sm:gap-2.5 bg-white/10 text-white border border-white/30 font-semibold text-xs sm:text-sm uppercase tracking-wider px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:-translate-y-0.5 backdrop-blur-sm w-full sm:w-auto"
                style={{ fontFamily: 'var(--font-heading)' }}>
                <MapPin className="w-4 h-4" />
                Visit Us
              </button>
            </div>

            {/* Micro Info */}
            <div className="anim-fade-up hidden sm:flex items-center gap-3 text-white/40 text-xs font-light" style={{ animationDelay: '1.5s' }}>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#e07a68] animate-pulse" />
                <span>Sunday Service &bull; 10:00 AM</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ─── Trust Bar ─── */}
      <div className="absolute bottom-0 left-0 right-0 z-10 anim-fade-up" style={{ animationDelay: '1.6s' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 pb-4 sm:pb-8">
          <div ref={statsRef} className="glass-strong rounded-2xl px-3 py-3 sm:px-10 sm:py-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 shd-card-lg">
            {[
              { value: '1954', label: 'Established', icon: <Calendar className="w-4 h-4" /> },
              { value: `${years.count > 0 ? years.count + '+' : '0'}`, label: 'Years of Ministry', icon: null },
              { value: '', label: 'Fellowship', icon: <Users className="w-5 h-5" /> },
              { value: '', label: 'Worship & Prayer', icon: <BookOpen className="w-5 h-5" /> },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-1 sm:gap-1.5">
                {stat.icon ? (
                  <span className="text-white/70">{stat.icon}</span>
                ) : (
                  <span className="text-lg sm:text-2xl font-bold text-white tabular-nums" style={{ fontFamily: 'var(--font-heading)' }}>{stat.value}</span>
                )}
                <span className="text-[0.5rem] sm:text-[0.65rem] font-semibold tracking-[0.1em] sm:tracking-[0.12em] uppercase text-white/50 text-center leading-tight">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Bottom Curve ─── */}
      <div className="absolute bottom-0 left-0 right-0 z-[5]">
        <svg viewBox="0 0 1440 80" fill="none" className="w-full block" preserveAspectRatio="none">
          <path d="M0,60 C360,0 720,80 1080,20 C1260,0 1380,40 1440,60 L1440,80 L0,80Z" fill="var(--color-cream)" />
        </svg>
      </div>
    </section>
  );
}
