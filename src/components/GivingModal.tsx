import { useState } from 'react';
import { X, Heart, Check, Shield } from 'lucide-react';
import { submitGiving } from '../api';

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
  const [isClosing, setIsClosing] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setSuccess(false);
      setName('');
      setEmail('');
      setSelectedAmount('100');
      setCustomAmount('');
      onClose();
    }, 300);
  };

  const handleGive = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    try {
      await submitGiving({ name, email, amount: Number(displayAmount), frequency });
      setSuccess(true);
      setTimeout(() => { handleClose(); }, 3500);
    } catch {}
  };

  const displayAmount = customAmount || selectedAmount;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a1625]/60 backdrop-blur-md overflow-y-auto modal-overlay ${isClosing ? 'closing' : ''}`}>
      <div className={`w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 space-y-5 sm:space-y-6 relative shd-card-lg my-4 modal-content ${isClosing ? 'closing' : ''}`}>
        <button onClick={handleClose}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#6b5c93]/5 text-[#6b6580] hover:text-[#1a1625] transition cursor-pointer">
          <X className="w-4 h-4" />
        </button>
        {!success ? (
          <>
            <div>
              <span className="label-tag mb-3 block">Support the Mission</span>
              <h2 className="heading-md text-[#1a1625]">Give & Tithe</h2>
              <div className="w-10 h-[3px] mt-3 rounded-full bg-gradient-to-r from-[#e07a68] to-[#7b6ba3] shimmer-line" />
            </div>
            <p className="text-sm text-[#6b6580]">Your generosity fuels everything we do. All contributions are tax-deductible.</p>

            {/* Frequency */}
            <div className="flex bg-[#6b5c93]/5 rounded-xl p-1">
              {(['once', 'monthly'] as const).map((f) => (
                <button key={f} onClick={() => setFrequency(f)}
                  className={`flex-1 py-2.5 text-[0.65rem] sm:text-xs font-semibold tracking-wider uppercase rounded-lg transition cursor-pointer ${
                    frequency === f ? 'bg-white text-[#6b5c93] ' : 'text-[#6b6580] hover:text-[#6b5c93]'
                  }`}>
                  {f === 'once' ? 'One Time' : 'Monthly'}
                </button>
              ))}
            </div>

            {/* Amounts */}
            <div>
              <span className="label-tag text-[0.55rem] mb-3 block">Select Amount</span>
              <div className="grid grid-cols-5 gap-2 mb-3">
                {AMOUNTS.map((amt) => (
                  <button key={amt} onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }}
                    className={`py-2.5 sm:py-3 text-xs sm:text-sm font-semibold rounded-xl border transition cursor-pointer ${
                      selectedAmount === amt && !customAmount
                        ? 'bg-[#6b5c93] text-white border-[#6b5c93] shd-btn'
                        : 'border-[rgba(107,92,147,0.12)] text-[#6b6580] hover:border-[#6b5c93] hover:text-[#6b5c93]'
                    }`}>
                    ₹{amt}
                  </button>
                ))}
              </div>
              <input type="number" value={customAmount} onChange={e => { setCustomAmount(e.target.value); setSelectedAmount(''); }}
                placeholder="Custom amount" className="input" />
            </div>

            <form onSubmit={handleGive} className="space-y-3">
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full name" className="input" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" className="input" />
              <button type="submit"
                className="inline-flex items-center justify-center gap-2 w-full bg-[#6b5c93] text-white font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-[#4a3d6e] mt-2"
                style={{ fontFamily: 'var(--font-heading)' }}>
                <Heart className="w-4 h-4 fill-white" />
                Give ₹{displayAmount}{frequency === 'monthly' ? '/month' : ''}
              </button>
            </form>
            <div className="flex items-center justify-center gap-2 text-[0.6rem] font-semibold text-[#6b6580] tracking-wider">
              <Shield className="w-3.5 h-3.5" /> 256-bit SSL Encrypted
            </div>
          </>
        ) : (
          <div className="text-center py-12 space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#6b5c93]/10 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-[#6b5c93]" />
            </div>
            <h3 className="heading-md text-[#1a1625]">Bless You!</h3>
            <p className="text-sm text-[#6b6580]">Your gift of ₹{displayAmount} has been received. A receipt arrives in your inbox shortly.</p>
          </div>
        )}
      </div>
    </div>
  );
}
