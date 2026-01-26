'use client';

import { useState } from 'react';
import Link from 'next/link';
import WallpaperModal from './WallpaperModal';
import { getCategoryIcons, shouldShowCategoryIcon } from '@/lib/utils/categoryIcons';
import { getJpgPath } from '@/lib/utils/imageHelper';
import { Image } from 'lucide-react';

interface Wallpaper {
  id: string;
  name: string;
  categories: string[];
  files: {
    cover: string;
    download: string;
    video?: string;
  };
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
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <h2 className="text-lg md:text-2xl font-bold text-white dark:text-white">
              {emoji} {title}
            </h2>
            <div className="flex items-center gap-2 text-zinc-400">
              <span>|</span>
              <Image className="w-4 h-4" />
              <span className="text-xs">{wallpapers.length}</span>
            </div>
          </div>
          <Link
            href={moreLink}
            className="px-2 py-0.5 rounded-full border border-white bg-black hover:bg-zinc-900 text-white font-normal text-xs transition-colors mr-6 opacity-70"
            style={{ fontSize: '10px' }}
          >
            More
          </Link>
        </div>
        
        {/* Carrusel horizontal de wallpapers */}
        <div className="overflow-x-auto scrollbar-hide touch-pan-x" style={{ WebkitOverflowScrolling: 'touch' }}>
          <div className="flex gap-2 pb-2" style={{ width: 'fit-content', minWidth: '100%' }}>
            {/* Mostrar solo los wallpapers que existen (máximo 8) */}
            {wallpapers.slice(0, 8).map((wallpaper, i) => (
              <div
                key={i}
                onClick={() => handleWallpaperClick(wallpaper)}
                className="wallView flex-shrink-0 aspect-[9/19.5] w-44 rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 bg-zinc-200 dark:bg-zinc-800 relative"
                style={{ touchAction: 'manipulation' }}
              >
                <img
                  src={`/wallUploads/${wallpaper?.files.cover || 'wall1.png'}`}
                  alt={`${title} wallpaper ${i + 1}`}
                  className="w-full h-full object-cover"
                  style={{ pointerEvents: 'none' }}
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    // Fallback to placeholder
                    if (!img.src.includes('placeholder') && !img.src.includes('data:')) {
                      img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23333" width="100" height="100"/%3E%3C/svg%3E';
                    }
                  }}
                />
                {/* Iconos apilados si es Featured, Live o Charging */}
                {shouldShowCategoryIcon(wallpaper?.categories) && (
                  <div className="absolute top-2 left-2 flex flex-col gap-0.5 leading-none" style={{ pointerEvents: 'none' }}>
                    {getCategoryIcons(wallpaper?.categories).map((iconUrl, idx) => (
                      <img
                        key={idx}
                        src={iconUrl}
                        alt="category-icon"
                        className="w-4 h-4 block"
                        style={{ imageRendering: 'crisp-edges', lineHeight: '1' }}
                      />
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
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
            scroll-behavior: smooth;
            overflow-y: hidden !important;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none !important;
            height: 0 !important;
          }
          .scrollbar-hide::-webkit-scrollbar-track {
            display: none !important;
          }
          .scrollbar-hide::-webkit-scrollbar-thumb {
            display: none !important;
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

