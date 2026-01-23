'use client';

import { useState, useEffect } from 'react';
import CategoryGallery from '@/app/components/CategoryGallery';
import { useWallpapersByCategory } from '@/lib/hooks/useWallpapers';

export default function ChargingPage() {
  const { wallpapers, loading, error } = useWallpapersByCategory('Charging');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen pt-20 pb-10 bg-[#151515] flex items-center justify-center">
        <div className="text-white">Cargando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 pb-10 bg-[#151515] flex items-center justify-center">
        <div className="text-white text-center">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  if (wallpapers.length === 0) {
    return (
      <div className="min-h-screen pt-20 pb-10 bg-[#151515] flex items-center justify-center">
        <div className="text-white text-center">
          <p>No hay wallpapers en esta categoría</p>
          <p className="text-sm text-gray-400 mt-2">Total: {wallpapers.length}</p>
        </div>
      </div>
    );
  }

  return <CategoryGallery title="Charging" folder="wallCharging" wallpapers={wallpapers} />;
}

