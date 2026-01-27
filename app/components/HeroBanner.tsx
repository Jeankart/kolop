'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface CarouselSlide {
  id: number;
  title: string;
  videoUrl: string;
  link: string;
}

const SLIDES: CarouselSlide[] = [
  {
    id: 1,
    title: 'IOS 26 LIVE',
    videoUrl: '/Hero/IOS 26.mp4',
    link: '/ios'
  },
  {
    id: 2,
    title: 'AESTHETIC',
    videoUrl: '/Hero/Aesthetic.mp4',
    link: '/aesthetic'
  },
  {
    id: 3,
    title: 'URBAN',
    videoUrl: '/Hero/Urban.mp4',
    link: '/urban'
  }
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[calc(var(--spacing)*35)] md:h-[calc(var(--spacing)*50)] pt-16 px-4 md:px-6 heroBannerSection">
      <Link href={SLIDES[currentSlide].link}>
        <div className="heroBannerContainer relative w-full h-full rounded-[10px] overflow-hidden bg-gradient-to-br from-zinc-900 to-black block cursor-pointer hover:shadow-2xl transition-shadow duration-300">
          {/* Video Background - Carousel */}
          <div className="heroBannerVideoWrapper">
            {SLIDES.map((slide, index) => (
              <video
                key={slide.id}
                autoPlay
                muted
                loop
                playsInline
                controls={false}
                preload="auto"
                className={`heroBannerVideo absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <source src={slide.videoUrl} type="video/mp4" />
              </video>
            ))}
          </div>

          {/* Overlay - Velo oscuro uniforme al 60% */}
          <div className="heroBannerOverlay absolute inset-0 bg-black/60" />

          {/* Content */}
          <div className="heroBannerContent absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg opacity-50">
              {SLIDES[currentSlide].title}
            </h1>
          </div>

          {/* Carousel indicators */}
          <div className="heroBannerIndicators absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5">
            {SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentSlide(index);
                }}
                className={`heroBannerIndicatorDot rounded transition-all ${
                  index === currentSlide
                    ? 'bg-[#00d084] w-3 h-1'
                    : 'bg-white/30 hover:bg-white/50 w-1 h-1'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Link>
    </section>
  );
}
