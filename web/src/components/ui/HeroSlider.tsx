'use client';

import { useEffect, useState } from 'react';
import ResponsiveImage from '@/components/ui/ResponsiveImage';

type HeroSlide = {
  src: string;
  alt: string;
};

type HeroSliderProps = {
  slides: HeroSlide[];
};

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5200);

    return () => window.clearInterval(intervalId);
  }, [slides.length]);

  function moveSlide(direction: 'prev' | 'next') {
    setActiveIndex((current) => {
      if (direction === 'prev') {
        return current === 0 ? slides.length - 1 : current - 1;
      }
      return (current + 1) % slides.length;
    });
  }

  return (
    <section className="relative h-[82svh] min-h-[520px] w-full overflow-hidden md:h-[100svh] bg-primary-dark">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.12),_transparent_25%),linear-gradient(140deg,_rgba(139,105,20,0.14),_transparent_45%)]" />
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ${
              index === activeIndex ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            <ResponsiveImage
              src={slide.src}
              alt={slide.alt}
              pictureClassName="block h-full w-full"
              className={`h-full w-full object-cover ${index === activeIndex ? 'animate-hero-zoom' : ''}`}
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(8,10,8,0.08),_rgba(8,10,8,0.16))]" />
          </div>
        ))}
      </div>

      {/* ナビゲーションボタン */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            aria-label="前のスライド"
            onClick={() => moveSlide('prev')}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center border border-white/30 bg-black/20 text-white backdrop-blur-sm transition hover:bg-black/40 md:h-12 md:w-12"
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button
            type="button"
            aria-label="次のスライド"
            onClick={() => moveSlide('next')}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center border border-white/30 bg-black/20 text-white backdrop-blur-sm transition hover:bg-black/40 md:h-12 md:w-12"
          >
            <span aria-hidden="true">›</span>
          </button>
        </>
      )}

      {/* インジケーター */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`スライド ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={`h-1 transition-all duration-300 ${
                index === activeIndex ? 'w-8 bg-white' : 'w-4 bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
