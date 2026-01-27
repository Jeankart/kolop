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
    // Bloquear rotación solo en móvil
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      const lockOrientation = () => {
        // Bloquear en portrait
        if ((screen.orientation as any)?.lock) {
          (screen.orientation as any).lock('portrait-primary').catch(() => {
            // Ignorar errores en navegadores que no lo soportan
          });
        }
      };

      lockOrientation();
    }
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
