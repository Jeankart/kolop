'use client';

import { useEffect, useState } from 'react';

interface DesktopMobileWrapperProps {
  children: React.ReactNode;
}

export default function DesktopMobileWrapper({ children }: DesktopMobileWrapperProps) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileDevice = window.innerWidth < 768;
      console.log('🔍 Checking device - innerWidth:', window.innerWidth, 'isMobile:', isMobileDevice);
      setIsMobile(isMobileDevice);
    };

    // Ejecutar inmediatamente
    checkIfMobile();
    
    // Ejecutar cuando se redimensiona
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Mientras se carga, mostrar nada (evitar hidration mismatch)
  if (isMobile === null) {
    return <>{children}</>;
  }

  if (isMobile) {
    console.log('✅ Rendering mobile view');
    return <>{children}</>;
  }

  console.log('✅ Rendering desktop frame view');
  // En desktop, envolver en contenedor que simula un móvil
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: '375px',
          height: '812px',
          backgroundColor: '#1a1a1a',
          borderRadius: '48px',
          border: '8px solid #404040',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.75)',
          position: 'relative',
          flexShrink: 0,
          // Crear un stacking context para que los elementos fixed dentro se comporten como absolute
          transform: 'translate(0)',
          willChange: 'transform',
        }}
      >
        {/* Notch simulado */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '128px',
            height: '28px',
            backgroundColor: '#1a1a1a',
            borderBottomLeftRadius: '24px',
            borderBottomRightRadius: '24px',
            zIndex: 10,
          }}
        />
        
        {/* Contenido */}
        <div
          style={{
            width: '100%',
            height: '100%',
            overflowY: 'auto',
            scrollBehavior: 'smooth',
            paddingTop: 0,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
