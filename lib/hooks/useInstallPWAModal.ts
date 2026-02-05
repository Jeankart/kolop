'use client';

import { useState, useEffect } from 'react';

export function useInstallPWAModal() {
  const [showModal, setShowModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    try {
      setIsMounted(true);
      
      // Verificar si ya se mostró el modal
      if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
        return;
      }

      const hasSeenModal = localStorage.getItem('pwaModalShown');
      
      if (!hasSeenModal) {
        // Mostrar el modal después de 0.2 segundos (cuando termina el splash)
        const timer = setTimeout(() => {
          setShowModal(true);
          // Marcar como mostrado
          try {
            localStorage.setItem('pwaModalShown', 'true');
          } catch (e) {
            console.warn('Could not set localStorage:', e);
          }
        }, 200);

        return () => clearTimeout(timer);
      }
    } catch (error) {
      console.error('Error in useInstallPWAModal:', error);
    }
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  return { showModal, closeModal, isMounted };
}
