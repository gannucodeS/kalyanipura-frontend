import { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, Clock, Users, X, Check } from 'lucide-react';
import { EVENTS as STATIC_DATA } from '../data';
import type { EventItem } from '../types';
import { getEvents, submitRsvp } from '../api';
import { useLanguage } from '../i18n/LanguageContext';
import { t } from '../i18n/translations';
import { df } from '../utils/dynamicFields';

const MONTH_ACCENT: Record<string, string> = {
  OCT: '#e07a68',
  NOV: '#7a8ac8',
  DEC: '#7b6ba3',
};

export default function Events() {
  const { lang } = useLanguage();
  const [items, setItems] = useState<EventItem[]>(STATIC_DATA);
  const [selected, setSelected] = useState<EventItem | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isRsvp, setIsRsvp] = useState(false);
  const [success, setSuccess] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    getEvents().then(setItems).catch(() => {});
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll('.reveal').forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 100));
      });
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelected(null);
      setIsClosing(false);
      setIsRsvp(false);
      setSuccess(false);
      setGuestName('');
      setGuestEmail('');
    }, 300);
  };

  const handleRsvp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestEmail.trim() || !selected) return;
    try {
      await submitRsvp(selected.id, { name: guestName, email: guestEmail });
      setItems(prev => prev.map(ev => ev.id === selected.id ? { ...ev, rsvpCount: ev.rsvpCount + 1 } : ev));
      setSuccess(true);
      setTimeout(() => { handleCloseModal(); }, 3200);
    } catch {}
  };

  return (
    <section ref={ref} id="events" className="section section-cream">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-16 reveal">
          <div>
            <span className="label-tag mb-4 block">
              <Calendar className="w-3.5 h-3.5" /> {t('events', 'joinUs', lang)}
            </span>
            <h2 className="heading-lg">{t('events', 'heading', lang)}</h2>
          </div>
          <span className="text-[0.65rem] font-semibold text-[#6b6580] tracking-[0.12em] uppercase">
            {items.length} {t('events', 'eventsThisSeason', lang)}
          </span>
        </div>

        {/* Event Cards */}
        <div className="space-y-4">
          {items.map((event, i) => {
            const accent = MONTH_ACCENT[event.month] ?? '#7b6ba3';
            return (
              <div key={event.id}
                className={`card flex flex-col sm:flex-row gap-0 overflow-hidden reveal reveal-delay-${i + 1} group`}
                style={{ borderLeft: `4px solid ${accent}` }}>
                {/* Date */}
                <div className="sm:w-28 p-4 sm:p-6 flex sm:flex-col items-center sm:items-start gap-2 sm:gap-1 shrink-0 sm:border-r sm:border-[rgba(107,92,147,0.06)]"
                  style={{ background: `${accent}06` }}>
                  <span className="text-4xl font-bold tabular-nums leading-none" style={{ color: accent, fontFamily: 'var(--font-heading)' }}>
                    {event.day}
                  </span>
                  <span className="text-[0.6rem] font-bold tracking-[0.15em] uppercase text-[#6b6580]">
                    {event.month}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1 space-y-2">
                    <h3 className="heading-sm text-[#1a1625] group-hover:text-[#6b5c93] transition-colors">{df(event, 'title', lang)}</h3>
                    <div className="flex flex-wrap gap-3 text-xs font-medium text-[#6b6580]">
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#6b5c93]" /> {df(event, 'time', lang)}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#6b5c93]" /> {df(event, 'location', lang)}</span>
                      <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-[#6b5c93]" /> {event.rsvpCount} {t('events', 'attending', lang)}</span>
                    </div>
                    <p className="text-xs text-[#6b6580] leading-relaxed hidden sm:block">{df(event, 'description', lang)}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => { setSelected(event); setIsRsvp(false); }}
                      className="inline-flex items-center justify-center bg-transparent text-[#6b5c93] border border-[rgba(107,92,147,0.25)] font-semibold text-[0.65rem] uppercase tracking-wider px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#6b5c93]/5"
                      style={{ fontFamily: 'var(--font-heading)' }}>
                      {t('events', 'details', lang)}
                    </button>
                    <button onClick={() => { setSelected(event); setIsRsvp(true); }}
                      className="inline-flex items-center justify-center bg-[#6b5c93] text-white font-semibold text-[0.65rem] uppercase tracking-wider px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#4a3d6e]"
                      style={{ fontFamily: 'var(--font-heading)' }}>
                      {t('events', 'rsvp', lang)}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div className={`fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 bg-[#1a1625]/60 backdrop-blur-md overflow-y-auto modal-overlay ${isClosing ? 'closing' : ''}`}>
          <div className={`w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 space-y-5 sm:space-y-6 relative shd-card-lg modal-content ${isClosing ? 'closing' : ''}`}>
            <button onClick={handleCloseModal}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#6b5c93]/5 text-[#6b6580] hover:text-[#1a1625] transition cursor-pointer">
              <X className="w-4 h-4" />
            </button>
            {!success ? (
              <>
                <div>
                  <span className="label-tag mb-2 block">
                    <Calendar className="w-3 h-3" /> {selected.month} {selected.day}
                  </span>
                  <h3 className="heading-md text-[#1a1625] mt-1">{df(selected, 'title', lang)}</h3>
                  <div className="w-12 h-[3px] mt-3 rounded-full bg-gradient-to-r from-[#e07a68] to-[#7b6ba3] shimmer-line" />
                </div>
                <div className="space-y-2 text-sm text-[#6b6580]">
                  <div className="flex items-center gap-2.5"><Clock className="w-4 h-4 text-[#6b5c93]" /> {df(selected, 'time', lang)}
                  </div>
                  <div className="flex items-center gap-2.5"><MapPin className="w-4 h-4 text-[#6b5c93]" /> {df(selected, 'location', lang)}
                  </div>
                  <div className="flex items-center gap-2.5"><Users className="w-4 h-4 text-[#6b5c93]" /> {selected.rsvpCount} {t('events', 'peopleRegistered', lang)}</div>
                </div>
                <p className="text-sm text-[#6b6580] leading-relaxed">{df(selected, 'description', lang)}</p>
                {isRsvp && (
                  <form onSubmit={handleRsvp} className="space-y-3 border-t border-[rgba(107,92,147,0.08)] pt-5">
                    <span className="label-tag text-[0.55rem] mb-1 block">{t('events', 'reserveSeat', lang)}</span>
                    <input type="text" value={guestName} onChange={e => setGuestName(e.target.value)} placeholder={t('events', 'fullName', lang)} className="input" />
                    <input type="email" value={guestEmail} onChange={e => setGuestEmail(e.target.value)} placeholder={t('events', 'emailAddress', lang)} className="input" />
                    <button type="submit"
                      className="inline-flex items-center justify-center w-full bg-[#6b5c93] text-white font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-[#4a3d6e] mt-2"
                      style={{ fontFamily: 'var(--font-heading)' }}>
                      {t('events', 'confirmRegistration', lang)}
                    </button>
                  </form>
                )}
              </>
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#6b5c93]/10 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-[#6b5c93]" />
                </div>
                <h3 className="heading-md text-[#1a1625]">{t('events', 'youreRegistered', lang)}</h3>
                <p className="text-sm text-[#6b6580]">{t('events', 'registrationMsg', lang)}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
