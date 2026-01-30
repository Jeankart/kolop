'use client';

import { useState } from 'react';
import { ChevronLeft, Image } from 'lucide-react';
import Link from 'next/link';
import WallpaperModal from './WallpaperModal';
import { useWallpapersByCategory } from '@/lib/hooks/useWallpapers';
import { getCategoryIcons, shouldShowCategoryIcon } from '@/lib/utils/categoryIcons';
import { getJpgPath } from '@/lib/utils/imageHelper';

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

export default function LiveGallery() {
  const { wallpapers, loading } = useWallpapersByCategory('Live');
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);

  const handleWallpaperClick = (wallpaper: Wallpaper) => {
    setSelectedWallpaper(wallpaper);
  };

  const handleNavigate = (wallpaper: Wallpaper) => {
    setSelectedWallpaper(wallpaper);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-10 bg-[#151515] flex items-center justify-center">
        <div className="text-white">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-10 bg-[#151515] dark:bg-[#151515]">
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
            Live
          </h1>
          <div className="flex items-center gap-2 text-zinc-400">
            <span>|</span>
            <Image className="w-4 h-4" />
            <span className="text-sm">{wallpapers.length}</span>
          </div>
        </div>

        {/* Grid de 4 columnas */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          {wallpapers.map((wallpaper) => (
            <div
              key={wallpaper.id}
              onClick={() => handleWallpaperClick(wallpaper)}
              className="aspect-[9/19.5] rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 bg-zinc-800 dark:bg-zinc-800 relative"
            >
              <img
                src={`/wallUploads/${wallpaper.files.cover}`}
                alt={wallpaper.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  if (!img.src.includes('placeholder') && !img.src.includes('data:')) {
                    img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23333" width="100" height="100"/%3E%3C/svg%3E';
                  }
                }}
              />

              {/* Iconos apilados si es Featured, Live o Charging */}
              {shouldShowCategoryIcon(wallpaper.categories) && (
                <div className="absolute top-2 left-2 flex flex-col gap-0.5 leading-none" style={{ pointerEvents: 'none' }}>
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
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedWallpaper && (
        <WallpaperModal 
          isOpen={!!selectedWallpaper} 
          wallpaper={selectedWallpaper}
          wallpapers={wallpapers}
          onClose={() => setSelectedWallpaper(null)}
          onNavigate={handleNavigate}
        />
      )}    </div>
  );
}