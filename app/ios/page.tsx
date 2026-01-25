'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import WallpaperModal from '@/app/components/WallpaperModal';
import { useWallpapersByCategory } from '@/lib/hooks/useWallpapers';
import Header from '@/app/components/Header';
import BottomNavigation from '@/app/components/BottomNavigation';
import ColorFilter from '@/app/components/ColorFilter';

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

export default function iOSPage() {
  const { wallpapers, loading, error } = useWallpapersByCategory('IOS');
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

  if (loading) {
    return (
      <main className="bg-zinc-950 min-h-screen overflow-x-hidden">
        <Header />
        <div className="flex items-center justify-center h-screen">
          <p className="text-white">Cargando...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-zinc-950 min-h-screen overflow-x-hidden">
      <Header />
      <section className="px-4 md:px-6 py-8 max-w-7xl mx-auto ios26MainSection">
        <div className="flex items-center gap-3 mb-4">
          <Link href="/" className="text-white hover:text-[#00d084] transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white ios26Title">
            iOS Infinite
          </h1>
        </div>
        <p className="text-zinc-400 mb-8 ios26Subtitle flex items-center gap-2">
          <Link href="/" className="text-zinc-400 hover:text-[#00d084] transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </Link>
          IOS Infinite Wallpapers
        </p>

        {wallpapers.length > 0 && (
          <ColorFilter wallpapers={wallpapers} onFilterChange={handleFilterChange} />
        )}

        {error && (
          <div className="text-red-500 text-center py-8">{error}</div>
        )}

        {wallpapers.length === 0 && !loading ? (
          <div className="text-zinc-400 text-center py-20">
            <p>No hay wallpapers disponibles</p>
          </div>
        ) : (
          <div className="ios26AsymmetricGrid grid grid-cols-4 gap-4 md:gap-6 auto-rows-[200px]">
            {/* Mostrar wallpapers en el grid */}
            {displayedWallpapers.map((wallpaper, index) => (
              <div
                key={wallpaper.id}
                onClick={() => setSelectedWallpaper(wallpaper)}
                className={`ios26GridItem rounded-lg overflow-hidden bg-gradient-to-br from-zinc-800 to-black hover:shadow-lg transition-shadow cursor-pointer hover:scale-105 transform duration-300 ${
                  index === 0 ? 'col-span-2 row-span-2' :
                  index === 1 ? '' :
                  index === 2 ? '' :
                  index === 3 ? '' :
                  index === 4 ? '' :
                  index === 5 ? '' :
                  index === 6 ? '' :
                  index === 7 ? 'col-span-2 row-span-2' :
                  'col-span-2'
                }`}
              >
                <img
                  src={`/wallUploads/${wallpaper.files.cover}`}
                  alt={wallpaper.name}
                  className="ios26GridImage w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        )}
      </section>
      
      {selectedWallpaper && (
        <WallpaperModal
          wallpaper={selectedWallpaper}
          wallpapers={wallpapers}
          isOpen={!!selectedWallpaper}
          onClose={() => setSelectedWallpaper(null)}
          onNavigate={setSelectedWallpaper}
        />
      )}
      
      <BottomNavigation />
    </main>
  );
}
