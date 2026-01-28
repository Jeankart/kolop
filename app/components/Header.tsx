'use client';

import { useState, ReactElement } from 'react';
import { Menu, X, Settings, Home, Info } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/app/providers';
import InstallGuideModal from './InstallGuideModal';

// Icon components matching CategoriesCarousel
const IconMap: { [key: string]: (color: string) => ReactElement } = {
  Live: (color) => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke={color} strokeWidth="2.5">
      <circle cx="12" cy="12" r="8" className="animate-pulse" />
      <circle cx="12" cy="12" r="4" fill={color} />
    </svg>
  ),
  Charging: (color) => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill={color} stroke="none">
      <path d="M12 2L6 10h5v8l6-8h-5V2Z" />
    </svg>
  ),
  AI: (color) => (
    <div className="font-bold text-sm" style={{ color }}>AI</div>
  ),
  Aesthetic: (color) => (
    <div style={{ color, fontSize: '18px', fontWeight: 'bold' }}>!</div>
  ),
  Widgets: (color) => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill={color} stroke="none">
      <rect x="2" y="2" width="8" height="8" rx="1" />
      <rect x="14" y="2" width="8" height="8" rx="1" />
      <rect x="2" y="14" width="8" height="8" rx="1" />
      <rect x="14" y="14" width="8" height="8" rx="1" />
    </svg>
  ),
  Cars: (color) => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke={color} strokeWidth="2">
      <ellipse cx="12" cy="12" rx="9" ry="5" />
      <circle cx="6" cy="16" r="2" fill={color} />
      <circle cx="18" cy="16" r="2" fill={color} />
      <path d="M8 11L7 8c-.5-1 0-2 1-2h8c1 0 1.5 1 1 2l-1 3" stroke={color} fill="none" strokeLinecap="round" />
    </svg>
  ),
  BW: (color) => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke={color} strokeWidth="2">
      <circle cx="12" cy="12" r="9" fill={color} />
      <path d="M12 3A9 9 0 0112 21V3Z" fill="white" />
      <circle cx="12" cy="9" r="1.5" fill={color === '#ffffff' ? '#000' : color} />
      <circle cx="12" cy="15" r="1.5" fill={color === '#ffffff' ? '#000' : color} />
    </svg>
  ),
  Urban: (color) => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill={color} stroke="none">
      <ellipse cx="8" cy="18" rx="2.5" ry="2" fill={color} />
      <line x1="10" y1="16" x2="10" y2="5" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M10 5Q13 5 14 7Q14 9 10 8" fill={color} />
    </svg>
  ),
  Films: (color) => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill={color} stroke="none">
      <rect x="3" y="8" width="18" height="10" rx="1" />
      <path d="M7 21V3M17 21V3" />
      <polygon points="10,12 10,16 14,14" fill="white" />
    </svg>
  ),
  Cute: (color) => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill={color} stroke="none">
      <circle cx="12" cy="12" r="8" style={{ filter: `drop-shadow(0 0 3px ${color})` }} />
      <circle cx="9" cy="11" r="1.5" fill="white" />
      <circle cx="15" cy="11" r="1.5" fill="white" />
      <path d="M9 14C10 15 14 15 15 14" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
  ),
  Anime: (color) => (
    <div className="font-bold" style={{ color, fontSize: '20px', fontFamily: 'serif' }}>ア</div>
  ),
};

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [installGuideOpen, setInstallGuideOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme, isDark } = useTheme();

  const categories = [
    { name: 'Live', icon: 'Live', path: '/live', color: '#00ff88' },
    { name: 'Charging', icon: 'Charging', path: '/charging', color: '#ffaa00' },
    { name: 'AI', icon: 'AI', path: '/ai', color: '#7c3aed' },
    { name: 'Aesthetic', icon: 'Aesthetic', path: '/aesthetic', color: '#ff1493' },
    { name: 'Widgets', icon: 'Widgets', path: '/widgets', color: '#ff6b9d' },
    { name: 'Cars', icon: 'Cars', path: '/cars', color: '#00d4ff' },
    { name: 'B&W', icon: 'BW', path: '/bw', color: '#ffffff' },
    { name: 'Urban', icon: 'Urban', path: '/urban', color: '#ffa500' },
    { name: 'Films', icon: 'Films', path: '/films', color: '#f43f5e' },
    { name: 'Cute', icon: 'Cute', path: '/cute', color: '#ec4899' },
    { name: 'Anime', icon: 'Anime', path: '/anime', color: '#06b6d4' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#151515]/80 dark:bg-[#151515]/80 backdrop-blur-md border-b border-zinc-800 dark:border-zinc-800" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <div className="flex items-center justify-between px-4 py-2">
          {/* Menu hamburguesa */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-colors"
            aria-label="Abrir menú"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5 text-white dark:text-white" />
            ) : (
              <Menu className="w-5 h-5 text-white dark:text-white" />
            )}
          </button>

          {/* Logo centrado */}
          <Link href="/" className="flex-1 flex justify-center">
            <img src="/kloop-logo.png" alt="Kloop Logo" className="h-6 w-auto" />
          </Link>

          {/* Botón Info a la derecha */}
          <button
            onClick={() => setInstallGuideOpen(true)}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-colors"
            aria-label="Información"
          >
            <Info className="w-5 h-5 text-white dark:text-white" />
          </button>
        </div>
      </header>

      {/* Modal de Instalación */}
      <InstallGuideModal isOpen={installGuideOpen} onClose={() => setInstallGuideOpen(false)} />

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-[#151515] dark:bg-[#151515] border-r border-[#686868]/30 z-30 transform transition-transform duration-300 pt-16 overflow-y-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-4 py-6 space-y-6 pb-20">
          {/* Home */}
          <div>
            <Link
              href="/"
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive('/')
                  ? 'bg-[#686868]/30 text-[#00d084]'
                  : 'text-white hover:bg-[#686868]/20'
              }`}
            >
              <Home size={20} />
              <span className="font-medium">Home</span>
            </Link>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-semibold text-[#a0a0a0] uppercase tracking-wider px-4 mb-3">
              Categorías
            </h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.path}
                  href={category.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive(category.path)
                      ? 'bg-gradient-to-br from-[#686868]/40 to-[#686868]/20 border border-[#686868]/80'
                      : 'bg-gradient-to-br from-[#686868]/20 to-[#686868]/10 border border-[#686868]/30 hover:from-[#686868]/30 hover:to-[#686868]/15 hover:border-[#686868]/50'
                  }`}
                  style={
                    isActive(category.path)
                      ? {
                          boxShadow: `inset 0 0 8px ${category.color}22, 0 0 12px ${category.color}33`,
                        }
                      : {
                          boxShadow: `inset 0 0 4px ${category.color}11, 0 0 6px ${category.color}19`,
                        }
                  }
                >
                  <div className="flex items-center justify-center w-6 h-6 flex-shrink-0">
                    {IconMap[category.icon](isActive(category.path) ? category.color : category.color)}
                  </div>
                  <span className={`font-medium text-sm ${isActive(category.path) ? 'text-white' : 'text-white'}`}>
                    {category.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div>
            <Link
              href="/settings"
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive('/settings')
                  ? 'bg-[#686868]/30 text-[#00d084]'
                  : 'text-white hover:bg-[#686868]/20'
              }`}
            >
              <Settings size={20} />
              <span className="font-medium">Ajustes</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}
