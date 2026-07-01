import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_ITEMS as STATIC_DATA } from '../data';
import { getGallery } from '../api';
import { useLanguage } from '../i18n/LanguageContext';
import { t } from '../i18n/translations';
import { df } from '../utils/dynamicFields';

export default function Gallery() {
  const { lang } = useLanguage();
  const [items, setItems] = useState(STATIC_DATA);
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    getGallery().then(setItems).catch(() => {});
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll('.reveal, .reveal-scale').forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 80));
      });
    }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Blur-to-sharp image reveal on scroll
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const imgs = slider.querySelectorAll('img[data-reveal]');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const idx = Number((e.target as HTMLElement).dataset.idx);
          setVisibleCards(prev => new Set(prev).add(idx));
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3, root: slider });
    imgs.forEach(img => obs.observe(img));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || slider.scrollWidth <= slider.clientWidth) return;
    const cardW = slider.children[0]?.clientWidth ?? 0;
    if (cardW <= 0) return;
    const step = cardW + 20;
    const slide = () => {
      const max = slider.scrollWidth - slider.clientWidth;
      if (slider.scrollLeft + step >= max) slider.scrollTo({ left: 0, behavior: 'smooth' });
      else slider.scrollBy({ left: step, behavior: 'smooth' });
    };
    const interval = setInterval(slide, 2500);
    return () => clearInterval(interval);
  }, []);

  const onDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    setStartX(clientX - (sliderRef.current?.offsetLeft ?? 0));
    setScrollLeft(sliderRef.current?.scrollLeft ?? 0);
  };
  const onMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    sliderRef.current.scrollLeft = scrollLeft - (clientX - sliderRef.current.offsetLeft - startX) * 1.5;
  };

  const slideDir = (dir: number) => {
    const s = sliderRef.current;
    if (!s) return;
    const w = (s.children[0] as HTMLElement)?.offsetWidth ?? 0;
    s.scrollBy({ left: dir * (w + 20), behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} id="gallery" className="section section-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12 reveal">
          <div>
            <span className="label-tag mb-4 block">{t('gallery', 'ourCommunity', lang)}</span>
            <h2 className="heading-lg">{t('gallery', 'heading', lang)}</h2>
          </div>
          <div className="hidden sm:flex gap-2">
            <button onClick={() => slideDir(-1)}
              className="w-10 h-10 flex items-center justify-center glass-light rounded-full shd-card transition-all duration-300 hover:scale-110 hover:shadow-[0_16px_60px_rgba(107,92,147,0.12)] cursor-pointer">
              <ChevronLeft className="w-5 h-5 text-[#6b5c93]" />
            </button>
            <button onClick={() => slideDir(1)}
              className="w-10 h-10 flex items-center justify-center glass-light rounded-full shd-card transition-all duration-300 hover:scale-110 hover:shadow-[0_16px_60px_rgba(107,92,147,0.12)] cursor-pointer">
              <ChevronRight className="w-5 h-5 text-[#6b5c93]" />
            </button>
          </div>
        </div>

        {/* Gallery */}
        <div className="relative">
          <div ref={sliderRef}
            onMouseDown={onDown}
            onMouseMove={onMove}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onTouchStart={onDown}
            onTouchMove={onMove}
            onTouchEnd={() => setIsDragging(false)}
            className="flex gap-5 overflow-x-auto pb-6 cursor-grab active:cursor-grabbing select-none snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none' }}>
            {items.map((item, i) => (
              <div key={item.id}
                className={`shrink-0 w-72 sm:w-80 snap-start rounded-2xl overflow-hidden bg-white shd-card gallery-card reveal reveal-delay-${(i % 4) + 1}`}>
                <div className="relative overflow-hidden group">
                  <img
                    data-reveal
                    data-idx={i}
                    src={item.imageUrl}
                    alt={df(item, 'description', lang)}
                    className="w-full h-[280px] sm:h-[380px] object-cover ken-burns"
                    style={{
                      filter: visibleCards.has(i) ? 'saturate(0.88)' : 'saturate(0.88) blur(12px)',
                      transform: visibleCards.has(i) ? 'scale(1)' : 'scale(1.04)',
                    }}
                    referrerPolicy="no-referrer"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
                  <span className="absolute top-4 left-4 text-[0.6rem] sm:text-[0.6rem] font-bold tracking-[0.15em] uppercase text-white bg-[#6b5c93]/80 backdrop-blur-sm px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out translate-y-1 group-hover:translate-y-0">
                    {df(item, 'category', lang)}
                  </span>
                </div>
                <div className="px-4 py-3 sm:p-5">
                  <p className="text-[0.7rem] sm:text-sm text-[#6b6580] leading-relaxed">{df(item, 'description', lang)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile-only centered nav buttons */}
        <div className="flex sm:hidden justify-center gap-3 mt-6">
          <button onClick={() => slideDir(-1)}
            className="w-10 h-10 flex items-center justify-center glass-light rounded-full shd-card transition-all duration-300 hover:scale-110 cursor-pointer">
            <ChevronLeft className="w-4 h-4 text-[#6b5c93]" />
          </button>
          <button onClick={() => slideDir(1)}
            className="w-10 h-10 flex items-center justify-center glass-light rounded-full shd-card transition-all duration-300 hover:scale-110 cursor-pointer">
            <ChevronRight className="w-4 h-4 text-[#6b5c93]" />
          </button>
        </div>
      </div>
    </section>
  );
}
