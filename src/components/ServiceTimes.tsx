import { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Users, Clock, ArrowRight } from 'lucide-react';
import { SERVICE_TIMES as STATIC_DATA } from '../data';
import { getServiceTimes } from '../api';
import { useLanguage } from '../i18n/LanguageContext';
import { t } from '../i18n/translations';
import { df } from '../utils/dynamicFields';

interface ServiceTimesProps {
  onOpenPrayer: () => void;
}

const ICON_MAP = {
  sun:   { Icon: Sun,   accent: '#e07a68', bg: 'rgba(224, 122, 104, 0.08)' },
  moon:  { Icon: Moon,  accent: '#7a8ac8', bg: 'rgba(122, 138, 200, 0.08)' },
  users: { Icon: Users, accent: '#7b6ba3', bg: 'rgba(123, 107, 163, 0.08)' },
};

export default function ServiceTimes({ onOpenPrayer }: ServiceTimesProps) {
  const { lang } = useLanguage();
  const [items, setItems] = useState(STATIC_DATA);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    getServiceTimes().then(setItems).catch(() => {});
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-blur').forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 100));
      });
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="service-times" className="section section-cream">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16 reveal">
          <span className="label-tag mb-4 block">{t('serviceTimes', 'welcomeHome', lang)}</span>
          <h2 className="heading-lg mb-4">{t('serviceTimes', 'heading', lang)}</h2>
          <div className="w-16 h-[3px] mx-auto rounded-full bg-gradient-to-r from-[#e07a68] via-[#7b6ba3] to-[#7a8ac8] shimmer-line" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 items-start">
          {/* Service Cards — enter from left */}
          <div className="lg:col-span-3 space-y-4">
            {items.map((service, i) => {
              const { Icon, accent, bg } = ICON_MAP[service.icon];
              return (
                <div key={service.id}
                  className={`card flex items-center gap-5 reveal reveal-left reveal-delay-${i + 1} group cursor-default`}
                  style={{ borderLeft: `3px solid ${accent}` }}>
                  <div className="w-14 h-14 flex items-center justify-center rounded-2xl shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{ background: bg }}>
                    <Icon className="w-6 h-6" style={{ color: accent }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="heading-sm text-[#1a1625] group-hover:text-[#6b5c93] transition-colors">{df(service, 'title', lang)}</h3>
                    <div className="flex items-center gap-2 mt-1.5 text-xs text-[#6b6580] font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#6b5c93]" />
                      {df(service, 'time', lang)}
                    </div>
                  </div>
                  <div className="hidden sm:block text-[0.6rem] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full shrink-0"
                    style={{ color: accent, background: bg }}>
                    {df(service, 'category', lang)}
                  </div>
                </div>
              );
            })}

            {/* Prayer CTA — enters from left, last */}
            <div className="card bg-gradient-to-br from-[#6b5c93]/5 to-transparent border-[#6b5c93]/10 reveal reveal-left reveal-delay-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="label-tag mb-2 block">{t('serviceTimes', 'needPrayer', lang)}</span>
                  <p className="text-sm text-[#6b6580]">{t('serviceTimes', 'prayerDesc', lang)}</p>
                </div>
                <button onClick={onOpenPrayer}
                  className="inline-flex items-center justify-center gap-2 bg-[#6b5c93] text-white font-semibold text-[0.65rem] uppercase tracking-wider px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#4a3d6e] shrink-0"
                  style={{ fontFamily: 'var(--font-heading)' }}>
                  {t('serviceTimes', 'submitRequest', lang)}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Image — enters from right, with blur reveal */}
          <div className="lg:col-span-2 reveal-blur reveal-delay-2">
                <div className="rounded-2xl overflow-hidden shd-card-lg">
              <img
                src="https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=800&q=80"
                alt="Church interior"
                className="w-full h-[250px] sm:h-[350px] lg:h-[500px] object-cover ken-burns"
                style={{ filter: 'saturate(0.9)' }}
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="mt-4 flex justify-between items-center px-1">
              <span className="text-[0.65rem] font-medium text-[#6b6580] tracking-wider">{t('serviceTimes', 'mainSanctuary', lang)}</span>
              <span className="text-[0.65rem] font-medium text-[#6b5c93] tracking-wider">{t('serviceTimes', 'location', lang)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
