'use client';

import { useEffect, useState } from 'react';
import { Smartphone } from 'lucide-react';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Solo mostrar si es la primera carga de la sesión
    const hasShownSplash = sessionStorage.getItem('splashShown');
    
    if (!hasShownSplash) {
      setIsVisible(true);
      sessionStorage.setItem('splashShown', 'true');
      
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-[#151515] dark:bg-[#151515] z-[9999] flex flex-col items-center justify-center gap-8">
      {/* Icono */}
      <div className="flex items-center justify-center">
        <Smartphone size={64} className="text-[#00d084] animate-bounce" />
      </div>

      {/* Título */}
      <h1 className="text-3xl font-black tracking-tight text-white">Wallpaper</h1>

      {/* Barra de carga */}
      <div className="w-48 h-1 bg-[#686868]/30 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#00d084] rounded-full"
          style={{
            animation: 'loadingBar 2s ease-in-out forwards'
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

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}
