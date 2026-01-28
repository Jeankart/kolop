'use client';

import { useRouter } from 'next/navigation';
import { ReactElement } from 'react';

const categories = [
  { name: 'Live', icon: 'Live', href: '/live', color: '#00ff88' },
  { name: 'Charging', icon: 'Charging', href: '/charging', color: '#ffaa00' },
  { name: 'AI', icon: 'AI', href: '/ai', color: '#7c3aed' },
  { name: 'Aesthetic', icon: 'Aesthetic', href: '/aesthetic', color: '#ff1493' },
  { name: 'Widgets', icon: 'Widgets', href: '/widgets', color: '#ff6b9d' },
  { name: 'Cars', icon: 'Cars', href: '/cars', color: '#00d4ff' },
  { name: 'B&W', icon: 'BW', href: '/bw', color: '#ffffff' },
  { name: 'Urban', icon: 'Urban', href: '/urban', color: '#ffa500' },
  { name: 'Films', icon: 'Films', href: '/films', color: '#f43f5e' },
  { name: 'Cute', icon: 'Cute', href: '/cute', color: '#ec4899' },
  { name: 'Anime', icon: 'Anime', href: '/anime', color: '#06b6d4' },
];

// Icon components
const IconMap: { [key: string]: (color: string) => ReactElement } = {
  Live: (color) => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke={color} strokeWidth="2.5">
      <circle cx="12" cy="12" r="8" className="animate-pulse" />
      <circle cx="12" cy="12" r="4" fill={color} />
    </svg>
  ),
  Charging: (color) => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill={color} stroke="none">
      <path d="M12 2L6 10h5v8l6-8h-5V2Z" />
    </svg>
  ),
  AI: (color) => (
    <div className="font-bold text-base" style={{ color }}>AI</div>
  ),
  Aesthetic: (color) => (
    <div style={{ color, fontSize: '24px', fontWeight: 'bold' }}>!</div>
  ),
  Widgets: (color) => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill={color} stroke="none">
      <rect x="2" y="2" width="8" height="8" rx="1" />
      <rect x="14" y="2" width="8" height="8" rx="1" />
      <rect x="2" y="14" width="8" height="8" rx="1" />
      <rect x="14" y="14" width="8" height="8" rx="1" />
    </svg>
  ),
  Cars: (color) => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke={color} strokeWidth="2">
      <ellipse cx="12" cy="12" rx="9" ry="5" />
      <circle cx="6" cy="16" r="2" fill={color} />
      <circle cx="18" cy="16" r="2" fill={color} />
      <path d="M8 11L7 8c-.5-1 0-2 1-2h8c1 0 1.5 1 1 2l-1 3" stroke={color} fill="none" strokeLinecap="round" />
    </svg>
  ),
  BW: (color) => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke={color} strokeWidth="2">
      <circle cx="12" cy="12" r="9" fill={color} />
      <path d="M12 3A9 9 0 0112 21V3Z" fill="white" />
      <circle cx="12" cy="9" r="1.5" fill={color === '#ffffff' ? '#000' : color} />
      <circle cx="12" cy="15" r="1.5" fill={color === '#ffffff' ? '#000' : color} />
    </svg>
  ),
  Urban: (color) => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill={color} stroke="none">
      <ellipse cx="8" cy="18" rx="2.5" ry="2" fill={color} />
      <line x1="10" y1="16" x2="10" y2="5" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M10 5Q13 5 14 7Q14 9 10 8" fill={color} />
    </svg>
  ),
  Films: (color) => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill={color} stroke="none">
      <rect x="3" y="8" width="18" height="10" rx="1" />
      <path d="M7 21V3M17 21V3" />
      <polygon points="10,12 10,16 14,14" fill="white" />
    </svg>
  ),
  Cute: (color) => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill={color} stroke="none">
      <circle cx="12" cy="12" r="8" style={{ filter: `drop-shadow(0 0 3px ${color})` }} />
      <circle cx="9" cy="11" r="1.5" fill="white" />
      <circle cx="15" cy="11" r="1.5" fill="white" />
      <path d="M9 14C10 15 14 15 15 14" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
  ),
  Anime: (color) => (
    <div className="font-bold" style={{ color, fontSize: '28px', fontFamily: 'serif' }}>ア</div>
  ),
};

export default function CategoriesCarousel() {
  const router = useRouter();

  return (
    <section className="categoriasSection pt-4" style={{ paddingTop: '1rem', paddingBottom: '0rem', paddingLeft: '0rem', overflow: 'visible' }}>
      <div className="max-w-6xl mx-auto" style={{ overflow: 'visible' }}>
        {/* Carrusel horizontal */}
        <div className="overflow-y-hidden overflow-x-auto scrollbar-hide" style={{ overflowY: 'visible' }}>
          <div className="flex gap-3 py-4 px-3" style={{ width: 'fit-content', minWidth: '100%' }}>
            {categories.map((category, index) => {
              const baseClass = `flex-shrink-0 flex flex-col items-center justify-end gap-0 w-16 h-16 rounded-2xl backdrop-blur-md bg-gradient-to-br from-[#686868]/30 to-[#686868]/10 dark:from-[#686868]/30 dark:to-[#686868]/10 border border-[#686868]/50 dark:border-[#686868]/50 hover:border-[#686868]/80 hover:from-[#686868]/40 hover:to-[#686868]/20 transition-all duration-300 hover:scale-110 cursor-pointer relative pb-1`;
              
              return (
                <button
                  key={index}
                  onClick={() => router.push(category.href)}
                  className={baseClass}
                  title={category.name}
                  style={{
                    filter: `drop-shadow(0 0 2.5px ${category.color}33) drop-shadow(0 0 1px ${category.color}19)`,
                    boxShadow: `inset 0 0 5px ${category.color}11`,
                  }}
                >
                  <div className="flex items-center justify-center relative z-10 flex-1" style={{ overflow: 'visible' }}>
                    {IconMap[category.icon](category.color)}
                  </div>
                  <span className="text-[0.5rem] font-medium text-white dark:text-white text-center leading-none relative z-10 w-full px-0.5 h-2.5 flex items-center justify-center">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
