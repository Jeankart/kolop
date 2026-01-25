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
  Cats: (color) => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill={color} stroke="none">
      <path d="M12 2C16 5 18 7 18 12C18 16 16 18 12 18C8 18 6 16 6 12C6 7 8 5 12 2Z" />
      <path d="M9 9L11 11M13 9L15 11" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M12 15C11 14 10 14 9 14" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round" />
      <line x1="9" y1="3" x2="7" y2="1" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="15" y1="3" x2="17" y2="1" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
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
    { name: 'Cats', icon: 'Cats', path: '/cats', color: '#ff6b9d' },
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
            <div className="space-y-1">
              {categories.map((category) => (
                <Link
                  key={category.path}
                  href={category.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(category.path)
                      ? 'bg-[#686868]/30 text-[#00d084]'
                      : 'text-white hover:bg-[#686868]/20'
                  }`}
                >
                  <div className="flex items-center justify-center w-5 h-5">
                    {IconMap[category.icon](category.color)}
                  </div>
                  <span className="font-medium">{category.name}</span>
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
