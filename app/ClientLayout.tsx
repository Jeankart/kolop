'use client';

import { ThemeProvider } from './providers';
import Header from './components/Header';
import BottomNavigation from './components/BottomNavigation';
import SplashScreen from './components/SplashScreen';
import InstallPWAModal from './components/InstallPWAModal';
import InstallGuideModal from './components/InstallGuideModal';
import { useInstallPWAModal } from '@/lib/hooks/useInstallPWAModal';
import { useState, useEffect } from 'react';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { showModal, closeModal, isMounted } = useInstallPWAModal();
  const [showInstallGuide, setShowInstallGuide] = useState(false);

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

  if (!isMounted) return null;

  return (
    <ThemeProvider>
      <SplashScreen />
      <InstallPWAModal 
        isOpen={showModal} 
        onClose={closeModal}
        onLearnMore={() => setShowInstallGuide(true)}
      />
      <InstallGuideModal isOpen={showInstallGuide} onClose={() => setShowInstallGuide(false)} />
      <Header />
      <main className="pb-24 bg-[#151515] dark:bg-[#151515]">
        {children}
      </main>
      <BottomNavigation />
    </ThemeProvider>
  );
}
