'use client';

import { useEffect, useState } from 'react';
import type { MockImage } from '@/lib/mock/site';
import ResponsiveImage from '@/components/ui/ResponsiveImage';

type HeroSliderProps = {
  id?: string;
  slides: MockImage[];
};

export default function HeroSlider({ id = 'hero-slider', slides }: HeroSliderProps) {
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
    <section id={id} className="mock-section-hero relative h-[100svh] min-h-[520px] w-full overflow-hidden md:h-[100svh]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.12),_transparent_25%),linear-gradient(140deg,_rgba(173,139,87,0.14),_transparent_45%)]" />
      <div id={`${id}-inner`} className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            id={`${id}-slide-${index + 1}`}
            key={slide.src}
            className={`mock-hero-slide absolute inset-0 transition-opacity duration-[1400ms] ${
              index === activeIndex ? 'is-active opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            <ResponsiveImage
              src={slide.src}
              alt={slide.alt}
              pictureClassName="block h-full w-full"
              className="h-full w-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(8,10,8,0.08),_rgba(8,10,8,0.16))]" />
          </div>
        ))}

        <div id={`${id}-controls`} className="pointer-events-none absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 hidden items-center justify-between px-3 md:flex md:px-6 lg:px-8">
          <button
            id={`${id}-prev`}
            type="button"
            aria-label="前の画像へ"
            onClick={() => moveSlide('prev')}
            className="pointer-events-auto flex h-10 w-10 items-center justify-center border border-white/35 bg-black/18 text-2xl text-white transition hover:bg-black/32 md:h-14 md:w-14"
          >
            &#8249;
          </button>
          <button
            id={`${id}-next`}
            type="button"
            aria-label="次の画像へ"
            onClick={() => moveSlide('next')}
            className="pointer-events-auto flex h-10 w-10 items-center justify-center border border-white/35 bg-black/18 text-2xl text-white transition hover:bg-black/32 md:h-14 md:w-14"
          >
            &#8250;
          </button>
        </div>
      </div>
    </section>
  );
}
