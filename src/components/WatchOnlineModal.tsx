import { X, Play, Globe, Radio } from 'lucide-react';

interface WatchOnlineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WatchOnlineModal({ isOpen, onClose }: WatchOnlineModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a1625]/50 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-lg bg-white border border-[#e5e0ec] p-8 space-y-7 relative">
        <button onClick={onClose} className="absolute top-5 right-5 text-[#8a8299] hover:text-[#1a1625] transition cursor-pointer">
          <X className="w-5 h-5" />
        </button>
        <div>
          <div className="label mb-2">Stream Now</div>
          <h2 className="h3 text-[#1a1625]">Watch Online</h2>
          <div className="divider w-10 mt-3" style={{ background: '#7b6ba3' }} />
        </div>

        {/* Video preview */}
        <div className="relative border border-[#e5e0ec] overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <img
            src="https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=800&q=80"
            alt="Stream preview"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'saturate(0.6) brightness(0.65)' }}
            referrerPolicy="no-referrer"
          />
          <button className="absolute inset-0 flex items-center justify-center cursor-pointer group">
            <div className="w-14 h-14 bg-white flex items-center justify-center group-hover:bg-[#f9f7fc] transition">
              <Play className="w-5 h-5 text-[#7b6ba3] fill-[#7b6ba3] ml-0.5" />
            </div>
          </button>
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-mono text-white/90 tracking-widest uppercase">Live Now</span>
          </div>
        </div>

        {/* Streams */}
        <div className="space-y-3">
          <div className="label text-[10px]">Available Streams</div>
          {[
            { label: 'YouTube Live', Icon: Globe, desc: 'HD stream with live chat, available after service as replay.' },
            { label: 'Church Online Platform', Icon: Radio, desc: 'Interactive platform with prayer hosts and notes.' },
          ].map(({ label, Icon, desc }) => (
            <div key={label} className="flex gap-4 items-start p-4 border border-[#e5e0ec] hover:bg-[#f9f7fc] transition cursor-pointer">
              <div className="w-9 h-9 flex items-center justify-center bg-[#7b6ba3]/10 shrink-0">
                <Icon className="w-4 h-4 text-[#7b6ba3]" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#1a1625]">{label}</div>
                <div className="text-xs text-[#8a8299] mt-0.5">{desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-xs font-mono text-[#8a8299] tracking-wider text-center">
          Sunday services at 9:00 AM & 11:00 AM
        </div>
      </div>
    </div>
  );
}
