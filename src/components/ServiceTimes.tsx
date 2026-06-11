import { Sun, Moon, Users, Clock } from 'lucide-react';
import { SERVICE_TIMES } from '../data';

interface ServiceTimesProps {
  onOpenPrayer: () => void;
}

const ICON_MAP = {
  sun:   { Icon: Sun,   accent: '#e07a68' },
  moon:  { Icon: Moon,  accent: '#7a8ac8' },
  users: { Icon: Users, accent: '#7b6ba3' },
};

export default function ServiceTimes({ onOpenPrayer }: ServiceTimesProps) {
  return (
    <section id="service-times" className="section-white">
      {/* Top hairline */}
      <div className="divider" />

      <div className="max-w-6xl mx-auto px-6 sm:px-12 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-start">
        {/* Left */}
        <div className="space-y-10">
          <div className="space-y-4">
            <div className="label">Welcome Home</div>
            <h2 className="h2 text-[#1a1625]">Weekly<br />Service Times</h2>
            <div className="divider w-16" style={{ background: '#7b6ba3' }} />
            <p className="text-[#4a4456] leading-relaxed text-sm max-w-md">
              We gather weekly to seek truth, sing praises, and build lasting friendships. Join us in person or via our digital livestream — all are welcome at the table.
            </p>
          </div>

          {/* Cards */}
          <div className="space-y-0 border border-[#e5e0ec]">
            {SERVICE_TIMES.map((service, i) => {
              const { Icon, accent } = ICON_MAP[service.icon];
              return (
                <div key={service.id}
                  className={`p-6 flex items-center gap-5 ${i < SERVICE_TIMES.length - 1 ? 'border-b border-[#e5e0ec]' : ''} hover:bg-[#f9f7fc] transition-colors`}>
                  <div className="w-10 h-10 flex items-center justify-center shrink-0" style={{ background: `${accent}18` }}>
                    <Icon className="w-5 h-5" style={{ color: accent }} />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-[#1a1625]">{service.title}</div>
                    <div className="flex items-center gap-1.5 mt-1 text-xs text-[#8a8299] font-mono">
                      <Clock className="w-3 h-3" /> {service.time}
                    </div>
                  </div>
                  <div className="text-[10px] font-mono tracking-widest uppercase text-[#7b6ba3]">
                    {service.category}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Prayer CTA */}
          <div className="border border-[#e5e0ec] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="label mb-1">Need Prayer?</div>
              <p className="text-xs text-[#8a8299]">Our pastor circles are available around the clock.</p>
            </div>
            <button onClick={onOpenPrayer} className="btn-primary whitespace-nowrap">Submit Request</button>
          </div>
        </div>

        {/* Right: image with hairline frame */}
        <div className="relative">
          <div className="border border-[#e5e0ec] p-3">
            <img
              src="https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=800&q=80"
              alt="Kalyanipura Church interior"
              className="w-full object-cover h-[300px] sm:h-[500px]"
              style={{ filter: 'saturate(0.9)' }}
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Caption label — Swiss treats captions as type elements */}
          <div className="mt-3 flex justify-between items-center">
            <span className="text-[10px] font-mono text-[#8a8299] tracking-widest uppercase">Main Sanctuary — 123 Serenity Way</span>
            <span className="text-[10px] font-mono text-[#7b6ba3] tracking-widest">Kalyanipura, KP 45678</span>
          </div>
        </div>
      </div>

      <div className="divider" />
    </section>
  );
}
