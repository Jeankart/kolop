'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import WallpaperModal from './WallpaperModal';
import { useWallpapersFeatured } from '@/lib/hooks/useWallpapers';
import { getCategoryIcons } from '@/lib/utils/categoryIcons';
import { getGifPath, getJpgPath } from '@/lib/utils/imageHelper';
import { Image as LucideImage } from 'lucide-react';

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

export default function FeaturedCarousel() {
  const { wallpapers, loading } = useWallpapersFeatured();
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);

  // Log when wallpapers load
  useEffect(() => {
    if (!loading && wallpapers.length > 0) {
      console.log('[FeaturedCarousel] Loaded wallpapers:', wallpapers.length);
      console.log('[FeaturedCarousel] First wallpaper:', wallpapers[0]);
    }
  }, [wallpapers, loading]);

  const handleWallpaperClick = (wallpaper: Wallpaper) => {
    console.log('[FeaturedCarousel] Clicked wallpaper:', wallpaper);
    setSelectedWallpaper(wallpaper);
  };

  const handleNavigate = (wallpaper: Wallpaper) => {
    setSelectedWallpaper(wallpaper);
  };

  if (loading) {
    return (
      <section className="containSection">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <h2 className="text-lg md:text-2xl font-bold text-white dark:text-white">
                Hot 🔥
              </h2>
              <div className="flex items-center gap-2 text-zinc-400">
                <span>|</span>
                <LucideImage className="w-4 h-4" />
                <span className="text-xs">{wallpapers.length}</span>
              </div>
            </div>
            <Link
              href="/featured"
              className="px-2 py-0.5 rounded-full border border-white bg-black hover:bg-zinc-900 text-white font-normal text-xs transition-colors mr-6 opacity-70"
              style={{ fontSize: '10px' }}
            >
              More
            </Link>
          </div>
          <div className="flex gap-4 pb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 aspect-[9/19.5] w-44 rounded-2xl bg-zinc-800 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="containSection">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <h2 className="text-lg md:text-2xl font-bold text-white dark:text-white">
              Hot 🔥
            </h2>
            <div className="flex items-center gap-2 text-zinc-400">
              <span>|</span>
              <LucideImage className="w-4 h-4" />
              <span className="text-xs">{wallpapers.length}</span>
            </div>
          </div>
          <Link
            href="/featured"
            className="px-2 py-0.5 rounded-full border border-white bg-black hover:bg-zinc-900 text-white font-normal text-xs transition-colors mr-6 opacity-70"
            style={{ fontSize: '10px' }}
          >
            More
          </Link>
        </div>
        
        {/* Carrusel horizontal de wallpapers */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 pb-2" style={{ width: 'fit-content', minWidth: '100%' }}>
            {wallpapers.slice(0, 8).map((wallpaper) => (
              <div
                key={wallpaper.id}
                onClick={() => handleWallpaperClick(wallpaper)}
                className="wallView flex-shrink-0 aspect-[9/19.5] w-44 rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 bg-zinc-200 dark:bg-zinc-800 relative group"
              >
                <img
                  src={`/wallUploads/${wallpaper.files.cover}`}
                  alt={wallpaper.name}
                  className="w-full h-full object-cover blur-placeholder"
                  onLoad={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.classList.remove('blur-placeholder');
                    img.classList.add('loaded');
                  }}
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    const currentSrc = img.src;
                    if (currentSrc.includes('.gif') && !currentSrc.includes('.jpg')) {
                      const jpgSrc = currentSrc.replace(/\.gif$/, '.jpg');
                      if (jpgSrc !== currentSrc) {
                        img.src = jpgSrc;
                        return;
                      }
                    }
                    if (!currentSrc.includes('placeholder') && !currentSrc.includes('data:')) {
                      img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23333" width="100" height="100"/%3E%3C/svg%3E';
                    }
                  }}
                />
                {/* Iconos de categoría */}
                <div className="absolute top-2 left-2 flex flex-col gap-0.5 leading-none">
                  {getCategoryIcons(wallpaper.categories).map((iconUrl, idx) => (
                    <img
                      key={idx}
                      src={iconUrl}
                      alt="category-icon"
                      className="w-4 h-4 block"
                      style={{ imageRendering: 'crisp-edges', lineHeight: '1' }}
                    />
                  ))}
                </div>
              </div>
            ))}
            
            <Link
              href="/featured"
              className="flex-shrink-0 aspect-[9/19.5] w-44 bg-gradient-to-br from-zinc-700 to-zinc-800 dark:from-zinc-700 dark:to-zinc-800 rounded-2xl flex items-center justify-center hover:shadow-lg transition-shadow duration-300"
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

      <WallpaperModal 
        isOpen={!!selectedWallpaper} 
        wallpaper={selectedWallpaper || { id: '0', name: 'wall1', categories: ['Featured'], files: { cover: 'wall1.gif', download: 'wall1.jpg' }, featured: true, downloads: 0 }}
        wallpapers={wallpapers}
        onClose={() => setSelectedWallpaper(null)}
        onNavigate={handleNavigate}
      />
    </section>
  );
}
