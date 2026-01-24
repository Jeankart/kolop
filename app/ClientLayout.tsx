'use client';

import { ThemeProvider } from './providers';
import Header from './components/Header';
import BottomNavigation from './components/BottomNavigation';
import SplashScreen from './components/SplashScreen';
import { useEffect } from 'react';
import { testFirebaseConnection } from '@/lib/test-firebase';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Test Firebase connection on mount
    testFirebaseConnection().catch(console.error);
    
    // Bloquear rotación
    const lockOrientation = () => {
      const html = document.documentElement;
      
      // Bloquear en portrait
      if ((screen.orientation as any)?.lock) {
        (screen.orientation as any).lock('portrait-primary').catch(() => {
          // Ignorar errores en navegadores que no lo soportan
        });
      }
      
      // Fallback: ocultar si se rota
      const handleOrientationChange = () => {
        html.style.overflow = 'hidden';
      };
      
      window.addEventListener('orientationchange', handleOrientationChange);
      return () => {
        window.removeEventListener('orientationchange', handleOrientationChange);
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
