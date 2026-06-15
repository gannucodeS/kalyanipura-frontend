import { useState } from 'react';
import { Calendar, MapPin, Clock, Users, X, Check } from 'lucide-react';
import { EVENTS } from '../data';
import type { EventItem } from '../types';

const MONTH_ACCENT: Record<string, string> = {
  OCT: '#e07a68',
  NOV: '#7a8ac8',
  DEC: '#7b6ba3',
};

export default function Events() {
  const [selected, setSelected] = useState<EventItem | null>(null);
  const [isRsvp, setIsRsvp] = useState(false);
  const [success, setSuccess] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [localEvents, setLocalEvents] = useState<EventItem[]>(EVENTS);

  const handleRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestEmail.trim()) return;
    if (selected) setLocalEvents(prev => prev.map(ev => ev.id === selected.id ? { ...ev, rsvpCount: ev.rsvpCount + 1 } : ev));
    setSuccess(true);
    setTimeout(() => { setSuccess(false); setGuestName(''); setGuestEmail(''); setSelected(null); }, 3200);
  };

  return (
    <section id="events" className="section-light">
      <div className="divider" />

      <div className="max-w-6xl mx-auto px-6 sm:px-12 py-16 sm:py-24">
        {/* Header */}
        <div className="mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 label">
              <Calendar className="w-4 h-4" /> Join Us
            </div>
            <h2 className="h2 text-[#1a1625]">Upcoming Events</h2>
          </div>
          <div className="text-xs font-mono text-[#8a8299] tracking-widest uppercase">
            {localEvents.length} events this season
          </div>
        </div>

        {/* Events — tabular list (Swiss: tabular numerics as structure) */}
        <div className="border border-[#e5e0ec]">
          {localEvents.map((event, i) => {
            const accent = MONTH_ACCENT[event.month] ?? '#7b6ba3';
            return (
              <div key={event.id}
                className={`flex flex-col sm:flex-row ${i < localEvents.length - 1 ? 'border-b border-[#e5e0ec]' : ''} hover:bg-white transition-colors group`}>
                {/* Date column — numeral as composition element */}
                <div className="sm:w-28 p-6 flex sm:flex-col items-center sm:items-start gap-2 sm:gap-1 border-b sm:border-b-0 sm:border-r border-[#e5e0ec]"
                  style={{ background: `${accent}09` }}>
                  <span className="text-4xl font-bold tabular-nums leading-none" style={{ color: accent }}>
                    {event.day}
                  </span>
                  <span className="text-xs font-mono tracking-widest uppercase text-[#8a8299]">
                    {event.month}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col sm:flex-row sm:items-center gap-5">
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-base text-[#1a1625] group-hover:text-[#7b6ba3] transition">
                      {event.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-xs font-mono text-[#8a8299]">
                      <span className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-[#7b6ba3]" /> {event.time}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-[#7b6ba3]" /> {event.location}</span>
                      <span className="flex items-center gap-1.5"><Users className="w-3 h-3 text-[#7b6ba3]" /> {event.rsvpCount} attending</span>
                    </div>
                    <p className="text-xs text-[#8a8299] leading-relaxed hidden sm:block">{event.description}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => { setSelected(event); setIsRsvp(false); }} className="btn-outline text-xs py-2.5 px-4">Details</button>
                    <button onClick={() => { setSelected(event); setIsRsvp(true); }} className="btn-primary text-xs py-2.5 px-4">RSVP</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="divider" />

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 bg-[#1a1625]/40 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg bg-white border border-[#e5e0ec] p-8 space-y-6 relative">
            <button onClick={() => setSelected(null)}
              className="absolute top-5 right-5 text-[#8a8299] hover:text-[#1a1625] transition cursor-pointer">
              <X className="w-5 h-5" />
            </button>
            {!success ? (
              <>
                <div>
                  <div className="label mb-1 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" /> {selected.month} {selected.day}
                  </div>
                  <h3 className="h3 text-[#1a1625] mt-1">{selected.title}</h3>
                  <div className="divider w-12 mt-3" style={{ background: '#7b6ba3' }} />
                </div>
                <div className="space-y-2 text-sm text-[#4a4456]">
                  <div className="flex items-center gap-2.5"><Clock className="w-4 h-4 text-[#7b6ba3]" /> {selected.time}</div>
                  <div className="flex items-center gap-2.5"><MapPin className="w-4 h-4 text-[#7b6ba3]" /> {selected.location}</div>
                  <div className="flex items-center gap-2.5"><Users className="w-4 h-4 text-[#7b6ba3]" /> {selected.rsvpCount} people registered</div>
                </div>
                <p className="text-sm text-[#4a4456] leading-relaxed">{selected.description}</p>
                {isRsvp && (
                  <form onSubmit={handleRsvp} className="space-y-3 border-t border-[#e5e0ec] pt-5">
                    <div className="label text-[10px] mb-1">Reserve Your Seat</div>
                    <input type="text" value={guestName} onChange={e => setGuestName(e.target.value)} placeholder="Full name" className="input-field w-full" />
                    <input type="email" value={guestEmail} onChange={e => setGuestEmail(e.target.value)} placeholder="Email address" className="input-field w-full" />
                    <button type="submit" className="btn-primary w-full mt-2">Confirm Registration</button>
                  </form>
                )}
              </>
            ) : (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 border-2 border-[#7b6ba3] flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7 text-[#7b6ba3]" />
                </div>
                <h3 className="h3 text-[#1a1625]">You're Registered!</h3>
                <p className="text-sm text-[#4a4456]">Confirmation sent to your inbox. We look forward to seeing you!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
