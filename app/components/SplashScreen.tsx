'use client';

import { useEffect, useState } from 'react';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Solo mostrar si es la primera carga de la sesión
    const hasShownSplash = sessionStorage.getItem('splashShown');
    
    if (hasShownSplash) {
      setIsVisible(false);
    } else {
      sessionStorage.setItem('splashShown', 'true');
      
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-[#151515] dark:bg-[#151515] z-[9999] flex flex-col items-center justify-center gap-8">
      {/* Logo con animación zoom in/out */}
      <div className="flex items-center justify-center">
        <img 
          src="/kloop-logo.png" 
          alt="Kolop Logo" 
          className="w-20 h-20 rounded-lg"
          style={{
            animation: 'zoomPulse 2s ease-in-out infinite'
          }}
        />
      </div>

      {/* Título */}
      <h1 className="text-3xl font-black tracking-tight text-white">Wallpaper</h1>

      {/* Barra de carga con glow mejorado */}
      <div className="w-48 h-1.5 bg-[#686868]/30 rounded-full overflow-hidden shadow-2xl shadow-[#00d084]">
        <div 
          className="h-full bg-[#00d084] rounded-full"
          style={{
            animation: 'loadingBar 1s ease-in-out forwards',
            boxShadow: '0 0 15px rgba(0, 208, 132, 1), 0 0 30px rgba(0, 208, 132, 0.9), 0 0 50px rgba(0, 208, 132, 0.7), 0 0 70px rgba(0, 208, 132, 0.5)'
          }}
        />
      </div>

      <style jsx>{`
        @keyframes loadingBar {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        @keyframes zoomPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.15);
          }
        }
      `}</style>
    </div>
  );
}
