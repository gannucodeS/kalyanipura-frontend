import { useState } from 'react';
import { X, Flame, Check, Heart } from 'lucide-react';

interface PrayerRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const CATEGORIES = ['Guidance', 'Healing', 'Comfort', 'Thanksgiving', 'Other'] as const;
const SAMPLE_REQUESTS = [
  { name: 'Sarah M.', category: 'Healing', request: 'Praying for full recovery after surgery. Grateful for the love of this church family.', count: 34 },
  { name: 'Anonymous', category: 'Guidance', request: 'Seeking wisdom for a major life decision. Trusting in His plan.', count: 21 },
  { name: 'James K.', category: 'Thanksgiving', request: 'Praising God for our new baby girl, born healthy and strong!', count: 58 },
];

export default function PrayerRequestModal({ isOpen, onClose }: PrayerRequestModalProps) {
  const [tab, setTab] = useState<'wall' | 'submit'>('wall');
  const [name, setName] = useState('');
  const [request, setRequest] = useState('');
  const [category, setCategory] = useState<typeof CATEGORIES[number]>('Guidance');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [success, setSuccess] = useState(false);
  const [prayed, setPrayed] = useState<Set<number>>(new Set());

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!request.trim()) return;
    setSuccess(true);
    setTimeout(() => { setSuccess(false); setName(''); setRequest(''); setTab('wall'); }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a1625]/50 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-lg bg-white border border-[#e5e0ec] p-8 space-y-6 relative my-4">
        <button onClick={onClose} className="absolute top-5 right-5 text-[#8a8299] hover:text-[#1a1625] transition cursor-pointer">
          <X className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3">
          <Flame className="w-5 h-5 text-[#7b6ba3]" />
          <h2 className="h3 text-[#1a1625]">Prayer Wall</h2>
        </div>

        {/* Tabs — hairline style */}
        <div className="flex border-b border-[#e5e0ec]">
          {([['wall', 'Prayer Wall'], ['submit', 'Submit Request']] as const).map(([t, label]) => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-3 text-xs font-semibold tracking-widest uppercase transition cursor-pointer border-b-2 -mb-px ${
                tab === t ? 'border-[#7b6ba3] text-[#7b6ba3]' : 'border-transparent text-[#8a8299] hover:text-[#4a4456]'
              }`}>
              {label}
            </button>
          ))}
        </div>

        {tab === 'wall' ? (
          <div className="space-y-4 max-h-[360px] overflow-y-auto">
            {SAMPLE_REQUESTS.map((req, i) => (
              <div key={i} className="border border-[#e5e0ec] p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[#1a1625]">{req.name}</span>
                  <span className="text-[9px] font-mono tracking-widest uppercase text-[#7b6ba3] border border-[#e5e0ec] px-2 py-0.5">
                    {req.category}
                  </span>
                </div>
                <p className="text-sm text-[#4a4456] leading-relaxed italic">&ldquo;{req.request}&rdquo;</p>
                <button
                  onClick={() => setPrayed(prev => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; })}
                  className={`flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase transition cursor-pointer ${
                    prayed.has(i) ? 'text-[#7b6ba3]' : 'text-[#8a8299] hover:text-[#7b6ba3]'
                  }`}>
                  <Heart className={`w-3.5 h-3.5 ${prayed.has(i) ? 'fill-[#7b6ba3]' : ''}`} />
                  {req.count + (prayed.has(i) ? 1 : 0)} Praying
                </button>
              </div>
            ))}
            <button onClick={() => setTab('submit')} className="btn-primary w-full text-center mt-2">
              + Add Your Prayer
            </button>
          </div>
        ) : (
          !success ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                {CATEGORIES.map((cat) => (
                  <button type="button" key={cat} onClick={() => setCategory(cat)}
                    className={`text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 border transition cursor-pointer ${
                      category === cat ? 'bg-[#7b6ba3] text-white border-[#7b6ba3]' : 'border-[#e5e0ec] text-[#8a8299] hover:border-[#7b6ba3] hover:text-[#7b6ba3]'
                    }`}>
                    {cat}
                  </button>
                ))}
              </div>
              {!isAnonymous && (
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name (optional)" className="input-field w-full" />
              )}
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#8a8299]">
                <input type="checkbox" checked={isAnonymous} onChange={e => setIsAnonymous(e.target.checked)} className="accent-[#7b6ba3]" />
                Submit anonymously
              </label>
              <textarea value={request} onChange={e => setRequest(e.target.value)} placeholder="Share your prayer request..." rows={4} className="input-field w-full resize-none" />
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                <Flame className="w-4 h-4" /> Submit to Prayer Wall
              </button>
            </form>
          ) : (
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 border-2 border-[#7b6ba3] flex items-center justify-center mx-auto">
                <Check className="w-7 h-7 text-[#7b6ba3]" />
              </div>
              <h3 className="h3 text-[#1a1625]">Prayer Submitted</h3>
              <p className="text-sm text-[#4a4456]">Our intercessors are lifting this to the Lord. You are not alone.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
