import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_ITEMS } from '../data';

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    if (slider.scrollWidth <= slider.clientWidth) return;

    const cardWidth = slider.children[0]?.clientWidth ?? 0;
    if (cardWidth <= 0) return;

    const gap = 16;
    const step = cardWidth + gap;
    let interval: ReturnType<typeof setInterval>;

    const slide = () => {
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      const next = slider.scrollLeft + step;
      if (next >= maxScroll) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        slider.scrollTo({ left: next, behavior: 'smooth' });
      }
    };

    interval = setInterval(slide, 2000);

    return () => clearInterval(interval);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (sliderRef.current?.offsetLeft ?? 0));
    setScrollLeft(sliderRef.current?.scrollLeft ?? 0);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    sliderRef.current.scrollLeft = scrollLeft - (e.pageX - sliderRef.current.offsetLeft - startX) * 1.5;
  };
  const stopDragging = () => setIsDragging(false);

  const slidePrev = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    const cardWidth = (slider.children[0] as HTMLElement)?.offsetWidth ?? 0;
    const gap = 16;
    slider.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
  };

  const slideNext = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    const cardWidth = (slider.children[0] as HTMLElement)?.offsetWidth ?? 0;
    const gap = 16;
    slider.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} id="gallery" className="section-light">
      <div className="divider" />

      {/* Header — left-aligned as per Swiss */}
      <div className="max-w-6xl mx-auto px-6 sm:px-12 pt-12 sm:pt-16 pb-8 sm:pb-10 flex items-end justify-between">
        <div>
          <div className="label mb-3">Our Community</div>
          <h2 className="h2 text-[#1a1625]">Life at<br />Kalyanipura</h2>
        </div>
        <span className="text-xs font-mono text-[#8a8299] tracking-widest hidden sm:block pb-2">
          DRAG TO EXPLORE →
        </span>
      </div>

      {/* Scrollable gallery — images in hairline border frames */}
      <div className="relative px-6 sm:px-12">
        <button onClick={slidePrev}
          className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white text-[#4a4456] rounded-full transition cursor-pointer shadow-sm">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={slideNext}
          className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white text-[#4a4456] rounded-full transition cursor-pointer shadow-sm">
          <ChevronRight className="w-5 h-5" />
        </button>
        <div
          ref={sliderRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          className="flex gap-4 overflow-x-auto pb-10 sm:pb-16 cursor-grab active:cursor-grabbing select-none lg:justify-center"
          style={{ scrollbarWidth: 'none' }}>
          {GALLERY_ITEMS.map((item) => (
            <div key={item.id} className="relative shrink-0 w-72 sm:w-80 border border-[#e5e0ec] bg-white p-2 flex flex-col">
              <img
                src={item.imageUrl}
                alt={item.description}
                className="w-full object-cover block"
                style={{ height: '360px', filter: 'saturate(0.85)' }}
                referrerPolicy="no-referrer"
                draggable={false}
              />
              <div className="pt-3 pb-1 flex-1 space-y-1.5">
                <span className="text-[10px] font-mono text-[#7b6ba3] tracking-widest uppercase">
                  {item.category}
                </span>
                <p className="text-xs text-[#4a4456] leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="divider" />
    </section>
  );
}
