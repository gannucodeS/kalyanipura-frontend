import { useState } from 'react';
import { X, Heart, Check, Shield } from 'lucide-react';

interface GivingModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const AMOUNTS = ['25', '50', '100', '250', '500'];

export default function GivingModal({ isOpen, onClose }: GivingModalProps) {
  const [selectedAmount, setSelectedAmount] = useState('100');
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once');
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleGive = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSuccess(true);
    setTimeout(() => { setSuccess(false); setName(''); setEmail(''); setSelectedAmount('100'); setCustomAmount(''); onClose(); }, 3500);
  };

  const displayAmount = customAmount || selectedAmount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a1625]/50 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-lg bg-white border border-[#e5e0ec] p-8 space-y-6 relative my-4">
        <button onClick={onClose} className="absolute top-5 right-5 text-[#8a8299] hover:text-[#1a1625] transition cursor-pointer">
          <X className="w-5 h-5" />
        </button>
        {!success ? (
          <>
            <div>
              <div className="label mb-2">Support the Mission</div>
              <h2 className="h3 text-[#1a1625]">Give & Tithe</h2>
              <div className="divider w-10 mt-3" style={{ background: '#7b6ba3' }} />
            </div>
            <p className="text-sm text-[#4a4456]">Your generosity fuels everything we do. All contributions are tax-deductible.</p>

            {/* Frequency */}
            <div className="flex border border-[#e5e0ec]">
              {(['once', 'monthly'] as const).map((f) => (
                <button key={f} onClick={() => setFrequency(f)}
                  className={`flex-1 py-3 text-xs font-semibold tracking-widest uppercase transition cursor-pointer ${
                    frequency === f ? 'bg-[#7b6ba3] text-white' : 'text-[#8a8299] hover:bg-[#f9f7fc]'
                  }`}>
                  {f === 'once' ? 'One Time' : 'Monthly'}
                </button>
              ))}
            </div>

            {/* Amounts */}
            <div>
              <div className="label text-[10px] mb-3">Select Amount (₹)</div>
              <div className="grid grid-cols-5 gap-2 mb-3">
                {AMOUNTS.map((amt) => (
                  <button key={amt} onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }}
                    className={`py-3 text-sm font-semibold border transition cursor-pointer ${
                      selectedAmount === amt && !customAmount
                        ? 'bg-[#7b6ba3] text-white border-[#7b6ba3]'
                        : 'border-[#e5e0ec] text-[#4a4456] hover:border-[#7b6ba3] hover:text-[#7b6ba3]'
                    }`}>
                    ₹{amt}
                  </button>
                ))}
              </div>
              <input type="number" value={customAmount} onChange={e => { setCustomAmount(e.target.value); setSelectedAmount(''); }}
                placeholder="Custom amount (₹)" className="input-field w-full" />
            </div>

            <form onSubmit={handleGive} className="space-y-3">
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full name" className="input-field w-full" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" className="input-field w-full" />
              <button type="submit" className="btn-primary w-full mt-2 flex items-center justify-center gap-2">
                <Heart className="w-4 h-4 fill-white" />
                Give ₹{displayAmount}{frequency === 'monthly' ? '/month' : ''}
              </button>
            </form>
            <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-[#8a8299] tracking-widest">
              <Shield className="w-3 h-3" /> 256-bit SSL Encrypted
            </div>
          </>
        ) : (
          <div className="text-center py-12 space-y-5">
            <div className="w-16 h-16 border-2 border-[#7b6ba3] flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-[#7b6ba3]" />
            </div>
            <h3 className="h3 text-[#1a1625]">Bless You!</h3>
            <p className="text-sm text-[#4a4456]">Your gift of ₹{displayAmount} has been received. A receipt arrives in your inbox shortly.</p>
          </div>
        )}
      </div>
    </div>
  );
}
