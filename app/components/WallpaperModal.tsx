'use client';

import { X, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef } from 'react';

interface Wallpaper {
  id: number;
  name: string;
}

interface WallpaperModalProps {
  isOpen: boolean;
  wallpaper: Wallpaper;
  wallpapers: Wallpaper[];
  onClose: () => void;
  onNavigate: (wallpaper: Wallpaper) => void;
}

export default function WallpaperModal({ isOpen, wallpaper, wallpapers, onClose, onNavigate }: WallpaperModalProps) {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [animationDirection, setAnimationDirection] = useState<'next' | 'prev'>('next');
  const containerRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const currentIndex = wallpapers.findIndex(w => w.id === wallpaper.id);
  
  const goToPrevious = () => {
    if (currentIndex > 0) {
      setAnimationDirection('prev');
      onNavigate(wallpapers[currentIndex - 1]);
    }
  };

  const goToNext = () => {
    if (currentIndex < wallpapers.length - 1) {
      setAnimationDirection('next');
      onNavigate(wallpapers[currentIndex + 1]);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left - ir al siguiente
      goToNext();
    } else if (touchEnd - touchStart > 50) {
      // Swipe right - ir al anterior
      goToPrevious();
    }
  };

  const handleDownload = async () => {
    try {
      // Intentar descargar PNG primero
      let imageUrl = `/wallFeatured/${wallpaper.name.replace('.gif', 'lg.png')}`;
      
      const response = await fetch(imageUrl);
      
      // Si no existe PNG, intentar con JPG
      if (!response.ok) {
        imageUrl = `/wallFeatured/${wallpaper.name.replace('.gif', 'lg.jpg')}`;
      }

      const blob = await fetch(imageUrl).then(res => res.blob());
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = wallpaper.name.replace('.gif', '.png');
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error descargando imagen:', error);
    }
  };

  return (
    <div 
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center imgPreviewer"
    >
      {/* Botón Close circular */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-12 h-12 rounded-full backdrop-blur-md bg-[#686868]/20 hover:bg-[#686868]/30 border border-[#686868]/30 flex items-center justify-center transition-colors duration-200 z-10"
        aria-label="Cerrar"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Botón Previous */}
      {currentIndex > 0 && (
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full backdrop-blur-md bg-[#686868]/20 hover:bg-[#686868]/30 border border-[#686868]/30 flex items-center justify-center transition-colors duration-200 z-10"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Botón Next */}
      {currentIndex < wallpapers.length - 1 && (
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full backdrop-blur-md bg-[#686868]/20 hover:bg-[#686868]/30 border border-[#686868]/30 flex items-center justify-center transition-colors duration-200 z-10"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Contenedor de imagen fullscreen */}
      <div className="w-full h-full flex items-center justify-center">
        <img
          src={`/wallFeatured/${wallpaper.name.replace('.gif', 'lg.png')}`}
          alt="Wallpaper"
          className={`w-auto h-full object-cover rounded-2xl wallpaperImage ${animationDirection === 'prev' ? 'prev' : ''}`}
          onError={(e) => {
            // Fallback a JPG si PNG no existe
            (e.target as HTMLImageElement).src = `/wallFeatured/${wallpaper.name.replace('.gif', 'lg.jpg')}`;
          }}
        />
      </div>

      {/* Botón Descarga alargado en la parte inferior */}
      <button
        onClick={handleDownload}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 backdrop-blur-md bg-[#686868]/20 hover:bg-[#686868]/30 border border-[#686868]/30 text-white font-semibold py-3 px-12 rounded-full flex items-center gap-2 transition-colors duration-200"
      >
        <Download className="w-5 h-5" />
        Descargar
      </button>

      {/* Indicador de página */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-white/60 text-sm">
        {currentIndex + 1} / {wallpapers.length}
      </div>
    </div>
  );
}
