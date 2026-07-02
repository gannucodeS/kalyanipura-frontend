import { useState, useEffect, useCallback } from 'react';
import { X, Flame, Check, Heart } from 'lucide-react';
import { getPrayerRequests, submitPrayerRequest, prayForRequest } from '../api';
import type { PrayerRequest } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { t } from '../i18n/translations';
import { df } from '../utils/dynamicFields';

interface PrayerRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const CATEGORIES = ['Guidance', 'Healing', 'Comfort', 'Thanksgiving', 'Other'] as const;

export default function PrayerRequestModal({ isOpen, onClose }: PrayerRequestModalProps) {
  const { lang } = useLanguage();
  const [tab, setTab] = useState<'wall' | 'submit'>('wall');
  const [name, setName] = useState('');
  const [request, setRequest] = useState('');
  const [category, setCategory] = useState<typeof CATEGORIES[number]>('Guidance');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [success, setSuccess] = useState(false);
  const [requests, setRequests] = useState<PrayerRequest[]>([]);
  const [prayed, setPrayed] = useState<Set<string>>(new Set());
  const [isClosing, setIsClosing] = useState(false);

  const loadRequests = useCallback(async () => {
    try {
      const data = await getPrayerRequests();
      setRequests(data);
    } catch {}
  }, []);

  useEffect(() => {
    if (isOpen && tab === 'wall') loadRequests();
  }, [isOpen, tab, loadRequests]);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setTab('wall');
      setSuccess(false);
      setName('');
      setRequest('');
      onClose();
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!request.trim()) return;
    try {
      await submitPrayerRequest({ name, category, request, isAnonymous });
      setSuccess(true);
      setTimeout(() => { handleClose(); }, 3000);
    } catch {}
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a1625]/60 backdrop-blur-md overflow-y-auto modal-overlay ${isClosing ? 'closing' : ''}`}>
      <div className={`w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 space-y-5 sm:space-y-6 relative shd-card-lg my-4 modal-content ${isClosing ? 'closing' : ''}`}>
        <button onClick={handleClose}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#6b5c93]/5 text-[#6b6580] hover:text-[#1a1625] transition cursor-pointer">
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#e07a68]/10 flex items-center justify-center">
            <Flame className="w-5 h-5 text-[#e07a68]" />
          </div>
          <h2 className="heading-md text-[#1a1625]">{t('prayerModal', 'prayerWall', lang)}</h2>
        </div>

        {/* Tabs */}
        <div className="flex bg-[#6b5c93]/5 rounded-xl p-1">
          {([['wall', t('prayerModal', 'prayerWall', lang)], ['submit', t('prayerModal', 'submitRequest', lang)]] as const).map(([tabVal, label]) => (
            <button key={tabVal} onClick={() => setTab(tabVal)}
              className={`flex-1 py-2.5 text-[0.65rem] sm:text-xs font-semibold tracking-wider uppercase rounded-lg transition cursor-pointer ${
                tab === tabVal ? 'bg-white' : 'text-[#6b6580] hover:text-[#6b5c93]'
              }`}>
              {label}
            </button>
          ))}
        </div>

        {tab === 'wall' ? (
          <div className="space-y-4 max-h-[360px] overflow-y-auto">
            {requests.length === 0 ? (
              <p className="text-center text-sm text-[#6b6580] py-8">{t('prayerModal', 'noPrayers', lang)}</p>
            ) : (
              requests.map((req) => (
                <div key={req.id} className="border border-[rgba(107,92,147,0.06)] rounded-xl p-5 space-y-3 hover:shadow-md transition">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#1a1625]">{req.name}</span>
                    <span className="text-[0.55rem] font-bold tracking-wider uppercase text-[#6b5c93] bg-[#6b5c93]/8 px-2.5 py-1 rounded-full">
                      {req.category}
                    </span>
                  </div>
                  <p className="text-sm text-[#6b6580] leading-relaxed italic">&ldquo;{df(req, 'request', lang)}&rdquo;</p>
                  <button
                    onClick={async () => {
                      if (prayed.has(req.id)) return;
                      try {
                        await prayForRequest(req.id);
                        setPrayed(prev => new Set(prev).add(req.id));
                        setRequests(prev => prev.map(r => r.id === req.id ? { ...r, prayedCount: r.prayedCount + 1 } : r));
                      } catch {}
                    }}
                    className={`flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase transition cursor-pointer ${
                      prayed.has(req.id) ? 'text-[#6b5c93]' : 'text-[#6b6580] hover:text-[#6b5c93]'
                    }`}>
                    <Heart className={`w-3.5 h-3.5 ${prayed.has(req.id) ? 'fill-[#6b5c93]' : ''}`} />
                    {req.prayedCount + (prayed.has(req.id) ? 1 : 0)} {t('prayerModal', 'praying', lang)}
                  </button>
                </div>
              ))
            )}
            <button onClick={() => setTab('submit')}
              className="inline-flex items-center justify-center w-full bg-[#6b5c93] text-white font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-[#4a3d6e] mt-2"
              style={{ fontFamily: 'var(--font-heading)' }}>
               {t('prayerModal', 'addYourPrayer', lang)}
            </button>
          </div>
        ) : (
          !success ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                {CATEGORIES.map((cat) => (
                  <button type="button" key={cat} onClick={() => setCategory(cat)}
                    className={`text-[0.55rem] sm:text-[0.6rem] font-semibold tracking-wider uppercase px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full border transition cursor-pointer ${
                      category === cat ? 'bg-[#6b5c93] text-white border-[#6b5c93]' : 'border-[rgba(107,92,147,0.15)] text-[#6b6580] hover:border-[#6b5c93] hover:text-[#6b5c93]'
                    }`}>
                    {cat}
                  </button>
                ))}
              </div>
              {!isAnonymous && (
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={t('prayerModal', 'yourName', lang)} className="input" />
              )}
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#6b6580]">
                <input type="checkbox" checked={isAnonymous} onChange={e => setIsAnonymous(e.target.checked)} className="accent-[#6b5c93] rounded" />
                {t('prayerModal', 'submitAnonymously', lang)}
              </label>
              <textarea value={request} onChange={e => setRequest(e.target.value)} placeholder={t('prayerModal', 'shareRequest', lang)} rows={4} className="input resize-none" />
              <button type="submit"
                className="inline-flex items-center justify-center gap-2 w-full bg-[#6b5c93] text-white font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-[#4a3d6e]"
                style={{ fontFamily: 'var(--font-heading)' }}>
                <Flame className="w-4 h-4" /> {t('prayerModal', 'submitToWall', lang)}
              </button>
            </form>
          ) : (
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#6b5c93]/10 flex items-center justify-center mx-auto">
                <Check className="w-7 h-7 text-[#6b5c93]" />
              </div>
              <h3 className="heading-md text-[#1a1625]">{t('prayerModal', 'prayerSubmitted', lang)}</h3>
              <p className="text-sm text-[#6b6580]">{t('prayerModal', 'prayerSubmittedMsg', lang)}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
