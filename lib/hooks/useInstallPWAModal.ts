'use client';

import { useState, useEffect } from 'react';

export function useInstallPWAModal() {
  const [showModal, setShowModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Verificar si ya se mostró el modal
    const hasSeenModal = localStorage.getItem('pwaModalShown');
    
    if (!hasSeenModal) {
      // Mostrar el modal después de 0.2 segundos (cuando termina el splash)
      const timer = setTimeout(() => {
        setShowModal(true);
        // Marcar como mostrado
        localStorage.setItem('pwaModalShown', 'true');
      }, 200);

      return () => clearTimeout(timer);
    }
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  return { showModal, closeModal, isMounted };
}
