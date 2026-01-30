'use client';

import { X, Download, ChevronLeft, ChevronRight, Eye, EyeOff, Share2, Zap } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

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
  const [touchStartTime, setTouchStartTime] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [isUpscaling, setIsUpscaling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Inyectar SVG de filtros disponibles
  useEffect(() => {
    const svgContainer = document.createElement('div');
    svgContainer.innerHTML = `
      <svg style="display:none;" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Filtro Glitch: Aberración cromática -->
          <filter id="glitch-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feDisplacementMap in="SourceGraphic" scale="8" xChannelSelector="R" yChannelSelector="G" />
            <feColorMatrix type="saturate" values="0.6" />
            <feComponentTransfer>
              <feFuncR type="linear" slope="1.15" />
              <feFuncG type="linear" slope="1.15" />
              <feFuncB type="linear" slope="1.15" />
            </feComponentTransfer>
          </filter>
          
          <!-- Filtro Bloom -->
          <filter id="bloom-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
            <feComponentTransfer>
              <feFuncR type="linear" slope="1.4" intercept="0" />
              <feFuncG type="linear" slope="1.4" intercept="0" />
              <feFuncB type="linear" slope="1.4" intercept="0" />
            </feComponentTransfer>
          </filter>
          
          <!-- Filtro B&N -->
          <filter id="bw-filter">
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>
    `;
    document.body.appendChild(svgContainer);
    return () => svgContainer.remove();
  }, []);

  // Log when wallpaper changes
  useEffect(() => {
  }, [wallpaper.id]);

  const currentIndex = wallpapers.findIndex(w => w.id === wallpaper.id);
  
  // Función para obtener la ruta completa de la imagen
  const getImageUrl = (wp: Wallpaper) => {
    // Usar el archivo download para mostrar en alta resolución, con fallback a cover
    const downloadOrCover = wp.files.download || wp.files.cover;
    const url = `/wallUploads/${downloadOrCover}`;
    return url;
  };

  // Función para obtener ruta del video
  const getMovUrl = (wp: Wallpaper) => {
    if (wp.files.video) {
      const url = `/wallUploads/${wp.files.video}`;
      return url;
    }
    return null;
  };

  // Verificar si tiene categoría Live Y tiene video disponible
  const hasLiveCategory = wallpaper.categories?.includes('Live') && !!wallpaper.files.video;
  
  // Estado para saber si mostrar video o imagen
  // Por defecto, mostrar video si existe, sino imagen
  const [showMov, setShowMov] = useState(() => {
    return wallpaper.categories?.includes('Live') && !!wallpaper.files.video;
  });
  
  // Actualizar showMov cuando el wallpaper cambia
  useEffect(() => {
    const hasVideo = wallpaper.categories?.includes('Live') && !!wallpaper.files.video;
    setShowMov(hasVideo);
  }, [wallpaper.id, wallpaper.files.video]);

  // Desabilitar scroll vertical cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      // Prevenir scroll vertical
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.touchAction = 'manipulation';
      document.documentElement.style.touchAction = 'manipulation';
      
      return () => {
        // Restaurar scroll completamente
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        document.body.style.touchAction = '';
        document.documentElement.style.touchAction = '';
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

    // Opcional: precargar siguiente/anterior (desactivado por rendimiento)
    // if (currentIndex < wallpapers.length - 1) {
    //   preloadImage(getImageUrl(wallpapers[currentIndex + 1]));
    // }
    // if (currentIndex > 0) {
    //   preloadImage(getImageUrl(wallpapers[currentIndex - 1]));
    // }
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
    setTouchStartTime(Date.now());
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
    setDragOffset(0); // Reset drag offset para snap back
    handleSwipe();
  };

  const getFilterCSS = (filter: string | null): string => {
    // SVG filters + CSS fallback para máxima compatibilidad
    switch (filter) {
      case 'invert':
        return 'invert(1)';
      case '4k':
        // 4K effect: aumentar contraste y claridad
        return 'contrast(1.2) brightness(1.05) saturate(1.1) drop-shadow(0 0 2px rgba(0,212,132,0.2))';
      case 'glitch':
        // Glitch: Aberración cromática visual con drop-shadows de colores
        // Simula el efecto RGB shift visible
        return 'contrast(1.6) brightness(1.08) saturate(0.7) drop-shadow(2px 2px 0px rgba(255,0,0,0.4)) drop-shadow(-2px -2px 0px rgba(0,255,0,0.3)) drop-shadow(4px 0px 0px rgba(0,0,255,0.3))';
      default:
        return 'none';
    }
  };

  const applyFilterToCanvas = async (imgSrc: string, filter: string | null): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }

        if (filter === 'glitch') {
          // Glitch: Aberración cromática - Patrón de p5.js
          // Crear 3 canvas separados para cada canal RGB con desplazamientos
          
          // Canvas para cada canal
          const canvasR = document.createElement('canvas');
          canvasR.width = img.width;
          canvasR.height = img.height;
          const ctxR = canvasR.getContext('2d', { willReadFrequently: true });
          
          const canvasG = document.createElement('canvas');
          canvasG.width = img.width;
          canvasG.height = img.height;
          const ctxG = canvasG.getContext('2d', { willReadFrequently: true });
          
          const canvasB = document.createElement('canvas');
          canvasB.width = img.width;
          canvasB.height = img.height;
          const ctxB = canvasB.getContext('2d', { willReadFrequently: true });
          
          if (!ctxR || !ctxG || !ctxB) {
            reject(new Error('Canvas context not available'));
            return;
          }
          
          // Desplazamientos diferentes para cada canal (como en p5.js)
          const offsetR = 10;  // Red: -10px, -10px
          const offsetG = 6;   // Green: offset intermedio
          const offsetB = 10;  // Blue: offset opuesto
          
          // Dibujar canal Rojo (desplazado arriba-izquierda)
          ctxR.drawImage(img, -offsetR, -offsetR);
          
          // Dibujar canal Verde (desplazado ligeramente)
          ctxG.drawImage(img, offsetG * 0.5, 0);
          
          // Dibujar canal Azul (desplazado abajo-derecha)
          ctxB.drawImage(img, offsetB, offsetB);
          
          // Obtener imageData de cada canal
          const dataR = ctxR.getImageData(0, 0, img.width, img.height).data;
          const dataG = ctxG.getImageData(0, 0, img.width, img.height).data;
          const dataB = ctxB.getImageData(0, 0, img.width, img.height).data;
          
          // Dibujar la imagen original como base
          ctx.drawImage(img, 0, 0);
          
          // Obtener el resultado y combinar canales
          const result = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = result.data;
          
          // Combinar canales RGB con los desplazamientos
          for (let i = 0; i < data.length; i += 4) {
            // Extraer cada canal de su canvas desplazado
            data[i] = dataR[i];        // Red desde canvasR
            data[i + 1] = dataG[i + 1]; // Green desde canvasG
            data[i + 2] = dataB[i + 2]; // Blue desde canvasB
            data[i + 3] = 255;         // Alpha
          }
          
          ctx.putImageData(result, 0, 0);
          
          // Aplicar overlay con screen blend mode (superponer con la imagen original)
          ctx.globalAlpha = 0.5;
          ctx.globalCompositeOperation = 'screen';
          ctx.drawImage(img, 0, 0);
          ctx.globalAlpha = 1;
          ctx.globalCompositeOperation = 'source-over';
          
          // Aplicar efectos finales
          const finalData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const finalPixels = finalData.data;
          
          for (let i = 0; i < finalPixels.length; i += 4) {
            // Aumentar contraste y brillo para el efecto glitch
            finalPixels[i] = Math.min(255, finalPixels[i] * 1.1 + 5);
            finalPixels[i + 1] = Math.min(255, finalPixels[i + 1] * 1.1 + 5);
            finalPixels[i + 2] = Math.min(255, finalPixels[i + 2] * 1.1 + 5);
          }
          
          ctx.putImageData(finalData, 0, 0);
          
        } else if (filter === 'bloom') {
          // Bloom: Blur con brightness
          ctx.drawImage(img, 0, 0);
          ctx.filter = 'blur(8px)';
          ctx.globalAlpha = 0.6;
          ctx.drawImage(img, 0, 0);
          
          ctx.globalAlpha = 1;
          ctx.filter = 'none';
          ctx.drawImage(img, 0, 0);
          
          // Aumentar brightness y saturación
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          const brightness = 1.4;
          const saturate = 1.6;
          
          for (let i = 0; i < data.length; i += 4) {
            // Aplicar brightness
            data[i] = Math.min(255, data[i] * brightness);
            data[i + 1] = Math.min(255, data[i + 1] * brightness);
            data[i + 2] = Math.min(255, data[i + 2] * brightness);
            
            // Aplicar saturación
            const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = Math.min(255, gray + (data[i] - gray) * saturate);
            data[i + 1] = Math.min(255, gray + (data[i + 1] - gray) * saturate);
            data[i + 2] = Math.min(255, gray + (data[i + 2] - gray) * saturate);
          }
          ctx.putImageData(imageData, 0, 0);
          
        } else if (filter === 'bw') {
          // Blanco y negro
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          
          for (let i = 0; i < data.length; i += 4) {
            const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
            data[i] = gray;
            data[i + 1] = gray;
            data[i + 2] = gray;
          }
          ctx.putImageData(imageData, 0, 0);
          
        } else {
          ctx.drawImage(img, 0, 0);
        }

        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Failed to convert canvas to blob'));
        }, 'image/jpeg', 0.95);
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = imgSrc;
    });
  };

  const handleSwipe = () => {
    const diff = touchStart - touchEnd;
    const timeDiff = Date.now() - touchStartTime;
    
    // Calcular velocidad (pixels per millisecond)
    const velocity = Math.abs(diff) / (timeDiff || 1);
    
    // Si la velocidad es alta (momentum), usar threshold bajo (20px)
    // Si es baja (lento), usar threshold alto (80px) 
    const threshold = velocity > 0.5 ? 20 : 80;
    
    // Swipe left - siguiente
    if (diff > threshold) {
      goToNext();
    } 
    // Swipe right - anterior
    else if (diff < -threshold) {
      goToPrevious();
    }
    // Si no hay suficiente movimiento, quedarse en el wallpaper actual
    // (no hace nada, el drag offset se resetea)
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadError(null);
    setDownloadSuccess(false);

    try {
      let imageUrl = getImageUrl(wallpaper);
      
      let response = await fetch(imageUrl);
      
      if (!response.ok) {
        imageUrl = `/wallUploads/${wallpaper.files.cover}`;
        response = await fetch(imageUrl);
      }

      if (!response.ok) {
        throw new Error('Image not found');
      }

      let blob = await response.blob();
      
      // Aplicar filtro si está activo
      if (activeFilter) {
        try {
          blob = await applyFilterToCanvas(imageUrl, activeFilter);
        } catch (error) {
          console.error('Error applying filter:', error);
          // Continuar sin filtro si hay error
        }
      }

      const filename = `${wallpaper.name}.jpg`;
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

      if (isIOS && navigator.share) {
        // iOS: Web Share API - solo opciones nativas (Guardar imagen, Guardar en Archivos)
        try {
          const file = new File([blob], filename, { type: 'image/jpeg' });
          await navigator.share({
            files: [file],
          });
          setDownloadSuccess(true);
          setTimeout(() => setDownloadSuccess(false), 3000);
          setIsDownloading(false);
          return;
        } catch (error) {
          // Si el usuario cancela o hay error, continuar con descarga directa
          if ((error as any).name === 'AbortError') {
            setIsDownloading(false);
            return;
          }
        }
      }

      // Fallback: Descargar directamente
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

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

  const handleDownloadLive = async () => {
    setIsDownloading(true);
    setDownloadError(null);
    setDownloadSuccess(false);

    try {
      const movUrl = getMovUrl(wallpaper);
      if (!movUrl) {
        throw new Error('Live wallpaper video not available');
      }
      
      const response = await fetch(movUrl);
      
      if (!response.ok) {
        throw new Error('Live wallpaper file not found');
      }

      const blob = await response.blob();
      const filename = `${wallpaper.name}.mp4`;
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

      if (isIOS && navigator.share) {
        // iOS: Web Share API - solo opciones nativas
        try {
          const file = new File([blob], filename, { type: 'video/mp4' });
          await navigator.share({
            files: [file],
          });
          setDownloadSuccess(true);
          setTimeout(() => setDownloadSuccess(false), 3000);
          setIsDownloading(false);
          return;
        } catch (error) {
          // Si el usuario cancela o hay error, continuar con descarga directa
          if ((error as any).name === 'AbortError') {
            setIsDownloading(false);
            return;
          }
        }
      }

      // Fallback: Descargar directamente
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

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
      style={{ touchAction: 'manipulation', overscrollBehavior: 'contain', WebkitTouchCallout: 'none' }}
    >
      {/* Botón Close circular */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
        className="absolute top-safe right-4 w-12 h-12 rounded-full backdrop-blur-md bg-[#686868]/20 hover:bg-[#686868]/30 border border-[#686868]/30 flex items-center justify-center transition-colors duration-200 z-10"
        style={{ top: 'max(1rem, env(safe-area-inset-top) + 0.5rem)' }}
        aria-label="Close"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Logo Kloop centrado en la parte superior */}
      <div 
        className="absolute top-safe left-1/2 transform -translate-x-1/2 z-10 opacity-40"
        style={{ top: 'max(2rem, env(safe-area-inset-top) + 1.5rem)', mixBlendMode: 'screen' }}
      >
        <img 
          src="/kloop-logo.png" 
          alt="Kloop Logo" 
          className="h-5 w-auto"
        />
      </div>

      {/* Botón Toggle Mov/Jpg - Solo si tiene categoría Live y existe el archivo */}
      {hasLiveCategory && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMov(!showMov);
          }}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
          className="absolute right-4 w-12 h-12 rounded-full backdrop-blur-md bg-[#686868]/20 hover:bg-[#686868]/30 border border-[#686868]/30 flex items-center justify-center transition-colors duration-200 z-10"
          style={{ top: 'max(5rem, env(safe-area-inset-top) + 3.5rem)' }}
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
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full backdrop-blur-md bg-[#686868]/20 hover:bg-[#686868]/40 border border-[#686868]/30 hover:border-[#686868]/60 flex items-center justify-center transition-all duration-300 cubic-bezier(0.16,1,0.3,1) z-10 hidden sm:flex hover:shadow-lg hover:shadow-white/10 hover:scale-110"
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Filtros - Columna Izquierda */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 z-10 hidden">
        {/* 4K Button with Premium Star */}
        <div className="relative">
          <button
            onClick={async (e) => {
              e.stopPropagation();
              setIsUpscaling(true);
              try {
                // Cargar la imagen
                const img = new Image();
                img.crossOrigin = 'anonymous';
                
                img.onload = () => {
                  // Crear canvas 4x más grande
                  const canvas = document.createElement('canvas');
                  canvas.width = img.width * 4;
                  canvas.height = img.height * 4;
                  
                  const ctx = canvas.getContext('2d');
                  if (!ctx) throw new Error('Canvas context not available');
                  
                  // Mejorar calidad del upscaling
                  ctx.imageSmoothingEnabled = true;
                  (ctx as any).imageSmoothingQuality = 'high';
                  
                  // Dibujar imagen escalada
                  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                  
                  // Descargar
                  canvas.toBlob((blob) => {
                    if (!blob) throw new Error('Failed to create blob');
                    
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `${wallpaper.name || 'wallpaper'}-4K.jpg`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                    
                    setIsUpscaling(false);
                  }, 'image/jpeg', 0.95);
                };
                
                img.onerror = () => {
                  setIsUpscaling(false);
                  throw new Error('Failed to load image');
                };
                
                img.src = getImageUrl(wallpaper);
              } catch (error) {
                console.error('4K upscaling error:', error);
                setIsUpscaling(false);
              }
            }}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
            disabled={isUpscaling}
            className={`w-12 h-12 rounded-full backdrop-blur-md border flex items-center justify-center transition-all duration-300 cubic-bezier(0.16,1,0.3,1) hover:scale-110 disabled:opacity-50 ${
              isUpscaling
                ? 'bg-[#00d084]/20 border-[#00d084]/50 shadow-lg shadow-[#00d084]/20'
                : 'bg-[#686868]/20 border-[#686868]/30 hover:bg-[#686868]/40 hover:border-[#686868]/60 hover:shadow-lg hover:shadow-white/10'
            }`}
            title="4K Enhancement - Download upscaled"
          >
            {isUpscaling ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <span className="text-white font-bold text-sm">4K</span>
            )}
          </button>
          {/* PRO Badge with Star */}
          <div className="absolute -top-3 -right-2 bg-amber-500 px-1.5 py-0.5 rounded-full flex items-center gap-0.5 whitespace-nowrap">
            <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L9.5 5.5L14 6L10.5 9.5L11 14L7 11.5L3 14L3.5 9.5L0 6L4.5 5.5L7 1Z" fill="black"/>
            </svg>
            <span className="text-black text-[8px] font-bold">PRO</span>
          </div>
        </div>

        {/* Share Button */}
        <button
          onClick={async (e) => {
            e.stopPropagation();
            try {
              const imageUrl = getImageUrl(wallpaper);
              if (navigator.share) {
                await navigator.share({
                  title: `${wallpaper.name} - Wallpaper`,
                  text: 'Check out this amazing wallpaper!',
                  url: window.location.href
                });
              } else {
                // Fallback: copy to clipboard
                await navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
              }
            } catch (error) {
              console.error('Share error:', error);
            }
          }}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
          className="w-12 h-12 rounded-full backdrop-blur-md border flex items-center justify-center transition-all duration-300 cubic-bezier(0.16,1,0.3,1) hover:scale-110 bg-[#686868]/20 border-[#686868]/30 hover:bg-[#686868]/40 hover:border-[#686868]/60 hover:shadow-lg hover:shadow-white/10"
          title="Share"
        >
          <Share2 className="w-5 h-5 text-white" />
        </button>

        {/* Invert Colors Filter */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveFilter(activeFilter === 'invert' ? null : 'invert');
          }}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
          className={`w-12 h-12 rounded-full backdrop-blur-md border flex items-center justify-center transition-all duration-300 cubic-bezier(0.16,1,0.3,1) hover:scale-110 ${
            activeFilter === 'invert'
              ? 'bg-purple-500/20 border-purple-500/50 shadow-lg shadow-purple-500/20'
              : 'bg-[#686868]/20 border-[#686868]/30 hover:bg-[#686868]/40 hover:border-[#686868]/60 hover:shadow-lg hover:shadow-white/10'
          }`}
          title="Invert Colors"
        >
          <Zap className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Botón Next */}
      {currentIndex < wallpapers.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full backdrop-blur-md bg-[#686868]/20 hover:bg-[#686868]/40 border border-[#686868]/30 hover:border-[#686868]/60 flex items-center justify-center transition-all duration-300 cubic-bezier(0.16,1,0.3,1) z-10 hidden sm:flex hover:shadow-lg hover:shadow-white/10 hover:scale-110"
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
            transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {wallpapers.map((wp) => (
            <div
              key={wp.id}
              className="flex-shrink-0 w-full h-full flex items-center justify-center"
            >
              {showMov && wp.categories?.includes('Live') && getMovUrl(wp) ? (
                <video
                  key={`video-${wp.id}`}
                  src={getMovUrl(wp) || undefined}
                  className="w-full h-auto object-contain"
                  style={{
                    filter: getFilterCSS(activeFilter),
                    mixBlendMode: activeFilter ? 'screen' : 'normal'
                  }}
                  autoPlay
                  loop
                  playsInline
                  muted={true}
                  preload="auto"
                  onError={(e) => {
                    console.error(`[WallpaperModal] Error loading video for ${wp.id}:`, getMovUrl(wp), e);
                  }}
                />
              ) : (
                <img
                  src={getImageUrl(wp)}
                  alt={wp.name}
                  className="w-full h-auto object-contain"
                  style={{
                    filter: getFilterCSS(activeFilter),
                    mixBlendMode: activeFilter ? 'screen' : 'normal'
                  }}
                  draggable={false}
                  onError={(e) => {
                    console.error(`[WallpaperModal] Error loading image for ${wp.id}:`, getImageUrl(wp), wp.files);
                    // Fallback al cover en wallUploads
                    (e.target as HTMLImageElement).src = `/wallUploads/${wp.files.cover}`;
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
          className="backdrop-blur-md bg-[#686868]/20 hover:bg-[#686868]/40 border border-[#686868]/30 hover:border-[#686868]/60 text-white font-semibold py-3 px-6 rounded-full flex items-center gap-2 transition-all duration-300 cubic-bezier(0.16,1,0.3,1) disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-white/10"
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
          <div className="backdrop-blur-lg bg-[#00d084]/30 border-2 border-[#00d084] text-white font-semibold py-4 px-8 rounded-3xl flex items-center gap-3 shadow-2xl w-80">
            <div className="w-6 h-6 bg-[#00d084] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg">✓</span>
            </div>
            <span className="text-center flex-1 text-white">Wallpaper downloaded!</span>
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

      <style jsx>{`
        video {
          pointer-events: none !important;
        }
        video::-webkit-media-controls {
          display: none !important;
        }
        video::-webkit-media-controls-enclosure {
          display: none !important;
        }
        video::-moz-media-controls {
          display: none !important;
        }
      `}</style>
    </div>
  );
}
