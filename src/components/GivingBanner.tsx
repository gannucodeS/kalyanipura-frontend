import { Heart, ArrowRight } from 'lucide-react';

interface GivingBannerProps {
  onOpenGiving: () => void;
}

export default function GivingBanner({ onOpenGiving }: GivingBannerProps) {
  return (
    <section className="section-white">
      <div className="divider" />

      <div className="max-w-6xl mx-auto px-6 sm:px-12 py-16 sm:py-24">
        <div className="border border-[#e5e0ec] p-8 sm:p-16 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 items-center">
          {/* Left: copy */}
          <div className="space-y-6">
            <div className="w-12 h-12 bg-[#7b6ba3] flex items-center justify-center">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <div className="label">Support the Mission</div>
            <h2 className="h2 text-[#1a1625]">Generosity Transforms Communities</h2>
            <div className="divider w-12" style={{ background: '#7b6ba3' }} />
            <p className="text-sm text-[#4a4456] leading-relaxed max-w-md">
              Your faithful giving sustains our ministries, outreach programs, and community services. Every gift — of any size — makes an eternal difference in the lives we serve together.
            </p>
          </div>

          {/* Right: actions + trust */}
          <div className="space-y-6">
            <div className="flex flex-col gap-3">
              <button onClick={onOpenGiving} className="btn-primary w-full flex items-center justify-center gap-2">
                <Heart className="w-4 h-4 fill-white" />
                Give Now
              </button>
              <button onClick={onOpenGiving} className="btn-outline w-full flex items-center justify-center gap-2">
                Learn About Tithing
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Trust indicators — tabular list */}
            <div className="space-y-2 border-t border-[#e5e0ec] pt-6">
              {['Secure & Encrypted', 'Fully Transparent', 'Tax Deductible'].map((item) => (
                <div key={item} className="flex items-center gap-3 text-xs font-mono text-[#8a8299] tracking-wider">
                  <div className="w-1 h-1 bg-[#7b6ba3]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="divider" />
    </section>
  );
}
