'use client';

import { useState, ReactElement } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Home, Settings } from 'lucide-react';

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
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill={color} stroke="none">
      <path d="M2 14L3 10H21L22 14C22 15 21 16 20 16H4C3 16 2 15 2 14Z" />
      <circle cx="5" cy="16" r="1.5" fill="white" />
      <circle cx="19" cy="16" r="1.5" fill="white" />
      <rect x="6" y="11" width="12" height="2" fill={color} opacity="0.6" />
    </svg>
  ),
  BW: (color) => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill={color} stroke="none">
      <circle cx="12" cy="12" r="8" style={{ filter: `drop-shadow(0 0 3px ${color})` }} />
      <path d="M12 4V20M4 12H20" stroke="white" strokeWidth="1" fill="none" />
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

export default function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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
      {/* Menu Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-20 z-30 w-10 h-10 rounded-full backdrop-blur-md bg-[#686868]/20 dark:bg-[#686868]/20 border border-[#686868]/30 flex items-center justify-center hover:bg-[#686868]/30 transition-colors"
      >
        {isOpen ? (
          <X size={20} className="text-white" />
        ) : (
          <Menu size={20} className="text-white" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-[#151515] dark:bg-[#151515] border-r border-[#686868]/30 z-50 transform transition-transform duration-300 pt-24 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-4 py-6 space-y-6">
          {/* Home */}
          <div>
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
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
                  onClick={() => setIsOpen(false)}
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
              onClick={() => setIsOpen(false)}
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
    </>
  );
}
