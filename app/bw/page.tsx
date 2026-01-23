'use client';

import { useState, useEffect } from 'react';
import CategoryGallery from '@/app/components/CategoryGallery';
import { useWallpapersByCategory } from '@/lib/hooks/useWallpapers';

export default function BWPage() {
  const { wallpapers, loading } = useWallpapersByCategory('B&W');

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-10 bg-[#151515] flex items-center justify-center">
        <div className="text-white">Cargando...</div>
      </div>
    );
  }

  return <CategoryGallery title="B & W" folder="wallB&W" wallpapers={wallpapers} />;
}

