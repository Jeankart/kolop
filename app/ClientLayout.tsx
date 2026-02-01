'use client';

import { ThemeProvider } from './providers';
import Header from './components/Header';
import BottomNavigation from './components/BottomNavigation';
import SplashScreen from './components/SplashScreen';
import InstallPWAModal from './components/InstallPWAModal';
import InstallGuideModal from './components/InstallGuideModal';
import { useInstallPWAModal } from '@/lib/hooks/useInstallPWAModal';
import { usePushNotifications } from '@/lib/hooks/usePushNotifications';
import { useState, useEffect } from 'react';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { showModal, closeModal, isMounted } = useInstallPWAModal();
  const { isSupported, isSubscribed, permission, requestPermission } = usePushNotifications();
  const [showInstallGuide, setShowInstallGuide] = useState(false);

  useEffect(() => {
    // Registrar Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
    }

    // Pedir permiso para notificaciones (opcional)
    if (isSupported && permission === 'default') {
      // Descomentar para pedir automáticamente
      // requestPermission();
    }
  }, [isSupported, permission, requestPermission]);

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
