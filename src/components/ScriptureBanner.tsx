import { useEffect, useRef, useState } from 'react';

const QUOTE_WORDS = "For where two or three gather in my name, there am I with them.".split(' ');

export default function ScriptureBanner() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative bg-[var(--color-purple)] text-white py-10 sm:py-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
        <svg width="100%" height="100%" viewBox="0 0 800 200" preserveAspectRatio="none">
          <path d="M0,100 C200,20 400,180 600,60 C700,20 780,80 800,100" stroke="white" strokeWidth="1" fill="none" />
          <path d="M0,120 C200,40 400,200 600,80 C700,40 780,100 800,120" stroke="white" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center">
        <div className="w-12 h-[2px] rounded-full bg-gradient-to-r from-[#e07a68] via-[#7b6ba3] to-[#7a8ac8] mx-auto mb-6 shimmer-line" />
        <blockquote
          className="text-lg sm:text-xl lg:text-2xl font-light italic leading-relaxed text-white/90"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          &ldquo;
          {QUOTE_WORDS.map((word, i) => (
            <span
              key={i}
              className="word-reveal-child"
              style={{ animationDelay: visible ? `${0.3 + i * 0.06}s` : '0s', opacity: visible ? undefined : 0 }}
            >
              {word}
            </span>
          ))}
          &rdquo;
        </blockquote>
        <p className="mt-4 text-xs tracking-[0.2em] uppercase text-white/40 font-medium"
          style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease 1.2s' }}>
          Matthew 18:20
        </p>
        <div className="w-12 h-[2px] rounded-full bg-gradient-to-r from-[#7a8ac8] via-[#7b6ba3] to-[#e07a68] mx-auto mt-6 shimmer-line" />
      </div>
    </section>
  );
}
