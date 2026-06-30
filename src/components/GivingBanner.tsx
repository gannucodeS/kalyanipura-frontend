import { useEffect, useRef } from 'react';
import { Heart, ArrowRight, Shield, Eye, Receipt } from 'lucide-react';

interface GivingBannerProps {
  onOpenGiving: () => void;
}

export default function GivingBanner({ onOpenGiving }: GivingBannerProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll('.reveal, .reveal-scale').forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 120));
      });
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="section section-white">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl p-6 sm:p-14 reveal-scale"
          style={{
            background: 'linear-gradient(135deg, #6b5c93, #5a4d80, #4a3d6e, #5a4d80, #6b5c93)',
            backgroundSize: '300% 300%',
            animation: 'gradientShift 8s ease infinite',
          }}>
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#7a8ac8]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#e07a68]/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 items-center">
            {/* Left — Copy */}
            <div className="space-y-6 reveal">
              <div className="w-14 h-14 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}>
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <span className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-[#e07a68]">Support the Mission</span>
                <h2 className="heading-lg text-white mt-3">Generosity Transforms Communities</h2>
              </div>
              <p className="text-[0.9rem] text-white/60 leading-relaxed max-w-md">
                Your faithful giving sustains our ministries, outreach programs, and community services. Every gift — of any size — makes an eternal difference in the lives we serve together.
              </p>
            </div>

            {/* Right — Actions */}
            <div className="space-y-6 reveal reveal-delay-2">
              <div className="flex flex-col gap-3">
                <button onClick={onOpenGiving}
                  className="inline-flex items-center justify-center gap-2.5 bg-white text-[#6b5c93] font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded-xl cursor-pointer transition-all duration-300 hover:-translate-y-0.5 w-full"
                  style={{ boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)', fontFamily: 'var(--font-heading)' }}>
                  <Heart className="w-4 h-4 fill-[#6b5c93]" />
                  Give Now
                </button>
                <button onClick={onOpenGiving}
                  className="inline-flex items-center justify-center gap-2.5 bg-white/10 text-white border border-white/20 font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/20 w-full"
                  style={{ fontFamily: 'var(--font-heading)' }}>
                  Learn About Tithing
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Trust */}
              <div className="space-y-3 pt-5 border-t border-white/10">
                {[
                  { Icon: Shield, text: 'Secure & Encrypted' },
                  { Icon: Eye, text: 'Fully Transparent' },
                  { Icon: Receipt, text: 'Tax Deductible' },
                ].map(({ Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-xs font-medium text-white/50 hover:text-white/80 transition cursor-default group">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center transition group-hover:bg-white/15">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
