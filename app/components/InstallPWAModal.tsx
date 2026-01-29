'use client';

import { X, Check } from 'lucide-react';

interface InstallPWAModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLearnMore: () => void;
}

export default function InstallPWAModal({ isOpen, onClose, onLearnMore }: InstallPWAModalProps) {
  if (!isOpen) return null;

  const benefits = [
    { feature: 'Quick desktop access', free: false, app: true },
    { feature: 'Offline support', free: false, app: true },
    { feature: 'Push notifications', free: false, app: true },
    { feature: 'Native app experience', free: false, app: true },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        className="bg-[#1f1f1f] rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-[#686868]/50 shadow-2xl"
        style={{
          animation: 'slideInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Header */}
        <div className="relative p-6 border-b border-[#686868]/30">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 hover:bg-[#686868]/30 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#a0a0a0]" />
          </button>
          
          <h2 className="text-3xl font-bold text-white pr-8 mb-2">
            Save the app 😉
          </h2>
          <p className="text-sm text-[#a0a0a0]">
            Get quick access and more features
          </p>
        </div>

        {/* Video de Pexels */}
        <div className="p-6 pt-4">
          <div className="w-full aspect-video rounded-lg overflow-hidden bg-[#2a2a2a]">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="https://videos.pexels.com/video-files/7974/7974-hd_720_1280_30fps.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Tabla de beneficios */}
        <div className="px-6 pb-6">
          <div className="mb-6">
            {/* Header de tabla */}
            <div className="grid grid-cols-5 gap-2 mb-2 px-2">
              <div className="col-span-3 text-xs font-semibold text-[#a0a0a0] uppercase">Feature</div>
              <div className="text-xs font-semibold text-[#a0a0a0] uppercase text-center">Web</div>
              <div className="text-xs font-semibold text-[#00d084] uppercase text-center">WAPP</div>
            </div>

            {/* Filas de tabla */}
            <div className="space-y-1">
              {benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-5 gap-2 p-2 rounded bg-[#2a2a2a]/30 hover:bg-[#2a2a2a]/50 transition-colors text-sm"
                >
                  <div className="col-span-3 font-medium text-[#d0d0d0]">{benefit.feature}</div>
                  <div className="flex justify-center">
                    {benefit.free ? (
                      <Check className="w-4 h-4 text-[#00d084] drop-shadow-lg" style={{ filter: 'drop-shadow(0 0 4px rgba(0, 208, 132, 0.6))' }} />
                    ) : (
                      <span className="text-[#ff4444] text-sm font-bold drop-shadow-lg" style={{ filter: 'drop-shadow(0 0 4px rgba(255, 68, 68, 0.6))' }}>✕</span>
                    )}
                  </div>
                  <div className="flex justify-center">
                    {benefit.app ? (
                      <Check className="w-4 h-4 text-[#00d084] drop-shadow-lg" style={{ filter: 'drop-shadow(0 0 4px rgba(0, 208, 132, 0.6))' }} />
                    ) : (
                      <span className="text-[#ff4444] text-sm font-bold drop-shadow-lg" style={{ filter: 'drop-shadow(0 0 4px rgba(255, 68, 68, 0.6))' }}>✕</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botones */}
          <div className="space-y-3">
            <button
              onClick={() => {
                onClose();
                onLearnMore();
              }}
              className="block w-full py-3 px-4 rounded-lg text-center font-medium transition-all bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white border border-[#686868]/30"
            >
              Learn more
            </button>
            
            <button
              onClick={onClose}
              className="w-full py-3 px-4 rounded-lg font-medium transition-all bg-[#00d084] hover:bg-[#00c073] text-black hover:shadow-lg hover:shadow-[#00d084]/30"
            >
              Continue to wallpapers
            </button>
          </div>
        </div>

        {/* Estilos de animación */}
        <style jsx>{`
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(20px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}</style>
      </div>
    </div>
  );
}
