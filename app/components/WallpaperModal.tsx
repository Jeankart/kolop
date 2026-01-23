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

      // Detectar si es iOS
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

      if (isIOS) {
        // En iOS, crear un link y clickearlo para que muestre el share sheet nativo
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = wallpaper.name.replace('.gif', '.png');
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // En otros navegadores, usar descarga tradicional
        const blob = await fetch(imageUrl).then(res => res.blob());
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = wallpaper.name.replace('.gif', '.png');
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Error descargando imagen:', error);
    }
  };

  // Perlin-like noise generator
  const perlin = (x: number, y: number, time: number): number => {
    return Math.sin(x * 12.9898 + y * 78.233 + time * 43758.5453) * 0.5 + 0.5;
  };

  const handleDownloadLive = async () => {
    try {
      // Detectar si es iOS
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

      // Obtener la imagen
      let imageUrl = `/wallFeatured/${wallpaper.name.replace('.gif', 'lg.png')}`;
      const response = await fetch(imageUrl);
      
      if (!response.ok) {
        imageUrl = `/wallFeatured/${wallpaper.name.replace('.gif', 'lg.jpg')}`;
      }

      const imgBlob = await fetch(imageUrl).then(res => res.blob());
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = URL.createObjectURL(imgBlob);
      
      img.onload = async () => {
        // Canvas setup
        const canvas = document.createElement('canvas');
        canvas.width = 1080;
        canvas.height = 1920;
        const ctx = canvas.getContext('2d')!;
        
        // Buffer canvas para la imagen original
        const bufferCanvas = document.createElement('canvas');
        bufferCanvas.width = 1080;
        bufferCanvas.height = 1920;
        const bufferCtx = bufferCanvas.getContext('2d')!;
        bufferCtx.drawImage(img, 0, 0, 1080, 1920);
        
        // Para iOS, intentar con WebM, sino con MP4
        const mimeTypes = [
          'video/webm',
          'video/mp4',
          'video/webm;codecs=vp8,opus'
        ];
        
        let selectedMimeType = 'video/webm';
        for (const mime of mimeTypes) {
          if (MediaRecorder.isTypeSupported(mime)) {
            selectedMimeType = mime;
            break;
          }
        }
        
        // MediaRecorder
        const stream = canvas.captureStream(30);
        const mediaRecorder = new MediaRecorder(stream, { mimeType: selectedMimeType });
        const chunks: BlobPart[] = [];

        mediaRecorder.ondataavailable = (e: BlobEvent) => {
          chunks.push(e.data);
        };

        mediaRecorder.onstop = () => {
          const fileExtension = selectedMimeType.includes('webm') ? 'webm' : 'mp4';
          const blob = new Blob(chunks, { type: selectedMimeType });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = wallpaper.name.replace('.gif', `_live.${fileExtension}`);
          a.target = '_blank';
          document.body.appendChild(a);
          a.click();
          URL.revokeObjectURL(url);
          document.body.removeChild(a);
        };

        mediaRecorder.start();

        // Animación
        const duration = 3000;
        const startTime = Date.now();

        const animate = () => {
          const now = Date.now();
          const elapsed = now - startTime;
          const time = elapsed / 1000;

          // Dibujar imagen con displacement
          ctx.drawImage(bufferCanvas, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          const originalImageData = bufferCtx.getImageData(0, 0, canvas.width, canvas.height);
          const originalData = originalImageData.data;

          // Aplicar displacement map optimizado - cada 2 píxeles
          for (let i = 0; i < data.length; i += 8) {
            const pixelIndex = i / 4;
            const x = pixelIndex % canvas.width;
            const y = Math.floor(pixelIndex / canvas.width);

            // Generar ruido con mayor escala para reducir cálculos
            const noiseX = perlin(x / 150, y / 150, time) * 15 - 7.5;
            const noiseY = perlin(x / 150 + 100, y / 150 + 100, time) * 15 - 7.5;

            // Coordenadas desplazadas
            let displaceX = Math.floor(x + noiseX);
            let displaceY = Math.floor(y + noiseY);

            // Clamp a los límites
            displaceX = Math.max(0, Math.min(canvas.width - 1, displaceX));
            displaceY = Math.max(0, Math.min(canvas.height - 1, displaceY));

            const displaceIndex = (displaceY * canvas.width + displaceX) * 4;
            
            data[i] = originalData[displaceIndex];
            data[i + 1] = originalData[displaceIndex + 1];
            data[i + 2] = originalData[displaceIndex + 2];
            data[i + 3] = 255;
          }

          ctx.putImageData(imageData, 0, 0);

          if (elapsed < duration) {
            requestAnimationFrame(animate);
          } else {
            mediaRecorder.stop();
          }
        };

        animate();
      };
    } catch (error) {
      console.error('Error descargando Live Wallpaper:', error);
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
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
        className="absolute top-4 right-4 w-12 h-12 rounded-full backdrop-blur-md bg-[#686868]/20 hover:bg-[#686868]/30 border border-[#686868]/30 flex items-center justify-center transition-colors duration-200 z-10"
        aria-label="Cerrar"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Botón Previous */}
      {currentIndex > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToPrevious();
          }}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full backdrop-blur-md bg-[#686868]/20 hover:bg-[#686868]/30 border border-[#686868]/30 flex items-center justify-center transition-colors duration-200 z-10"
          aria-label="Anterior"
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

      {/* Botones de Descarga en la parte inferior */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDownload();
          }}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
          className="backdrop-blur-md bg-[#686868]/20 hover:bg-[#686868]/30 border border-[#686868]/30 text-white font-semibold py-3 px-6 rounded-full flex items-center gap-2 transition-colors duration-200"
        >
          <Download className="w-5 h-5" />
          Descargar
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDownloadLive();
          }}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
          className="backdrop-blur-md bg-[#00d084]/20 hover:bg-[#00d084]/30 border border-[#00d084]/30 text-[#00d084] font-semibold py-3 px-6 rounded-full flex items-center gap-2 transition-colors duration-200"
        >
          <Download className="w-5 h-5" />
          Live
        </button>
      </div>

      {/* Indicador de página */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-white/60 text-sm">
        {currentIndex + 1} / {wallpapers.length}
      </div>
    </div>
  );
}
