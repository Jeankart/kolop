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

function ClientLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { showModal, closeModal, isMounted } = useInstallPWAModal();
  const { isSupported, isSubscribed, permission, requestPermission } = usePushNotifications();
  const [showInstallGuide, setShowInstallGuide] = useState(false);

  useEffect(() => {
    try {
      // Registrar Service Worker - DESACTIVADO TEMPORALMENTE
      // if ('serviceWorker' in navigator) {
      //   navigator.serviceWorker.register('/sw.js').catch((error) => {
      //     console.error('Service Worker registration failed:', error);
      //   });
      // }
    } catch (error) {
      console.error('Error registering service worker:', error);
    }
  }, []);

  useEffect(() => {
    try {
      // Bloquear rotación solo en móvil
      const isMobile = window.innerWidth < 768;
      
      if (isMobile && typeof screen !== 'undefined' && (screen.orientation as any)?.lock) {
        (screen.orientation as any).lock('portrait-primary').catch(() => {
          // Ignorar errores
        });
      }
    } catch (error) {
      console.error('Error locking orientation:', error);
    }
  }, []);

  if (!isMounted) {
    return (
      <ThemeProvider>
        <Header />
        <main className="pb-24 bg-[#151515] dark:bg-[#151515]">
          {children}
        </main>
        <BottomNavigation />
      </ThemeProvider>
    );
  }

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

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayoutContent>{children}</ClientLayoutContent>;
}
