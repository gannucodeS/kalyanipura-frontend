import { useState, useEffect, useRef, useCallback } from 'react';
import { Smile, Users, Heart, ArrowRight, X, CheckCircle2 } from 'lucide-react';
import { MINISTRIES as STATIC_DATA } from '../data';
import type { MinistryItem } from '../types';
import { getMinistries, submitMinistryInterest } from '../api';

const ICON_MAP = {
  smile: { Icon: Smile, accent: '#e07a68', gradient: 'from-[#e07a68]/10 to-[#e07a68]/5' },
  users: { Icon: Users, accent: '#7a8ac8', gradient: 'from-[#7a8ac8]/10 to-[#7a8ac8]/5' },
  heart: { Icon: Heart, accent: '#c47aaa', gradient: 'from-[#c47aaa]/10 to-[#c47aaa]/5' },
};

export default function Ministries() {
  const [items, setItems] = useState(STATIC_DATA);
  const [selected, setSelected] = useState<MinistryItem | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const tiltRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    getMinistries().then(setItems).catch(() => {});
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll('.reveal, .reveal-scale').forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 120));
      });
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // 3D tilt effect on cards
  const handleTilt = useCallback((e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const card = tiltRefs.current[idx];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -3;
    const rotateY = ((x - centerX) / centerX) * 3;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
  }, []);

  const resetTilt = useCallback((idx: number) => {
    const card = tiltRefs.current[idx];
    if (!card) return;
    card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)';
  }, []);

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelected(null);
      setIsClosing(false);
      setSuccess(false);
      setName('');
      setEmail('');
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !selected) return;
    try {
      await submitMinistryInterest(selected.id, { name, email });
      setSuccess(true);
      setTimeout(() => { handleCloseModal(); }, 3000);
    } catch {}
  };

  return (
    <section ref={ref} id="ministries" className="section section-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16 reveal">
          <span className="label-tag mb-4 block">Serving Every Heart</span>
          <h2 className="heading-lg mb-4">Our Ministries</h2>
          <p className="text-body max-w-xl mx-auto">
            From our youngest members to our most seasoned elders, there is a place of belonging and purpose for every soul.
          </p>
        </div>

        {/* Ministry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((ministry, i) => {
            const { Icon, accent, gradient } = ICON_MAP[ministry.iconName];
            return (
              <div key={ministry.id}
                ref={el => { tiltRefs.current[i] = el; }}
                className={`card group cursor-pointer reveal reveal-delay-${i + 1} relative overflow-hidden tilt-card`}
                style={{ borderTop: `3px solid transparent`, transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
                onMouseMove={(e) => handleTilt(e, i)}
                onMouseLeave={() => { resetTilt(i); }}
                onMouseEnter={(e) => { e.currentTarget.style.borderTopColor = accent; }}
                onMouseOut={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) e.currentTarget.style.borderTopColor = 'transparent'; }}>
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

                <div className="relative z-10 space-y-5">
                  <div className="w-14 h-14 flex items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110"
                    style={{ background: `${accent}12` }}>
                    <Icon className="w-7 h-7" style={{ color: accent }} />
                  </div>

                  <div className="space-y-2">
                    <span className="text-[0.6rem] font-bold tracking-[0.15em] uppercase" style={{ color: `${accent}99` }}>
                      {ministry.tagline}
                    </span>
                    <h3 className="heading-sm text-[#1a1625] group-hover:text-[#6b5c93] transition-colors">{ministry.title}</h3>
                    <p className="text-sm text-[#6b6580] leading-relaxed">{ministry.description}</p>
                  </div>

                  <button onClick={() => setSelected(ministry)}
                    className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#6b5c93] hover:text-[#4a3d6e] transition group/btn">
                    Learn More
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>
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
                  <span className="label-tag mb-3 block">Get Involved</span>
                  <h3 className="heading-md text-[#1a1625]">{selected.title}</h3>
                  <div className="w-12 h-[3px] mt-3 rounded-full bg-gradient-to-r from-[#e07a68] to-[#7b6ba3] shimmer-line" />
                </div>
                <p className="text-sm text-[#6b6580] leading-relaxed">{selected.detailedDescription}</p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-[#6b5c93]/5 rounded-xl p-4">
                    <span className="label-tag text-[0.55rem] mb-1.5 block">Meeting Times</span>
                    <span className="text-[#6b6580]">{selected.meetingTimes}</span>
                  </div>
                  <div className="bg-[#6b5c93]/5 rounded-xl p-4">
                    <span className="label-tag text-[0.55rem] mb-1.5 block">Contact</span>
                    <span className="text-[#6b6580] break-all">{selected.contactEmail}</span>
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <span className="label-tag text-[0.55rem] mb-1 block">Express Interest</span>
                  <input type="text" value={name} onChange={e => setName(e.target.value)}
                    placeholder="Your full name" className="input" />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="Email address" className="input" />
                  <button type="submit"
                    className="inline-flex items-center justify-center w-full bg-[#6b5c93] text-white font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-[#4a3d6e] mt-2"
                    style={{ fontFamily: 'var(--font-heading)' }}>
                    Submit Interest
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-14 h-14 text-[#6b5c93] mx-auto" />
                <h3 className="heading-md text-[#1a1625]">Welcome to the Family</h3>
                <p className="text-sm text-[#6b6580]">We'll be in touch soon. Blessings to you!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
