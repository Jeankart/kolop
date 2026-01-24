'use client';

import { X, Download, ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Wallpaper {
  id: string;
  name: string;
  categories: string[]; // Cambiar de category a categories array
  image: string;
  featured: boolean;
  downloads: number;
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
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentIndex = wallpapers.findIndex(w => w.id === wallpaper.id);
  
  // Función para convertir nombre de archivo cover (.gif) a jpg
  const getLgImagePath = (imagePath: string) => {
    return imagePath.replace(/\.gif$/, '.jpg');
  };
  
  // Función para obtener la ruta del video .mp4
  const getMovPath = (imagePath: string) => {
    return imagePath.replace(/\.gif$/, '.mp4');
  };
  
  // Función para obtener la ruta completa de la imagen
  const getImageUrl = (wp: Wallpaper) => {
    // Siempre usar wallUploads como carpeta principal, con fallback a carpetas antiguas
    const lgPath = getLgImagePath(wp.image);
    return `/wallUploads/${lgPath}`;
  };

  // Función para obtener ruta del video
  const getMovUrl = (wp: Wallpaper) => {
    const movPath = getMovPath(wp.image);
    return `/wallUploads/${movPath}`;
  };

  // Verificar si tiene categoría Live
  const hasLiveCategory = wallpaper.categories?.includes('Live');
  
  // Estado para saber si mostrar video o imagen
  const [showMov, setShowMov] = useState(() => wallpaper.categories?.includes('Live') ?? false);
  
  // Actualizar showMov cuando el wallpaper cambia
  useEffect(() => {
    setShowMov(wallpaper.categories?.includes('Live') ?? false);
  }, [wallpaper.id]);

  // Desabilitar scroll vertical cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      // Prevenir scroll vertical
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      
      return () => {
        // Restaurar scroll
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        document.body.style.touchAction = '';
      };
    }
  }, [isOpen]);
  
  // Precargar imágenes
  useEffect(() => {
    const preloadImage = (imagePath: string) => {
      const img = new Image();
      img.src = imagePath;
      img.onerror = () => {
        // Fallback a cover si lg no existe
        const fallbackImg = new Image();
        const coverName = imagePath.replace('lg.jpg', '').replace(/\.$/, '') + '.gif';
        fallbackImg.src = `${imagePath.substring(0, imagePath.lastIndexOf('/'))}/${coverName}`;
      };
    };

    // Precargar siguiente
    if (currentIndex < wallpapers.length - 1) {
      preloadImage(getImageUrl(wallpapers[currentIndex + 1]));
    }
    // Precargar anterior
    if (currentIndex > 0) {
      preloadImage(getImageUrl(wallpapers[currentIndex - 1]));
    }
  }, [currentIndex, wallpapers, isOpen]);

  if (!isOpen) return null;

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setDragOffset(0);
      onNavigate(wallpapers[currentIndex - 1]);
    }
  };

  const goToNext = () => {
    if (currentIndex < wallpapers.length - 1) {
      setDragOffset(0);
      onNavigate(wallpapers[currentIndex + 1]);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    // Prevenir scroll vertical
    e.preventDefault();
    
    const currentTouch = e.targetTouches[0].clientX;
    const diff = currentTouch - touchStart;
    setDragOffset(diff);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX);
    setIsDragging(false);
    handleSwipe();
    setDragOffset(0);
  };

  const handleSwipe = () => {
    const diff = touchStart - touchEnd;
    
    // Sensibilidad: 30px para swipe
    if (diff > 30) {
      // Swipe left - siguiente
      goToNext();
    } else if (diff < -30) {
      // Swipe right - anterior
      goToPrevious();
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadError(null);
    setDownloadSuccess(false);

    try {
      let imageUrl = getImageUrl(wallpaper);
      
      let response = await fetch(imageUrl);
      
      if (!response.ok) {
        imageUrl = `/wallUploads/${wallpaper.image}`;
        response = await fetch(imageUrl);
      }
      
      if (!response.ok) {
        const folder = `wall${wallpaper.categories[0] || 'Featured'}`;
        imageUrl = `/${folder}/${wallpaper.image}`;
        response = await fetch(imageUrl);
      }

      if (!response.ok) {
        throw new Error('Image not found');
      }

      const blob = await response.blob();
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const filename = `${wallpaper.name}.jpg`;

      if (isIOS) {
        // iOS: Usar Web Share API para mostrar solo opciones relevantes
        if (navigator.share) {
          try {
            const file = new File([blob], filename, { type: 'image/jpeg' });
            await navigator.share({
              files: [file],
              title: 'Wallpaper',
              text: wallpaper.name,
            });
            setDownloadSuccess(true);
            setTimeout(() => {
              setDownloadSuccess(false);
            }, 3000);
            setIsDownloading(false);
            return;
          } catch (error) {
            // Usuario canceló, continuar con fallback
            if ((error as any).name === 'AbortError') {
              setIsDownloading(false);
              return;
            }
          }
        }
        
        // Fallback si Web Share no está disponible
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
      } else {
        // Android: Descargar directamente
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }

      // Mostrar mensaje de éxito
      setDownloadSuccess(true);
      setTimeout(() => {
        setDownloadSuccess(false);
      }, 3000);

    } catch (error) {
      console.error('Error downloading image:', error);
      setDownloadError('Failed to download wallpaper');
      setTimeout(() => {
        setDownloadError(null);
      }, 3000);
    } finally {
      setIsDownloading(false);
    }
  };
  };

  // Perlin-like noise generator
  const perlin = (x: number, y: number, time: number): number => {
    return Math.sin(x * 12.9898 + y * 78.233 + time * 43758.5453) * 0.5 + 0.5;
  };

  const handleDownloadLive = async () => {
    setIsDownloading(true);
    setDownloadError(null);
    setDownloadSuccess(false);

    try {
      const movUrl = getMovUrl(wallpaper);
      const response = await fetch(movUrl);
      
      if (!response.ok) {
        throw new Error('Live wallpaper file not found');
      }

      const blob = await response.blob();
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const filename = `${wallpaper.name}.mp4`;

      if (isIOS) {
        // iOS: Usar Web Share API para mostrar solo opciones relevantes
        if (navigator.share) {
          try {
            const file = new File([blob], filename, { type: 'video/mp4' });
            await navigator.share({
              files: [file],
              title: 'Live Wallpaper',
              text: wallpaper.name,
            });
            setDownloadSuccess(true);
            setTimeout(() => {
              setDownloadSuccess(false);
            }, 3000);
            setIsDownloading(false);
            return;
          } catch (error) {
            // Usuario canceló, continuar con fallback
            if ((error as any).name === 'AbortError') {
              setIsDownloading(false);
              return;
            }
          }
        }
        
        // Fallback si Web Share no está disponible
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
      } else {
        // Android: Descargar directamente
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }

      setDownloadSuccess(true);
      setTimeout(() => {
        setDownloadSuccess(false);
      }, 3000);

    } catch (error) {
      console.error('Error downloading live wallpaper:', error);
      setDownloadError('Failed to download live wallpaper');
      setTimeout(() => {
        setDownloadError(null);
      }, 3000);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div 
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center imgPreviewer"
      style={{ touchAction: 'pan-x', overscrollBehavior: 'contain' }}
    >
      {/* Botón Close circular */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
        className="absolute top-4 right-4 w-12 h-12 rounded-full backdrop-blur-md bg-[#686868]/20 hover:bg-[#686868]/30 border border-[#686868]/30 flex items-center justify-center transition-colors duration-200 z-10"
        aria-label="Close"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Botón Toggle Mov/Jpg - Solo si tiene categoría Live y existe el archivo */}
      {hasLiveCategory && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMov(!showMov);
          }}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
          className="absolute top-20 right-4 w-12 h-12 rounded-full backdrop-blur-md bg-[#686868]/20 hover:bg-[#686868]/30 border border-[#686868]/30 flex items-center justify-center transition-colors duration-200 z-10"
          aria-label="Toggle view"
        >
          {showMov ? <Eye className="w-6 h-6 text-white" /> : <EyeOff className="w-6 h-6 text-white" />}
        </button>
      )}

      {/* Botón Previous */}
      {currentIndex > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToPrevious();
          }}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full backdrop-blur-md bg-[#686868]/20 hover:bg-[#686868]/30 border border-[#686868]/30 flex items-center justify-center transition-colors duration-200 z-10 hidden sm:flex"
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Botón Next */}
      {currentIndex < wallpapers.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full backdrop-blur-md bg-[#686868]/20 hover:bg-[#686868]/30 border border-[#686868]/30 flex items-center justify-center transition-colors duration-200 z-10 hidden sm:flex"
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Contenedor de imagen fullscreen con transición suave */}
      <div 
        ref={imageContainerRef}
        className="w-full h-full flex items-center justify-center overflow-hidden relative"
      >
        <div
          className="flex w-full h-full"
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out',
          }}
        >
          {wallpapers.map((wp) => (
            <div
              key={wp.id}
              className="flex-shrink-0 w-full h-full flex items-center justify-center"
            >
              {showMov && wp.categories?.includes('Live') ? (
                <video
                  key={`video-${wp.id}`}
                  src={getMovUrl(wp)}
                  className="w-auto h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  onError={(e) => {
                    console.error('Error loading video:', getMovUrl(wp), e);
                  }}
                />
              ) : (
                <img
                  src={getImageUrl(wp)}
                  alt={wp.name}
                  className="w-auto h-full object-cover"
                  draggable={false}
                  onError={(e) => {
                    // Fallback al cover en wallUploads
                    (e.target as HTMLImageElement).src = `/wallUploads/${wp.image}`;
                    // Último fallback a carpetas antiguas
                    (e.target as HTMLImageElement).onerror = () => {
                      const folder = `wall${wp.categories[0] || 'Featured'}`;
                      (e.target as HTMLImageElement).src = `/${folder}/${wp.image}`;
                    };
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Botones de Descarga en la parte inferior */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3 px-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDownload();
          }}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
          disabled={isDownloading}
          className="backdrop-blur-md bg-[#686868]/20 hover:bg-[#686868]/30 border border-[#686868]/30 text-white font-semibold py-3 px-6 rounded-full flex items-center gap-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDownloading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Downloading...
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              Download
            </>
          )}
        </button>
        
        {/* Botón Live - Solo si tiene categoría Live */}
        {hasLiveCategory && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDownloadLive();
            }}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
            disabled={isDownloading}
            className="backdrop-blur-md bg-[#00d084]/20 hover:bg-[#00d084]/30 border border-[#00d084]/30 text-[#00d084] font-semibold py-3 px-6 rounded-full flex items-center gap-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDownloading ? (
              <>
                <div className="w-5 h-5 border-2 border-[#00d084] border-t-transparent rounded-full animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Live
              </>
            )}
          </button>
        )}
      </div>

      {/* Toast de éxito */}
      {downloadSuccess && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100] animate-bounce">
          <div className="backdrop-blur-lg bg-[#00d084]/30 border-2 border-[#00d084] text-[#00d084] font-semibold py-4 px-8 rounded-lg flex items-center gap-3 shadow-2xl w-80">
            <div className="w-6 h-6 bg-[#00d084] rounded flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg">✓</span>
            </div>
            <span className="text-center flex-1">Wallpaper downloaded to your gallery!</span>
          </div>
        </div>
      )}

      {/* Toast de error */}
      {downloadError && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100] animate-bounce">
          <div className="backdrop-blur-lg bg-red-500/30 border-2 border-red-500 text-red-400 font-semibold py-4 px-8 rounded-lg flex items-center gap-3 shadow-2xl w-80">
            <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg">!</span>
            </div>
            <span className="text-center flex-1">{downloadError}</span>
          </div>
        </div>
      )}

      {/* Indicador de página */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-white/60 text-xs sm:text-sm font-medium">
        {currentIndex + 1} / {wallpapers.length}
      </div>
    </div>
  );
}
