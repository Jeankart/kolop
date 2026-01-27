'use client';

import { useEffect, useState } from 'react';
import { Smartphone } from 'lucide-react';

export default function OrientationLock() {
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      // Detectar si está en landscape
      const isLandscape = window.innerWidth > window.innerHeight;
      setIsLandscape(isLandscape);
    };

    checkOrientation();

    // Escuchar cambios de orientación
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  if (!isLandscape) return null;

  return (
    <div className="fixed inset-0 bg-[#151515]/95 z-[9998] flex flex-col items-center justify-center gap-6 landscape-lock">
      <Smartphone className="w-16 h-16 text-[#00d084] animate-bounce" />
      
      <div className="text-center px-6">
        <h2 className="text-2xl font-bold text-white mb-3">
          Gira tu dispositivo
        </h2>
        <p className="text-zinc-400 text-sm">
          Esta aplicación funciona mejor en modo vertical
        </p>
      </div>
    </div>
  );
}
