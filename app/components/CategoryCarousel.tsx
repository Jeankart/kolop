'use client';

import { useState } from 'react';
import Link from 'next/link';
import WallpaperModal from './WallpaperModal';
import { getCategoryIcons, shouldShowCategoryIcon } from '@/lib/utils/categoryIcons';

interface Wallpaper {
  id: string;
  name: string;
  categories: string[]; // Cambiar de category a categories array
  image: string;
  featured: boolean;
  downloads: number;
}

interface CategoryCarouselProps {
  title: string;
  emoji: string;
  wallpapers: Wallpaper[];
  folder: string;
  moreLink: string;
}

export default function CategoryCarousel({ title, emoji, wallpapers, folder, moreLink }: CategoryCarouselProps) {
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);

  const handleWallpaperClick = (wallpaper: Wallpaper) => {
    setSelectedWallpaper(wallpaper);
  };

  const handleNavigate = (wallpaper: Wallpaper) => {
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
            {/* Mostrar solo los wallpapers que existen (máximo 7) */}
            {wallpapers.slice(0, 7).map((wallpaper, i) => (
              <div
                key={i}
                onClick={() => handleWallpaperClick(wallpaper)}
                className="wallView flex-shrink-0 aspect-[9/19.5] w-44 rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 bg-zinc-200 dark:bg-zinc-800 relative"
              >
                <img
                  src={`/wallUploads/${wallpaper?.image || 'wall1.png'}`}
                  alt={`${title} wallpaper ${i + 1}`}
                  className="w-full h-full object-cover"
                />
                {/* Iconos apilados si es Featured, Live o Charging */}
                {shouldShowCategoryIcon(wallpaper?.categories) && (
                  <div className="absolute top-2 left-2 bg-black/50 backdrop-blur px-2 py-1 rounded flex flex-col gap-1">
                    {getCategoryIcons(wallpaper?.categories).map((icon, idx) => (
                      <div key={idx} className="text-xs text-white">
                        {icon}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {/* Botón "More" */}
            <Link
              href={moreLink}
              className="flex-shrink-0 aspect-[9/16] w-44 bg-gradient-to-br from-zinc-700 to-zinc-800 dark:from-zinc-700 dark:to-zinc-800 rounded-2xl flex items-center justify-center hover:shadow-lg transition-shadow duration-300"
            >
              <span className="text-sm font-medium underline" style={{ color: '#00d084' }}>
                More
              </span>
            </Link>
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

      {selectedWallpaper && (
        <WallpaperModal 
          isOpen={!!selectedWallpaper} 
          wallpaper={selectedWallpaper}
          wallpapers={wallpapers}
          onClose={() => setSelectedWallpaper(null)}
          onNavigate={handleNavigate}
        />
      )}
    </section>
  );
}

