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
      {/* Favicon */}
      <div className="flex items-center justify-center">
        <img src="/apple-touch-icon.png" alt="Wallpaper" size={64} className="w-16 h-16" />
      </div>

      {/* Título */}
      <h1 className="text-3xl font-black tracking-tight text-white">Wallpaper</h1>

      {/* Barra de carga con glow */}
      <div className="w-48 h-1 bg-[#686868]/30 rounded-full overflow-hidden shadow-2xl shadow-[#00d084]/80">
        <div 
          className="h-full bg-[#00d084] rounded-full shadow-2xl shadow-[#00d084]"
          style={{
            animation: 'loadingBar 1s ease-in-out forwards',
            boxShadow: '0 0 20px rgba(0, 208, 132, 1), 0 0 40px rgba(0, 208, 132, 0.8), 0 0 60px rgba(0, 208, 132, 0.6)'
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
      `}</style>
    </div>
  );
}
