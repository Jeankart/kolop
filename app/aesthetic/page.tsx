'use client';

import { useState, useEffect } from 'react';
import CategoryGallery from '@/app/components/CategoryGallery';
import { useWallpapersByCategory } from '@/lib/hooks/useWallpapers';

export default function AestheticPage() {
  const { wallpapers, loading } = useWallpapersByCategory('Aesthetic');

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-10 bg-[#151515] flex items-center justify-center">
        <div className="text-white">Cargando...</div>
      </div>
    );
  }

  return <CategoryGallery title="Aesthetic" folder="wallAesthetic" wallpapers={wallpapers} />;
}

