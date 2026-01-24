'use client';

import { ThemeProvider } from './providers';
import Header from './components/Header';
import BottomNavigation from './components/BottomNavigation';
import SplashScreen from './components/SplashScreen';
import { useEffect } from 'react';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Bloquear rotación
    const lockOrientation = () => {
      const html = document.documentElement;
      const body = document.body;
      
      // Bloquear en portrait
      if ((screen.orientation as any)?.lock) {
        (screen.orientation as any).lock('portrait-primary').catch(() => {
          // Ignorar errores en navegadores que no lo soportan
        });
      }
      
      // Fallback: ocultar si se rota
      const handleOrientationChange = () => {
        html.style.overflow = 'auto';
        body.style.overflow = 'auto';
      };
      
      window.addEventListener('orientationchange', handleOrientationChange);
      
      // Optimizar scroll en móvil
      document.documentElement.style.scrollBehavior = 'smooth';
      
      // Asegurar que el scroll esté habilitado por defecto
      html.style.overflow = '';
      body.style.overflow = '';
      body.style.touchAction = '';
      
      return () => {
        window.removeEventListener('orientationchange', handleOrientationChange);
        // Limpiar cuando el componente se desmonta
        html.style.overflow = '';
        body.style.overflow = '';
        body.style.touchAction = '';
      };
    };

    lockOrientation();
  }, []);

  return (
    <ThemeProvider>
      <SplashScreen />
      <Header />
      <main className="pb-24 bg-[#151515] dark:bg-[#151515]">
        {children}
      </main>
      <BottomNavigation />
    </ThemeProvider>
  );
}
