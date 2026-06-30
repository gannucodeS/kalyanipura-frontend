import { useState } from 'react';
import { X, Play, Globe, Radio } from 'lucide-react';

interface WatchOnlineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WatchOnlineModal({ isOpen, onClose }: WatchOnlineModalProps) {
  const [isClosing, setIsClosing] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a1625]/60 backdrop-blur-md overflow-y-auto modal-overlay ${isClosing ? 'closing' : ''}`}>
      <div className={`w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 space-y-5 sm:space-y-7 relative shd-card-lg modal-content ${isClosing ? 'closing' : ''}`}>
        <button onClick={handleClose}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#6b5c93]/5 text-[#6b6580] hover:text-[#1a1625] transition cursor-pointer">
          <X className="w-4 h-4" />
        </button>
        <div>
          <span className="label-tag mb-3 block">Stream Now</span>
          <h2 className="heading-md text-[#1a1625]">Watch Online</h2>
          <div className="w-10 h-[3px] mt-3 rounded-full bg-gradient-to-r from-[#e07a68] to-[#7b6ba3] shimmer-line" />
        </div>

        {/* Video Preview */}
        <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <img
            src="https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=800&q=80"
            alt="Stream preview"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'saturate(0.6) brightness(0.65)' }}
            referrerPolicy="no-referrer"
          />
          <button className="absolute inset-0 flex items-center justify-center cursor-pointer group">
            <div className="w-16 h-16 bg-white/90 backdrop-blur-sm flex items-center justify-center rounded-full group-hover:scale-110 transition-all duration-300 shd-card">
              <Play className="w-6 h-6 text-[#6b5c93] fill-[#6b5c93] ml-0.5" />
            </div>
          </button>
          <div className="absolute bottom-3 left-3 flex items-center gap-2 glass rounded-full px-3 py-1.5">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-[0.6rem] font-semibold text-white/90 tracking-wider uppercase">Live Now</span>
          </div>
        </div>

        {/* Streams */}
        <div className="space-y-3">
          <span className="label-tag text-[0.55rem]">Available Streams</span>
          {[
            { label: 'YouTube Live', Icon: Globe, desc: 'HD stream with live chat, available after service as replay.' },
            { label: 'Church Online Platform', Icon: Radio, desc: 'Interactive platform with prayer hosts and notes.' },
          ].map(({ label, Icon, desc }) => (
            <div key={label} className="flex gap-4 items-start p-4 rounded-xl border border-[rgba(107,92,147,0.06)] hover:bg-[#6b5c93]/5 transition cursor-pointer group">
              <div className="w-10 h-10 flex items-center justify-center bg-[#6b5c93]/8 rounded-xl shrink-0 group-hover:scale-110 transition">
                <Icon className="w-4 h-4 text-[#6b5c93]" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#1a1625]">{label}</div>
                <div className="text-xs text-[#6b6580] mt-0.5">{desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-[0.65rem] font-medium text-[#6b6580] tracking-wider text-center">
          Sunday services at 9:00 AM & 11:00 AM
        </div>
      </div>
    </div>
  );
}
