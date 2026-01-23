'use client';

import { useState, useEffect } from 'react';
import CategoryGallery from '@/app/components/CategoryGallery';
import { useWallpapersByCategory } from '@/lib/hooks/useWallpapers';

export default function AIPage() {
  const { wallpapers, loading } = useWallpapersByCategory('AI');

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-10 bg-[#151515] flex items-center justify-center">
        <div className="text-white">Cargando...</div>
      </div>
    );
  }

  return <CategoryGallery title="AI" folder="wallAI" wallpapers={wallpapers} />;
}
