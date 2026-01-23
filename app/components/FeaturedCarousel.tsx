'use client';

import { useState } from 'react';
import Link from 'next/link';
import WallpaperModal from './WallpaperModal';
import { useWallpapersFeatured } from '@/lib/hooks/useWallpapers';

interface Wallpaper {
  id: string;
  name: string;
  category: string;
  image: string;
  featured: boolean;
  downloads: number;
}

export default function FeaturedCarousel() {
  const { wallpapers, loading } = useWallpapersFeatured();
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);

  const handleWallpaperClick = (wallpaper: Wallpaper) => {
    setSelectedWallpaper(wallpaper);
  };

  const handleNavigate = (wallpaper: Wallpaper) => {
    setSelectedWallpaper(wallpaper);
  };

  if (loading) {
    return (
      <section className="containSection">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-lg md:text-2xl font-bold mb-8 text-white dark:text-white">
            Hot 🔥
          </h2>
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
        <h2 className="text-lg md:text-2xl font-bold mb-8 text-white dark:text-white">
          Hot 🔥
        </h2>
        
        {/* Carrusel horizontal de wallpapers */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 pb-2" style={{ width: 'fit-content', minWidth: '100%' }}>
            {wallpapers.map((wallpaper) => (
              <div
                key={wallpaper.id}
                onClick={() => handleWallpaperClick(wallpaper)}
                className="wallView flex-shrink-0 aspect-[9/19.5] w-44 rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 bg-zinc-200 dark:bg-zinc-800 relative group"
              >
                <img
                  src={`/wallFeatured/${wallpaper.image}`}
                  alt={wallpaper.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `/wallFeatured/${wallpaper.image.replace('.png', '.jpg')}`;
                  }}
                />
                {/* Icono de categoría */}
                <div className="absolute top-2 left-2 bg-black/50 backdrop-blur px-2 py-1 rounded text-xs text-white">
                  {wallpaper.category === 'Live' && '🔴'}
                  {wallpaper.category === 'Charging' && '🔌'}
                  {wallpaper.category === 'Featured' && '⭐'}
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
        wallpaper={selectedWallpaper || { id: '0', name: 'wall1', category: 'Featured', image: 'wall1.gif', featured: true, downloads: 0 }}
        wallpapers={wallpapers}
        onClose={() => setSelectedWallpaper(null)}
        onNavigate={handleNavigate}
      />
    </section>
  );
}
