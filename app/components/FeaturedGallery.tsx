'use client';

import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import WallpaperModal from './WallpaperModal';

const featuredWallpapers = [
  { id: 1, name: 'wall1.gif' },
  { id: 2, name: 'wall2.gif' },
  { id: 3, name: 'wall3.gif' },
  { id: 4, name: 'wall4.gif' },
  { id: 5, name: 'wall5.gif' },
  { id: 6, name: 'wall6.gif' },
  { id: 7, name: 'wall7.gif' },
];

export default function FeaturedGallery() {
  const [selectedWallpaper, setSelectedWallpaper] = useState<{ id: number; name: string } | null>(null);

  const handleWallpaperClick = (wallpaper: { id: number; name: string }) => {
    setSelectedWallpaper(wallpaper);
  };

  const handleNavigate = (wallpaper: { id: number; name: string }) => {
    setSelectedWallpaper(wallpaper);
  };

  return (
    <div className="min-h-screen pt-20 pb-10 bg-[#151515] dark:bg-[#151515]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header con botón de regreso */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-colors"
            aria-label="Volver"
          >
            <ChevronLeft className="w-6 h-6 text-white dark:text-white" />
          </Link>
          <h1 className="text-lg md:text-2xl font-bold text-white dark:text-white">
            Destacados
          </h1>
        </div>

        {/* Grid de 4 columnas */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          {featuredWallpapers.map((wallpaper) => (
            <div
              key={wallpaper.id}
              onClick={() => handleWallpaperClick(wallpaper)}
              className="aspect-[9/19.5] rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 bg-zinc-800 dark:bg-zinc-800"
            >
              <img
                src={`/wallFeatured/${wallpaper.name}`}
                alt={`Wallpaper ${wallpaper.id}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <WallpaperModal 
        isOpen={!!selectedWallpaper} 
        wallpaper={selectedWallpaper || { id: 0, name: 'wall1.gif' }}
        wallpapers={featuredWallpapers}
        onClose={() => setSelectedWallpaper(null)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
