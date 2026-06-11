import { useState } from 'react';
import { Smile, Users, Heart, ArrowRight, X, CheckCircle2 } from 'lucide-react';
import { MINISTRIES } from '../data';
import type { MinistryItem } from '../types';

const ICON_MAP = {
  smile: { Icon: Smile, accent: '#e07a68' },
  users: { Icon: Users, accent: '#7a8ac8' },
  heart: { Icon: Heart, accent: '#c47aaa' },
};

export default function Ministries() {
  const [selected, setSelected] = useState<MinistryItem | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSuccess(true);
    setTimeout(() => { setSuccess(false); setName(''); setEmail(''); setSelected(null); }, 3000);
  };

  return (
    <section id="ministries" className="section-white">
      <div className="divider" />

      <div className="max-w-6xl mx-auto px-6 sm:px-12 py-16 sm:py-24">
        {/* Header */}
        <div className="mb-10 sm:mb-14 space-y-4 max-w-xl">
          <div className="label">Serving Every Heart</div>
          <h2 className="h2 text-[#1a1625]">Our Ministries</h2>
          <div className="divider w-16" style={{ background: '#7b6ba3' }} />
          <p className="text-sm text-[#4a4456] leading-relaxed">
            From our youngest members to our most seasoned elders, there is a place of belonging and purpose for every soul at Kalyanipura Church.
          </p>
        </div>

        {/* 3-column grid — hairline borders between cards, no card shadows */}
        <div className="border border-[#e5e0ec]">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {MINISTRIES.map((ministry, i) => {
              const { Icon, accent } = ICON_MAP[ministry.iconName];
              return (
                <div key={ministry.id}
                  className={`p-6 sm:p-8 flex flex-col gap-4 sm:gap-5 hover:bg-[#f9f7fc] transition-colors ${i < 2 ? 'border-b md:border-b-0 md:border-r border-[#e5e0ec]' : ''}`}>
                  <div className="w-12 h-12 flex items-center justify-center" style={{ background: `${accent}18` }}>
                    <Icon className="w-6 h-6" style={{ color: accent }} />
                  </div>

                  <div className="space-y-2 flex-1">
                    <div className="text-[10px] font-mono tracking-widest uppercase text-[#8a8299]">
                      {ministry.tagline}
                    </div>
                    <h3 className="h3 text-[#1a1625]">{ministry.title}</h3>
                    <p className="text-sm text-[#4a4456] leading-relaxed">{ministry.description}</p>
                  </div>

                  <button onClick={() => setSelected(ministry)}
                    className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#7b6ba3] hover:text-[#6b5c93] transition cursor-pointer group">
                    Learn More
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a1625]/40 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white border border-[#e5e0ec] p-8 space-y-6 relative shadow-none">
            <button onClick={() => setSelected(null)}
              className="absolute top-5 right-5 text-[#8a8299] hover:text-[#1a1625] transition cursor-pointer">
              <X className="w-5 h-5" />
            </button>
            {!success ? (
              <>
                <div>
                  <div className="label mb-2">Get Involved</div>
                  <h3 className="h3 text-[#1a1625]">{selected.title}</h3>
                  <div className="divider w-12 mt-3" style={{ background: '#7b6ba3' }} />
                </div>
                <p className="text-sm text-[#4a4456] leading-relaxed">{selected.detailedDescription}</p>
                <div className="grid-2 text-xs">
                  <div className="border border-[#e5e0ec] p-4">
                    <div className="label mb-1 text-[10px]">Meeting Times</div>
                    <span className="text-[#4a4456]">{selected.meetingTimes}</span>
                  </div>
                  <div className="border border-[#e5e0ec] p-4">
                    <div className="label mb-1 text-[10px]">Contact</div>
                    <span className="text-[#4a4456] break-all">{selected.contactEmail}</span>
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="label text-[10px] mb-1">Express Interest</div>
                  <input type="text" value={name} onChange={e => setName(e.target.value)}
                    placeholder="Your full name" className="input-field w-full" />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="Email address" className="input-field w-full" />
                  <button type="submit" className="btn-primary w-full mt-2">Submit Interest</button>
                </form>
              </>
            ) : (
              <div className="text-center py-10 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#7b6ba3] mx-auto" />
                <h3 className="h3 text-[#1a1625]">Welcome to the Family</h3>
                <p className="text-sm text-[#4a4456]">We'll be in touch soon. Blessings to you!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
