'use client';

import { useState } from 'react';
import Link from 'next/link';
import WallpaperModal from './WallpaperModal';

interface CategoryCarouselProps {
  title: string;
  emoji: string;
  wallpapers: Array<{ id: number; name: string }>;
  folder: string;
  moreLink: string;
}

export default function CategoryCarousel({ title, emoji, wallpapers, folder, moreLink }: CategoryCarouselProps) {
  const [selectedWallpaper, setSelectedWallpaper] = useState<{ id: number; name: string } | null>(null);

  const handleWallpaperClick = (wallpaper: { id: number; name: string }) => {
    setSelectedWallpaper(wallpaper);
  };

  const handleNavigate = (wallpaper: { id: number; name: string }) => {
    setSelectedWallpaper(wallpaper);
  };

  return (
    <section className="containSection">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-lg md:text-2xl font-bold mb-8 text-white dark:text-white">
          {emoji} {title}
        </h2>
        
        {/* Carrusel horizontal de wallpapers */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 pb-2" style={{ width: 'fit-content', minWidth: '100%' }}>
            {Array.from({ length: 8 }).map((_, i) => {
              const isLastItem = i === 7;
              return isLastItem ? (
                <Link
                  key={i}
                  href={moreLink}
                  className="flex-shrink-0 aspect-[9/16] w-44 bg-gradient-to-br from-zinc-700 to-zinc-800 dark:from-zinc-700 dark:to-zinc-800 rounded-2xl flex items-center justify-center hover:shadow-lg transition-shadow duration-300"
                >
                  <span className="text-sm font-medium underline" style={{ color: '#00d084' }}>
                    More
                  </span>
                </Link>
              ) : (
                <div
                  key={i}
                  onClick={() => handleWallpaperClick(wallpapers[i])}
                  className="wallView flex-shrink-0 aspect-[9/19.5] w-44 rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 bg-zinc-200 dark:bg-zinc-800"
                >
                  <img
                    src={`/${folder}/${wallpapers[i]?.name || 'wall1.gif'}`}
                    alt={`${title} wallpaper ${i + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              );
            })}
          </div>
        </div>

        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
            scroll-behavior: smooth;
          }
        `}</style>
      </div>

      <WallpaperModal 
        isOpen={!!selectedWallpaper} 
        wallpaper={selectedWallpaper || { id: 0, name: 'wall1.gif' }}
        wallpapers={wallpapers}
        onClose={() => setSelectedWallpaper(null)}
        onNavigate={handleNavigate}
      />
    </section>
  );
}
