'use client';

import { useState } from 'react';
import { ChevronLeft, Image } from 'lucide-react';
import Link from 'next/link';
import WallpaperModal from './WallpaperModal';
import ColorFilter from './ColorFilter';
import { getCategoryIcons, shouldShowCategoryIcon } from '@/lib/utils/categoryIcons';
import { getGifPath, getJpgPath } from '@/lib/utils/imageHelper';

interface Wallpaper {
  id: string;
  name: string;
  categories: string[]; // Cambiar de category a categories array
  image: string;
  featured: boolean;
  downloads: number;
}

interface CategoryGalleryProps {
  title: string;
  folder: string;
  wallpapers: Wallpaper[];
}

export default function CategoryGallery({ title, folder, wallpapers }: CategoryGalleryProps) {
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);
  const [filteredWallpapers, setFilteredWallpapers] = useState<Wallpaper[]>([]);
  const [hasFilter, setHasFilter] = useState(false);

  const handleFilterChange = (filtered: Wallpaper[]) => {
    if (filtered.length === wallpapers.length) {
      setHasFilter(false);
      setFilteredWallpapers([]);
    } else {
      setHasFilter(true);
      setFilteredWallpapers(filtered);
    }
  };

  const displayedWallpapers = hasFilter ? filteredWallpapers : wallpapers;

  const handleWallpaperClick = (wallpaper: Wallpaper) => {
    setSelectedWallpaper(wallpaper);
  };

  const handleNavigate = (wallpaper: Wallpaper) => {
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
            {title}
          </h1>
          <div className="flex items-center gap-2 text-zinc-400">
            <span>|</span>
            <Image className="w-4 h-4" />
            <span className="text-sm">{wallpapers.length}</span>
          </div>
        </div>

        {/* ColorFilter */}
        {wallpapers.length > 0 && (
          <ColorFilter wallpapers={wallpapers} onFilterChange={handleFilterChange} />
        )}

        {/* Grid de 4 columnas */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          {displayedWallpapers.map((wallpaper) => (
            <div
              key={wallpaper.id}
              onClick={() => handleWallpaperClick(wallpaper)}
              className="aspect-[9/19.5] rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 bg-zinc-800 dark:bg-zinc-800 relative"
            >
              <img
                src={`/wallUploads/${getGifPath(wallpaper.image)}`}
                alt={wallpaper.name}
                className="w-full h-full object-cover"
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
              {/* Iconos apilados si es Featured, Live o Charging */}
              {shouldShowCategoryIcon(wallpaper.categories) && (
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
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedWallpaper && (
        <WallpaperModal 
          isOpen={!!selectedWallpaper} 
          wallpaper={selectedWallpaper}
          wallpapers={displayedWallpapers}
          onClose={() => setSelectedWallpaper(null)}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}

