'use client';

import { useRouter } from 'next/navigation';
import { ReactElement } from 'react';

const categories = [
  { name: 'Live', icon: 'Live', href: '/live', color: '#00ff88' },
  { name: 'Charging', icon: 'Charging', href: '/charging', color: '#ffaa00' },
  { name: 'AI', icon: 'AI', href: '/ai', color: '#7c3aed' },
  { name: 'Aesthetic', icon: 'Aesthetic', href: '/aesthetic', color: '#ff1493' },
  { name: 'Cats', icon: 'Cats', href: '/cats', color: '#ff6b9d' },
  { name: 'Cars', icon: 'Cars', href: '/cars', color: '#00d4ff' },
  { name: 'B&W', icon: 'BW', href: '/bw', color: '#ffffff' },
  { name: 'Urban', icon: 'Urban', href: '/urban', color: '#1f2937' },
  { name: 'Films', icon: 'Films', href: '/films', color: '#f43f5e' },
  { name: 'Cute', icon: 'Cute', href: '/cute', color: '#ec4899' },
  { name: 'Anime', icon: 'Anime', href: '/anime', color: '#06b6d4' },
];

// Icon components
const IconMap: { [key: string]: (color: string) => ReactElement } = {
  Live: (color) => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke={color} strokeWidth="2.5">
      <circle cx="12" cy="12" r="8" className="animate-pulse" />
      <circle cx="12" cy="12" r="4" fill={color} />
    </svg>
  ),
  Charging: (color) => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill={color} stroke="none">
      <path d="M12 2L6 10h5v8l6-8h-5V2Z" />
    </svg>
  ),
  AI: (color) => (
    <div className="font-bold text-base" style={{ color }}>AI</div>
  ),
  Aesthetic: (color) => (
    <div style={{ color, fontSize: '24px', fontWeight: 'bold' }}>!</div>
  ),
  Cats: (color) => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill={color} stroke="none">
      <path d="M12 2C16 5 18 7 18 12C18 16 16 18 12 18C8 18 6 16 6 12C6 7 8 5 12 2Z" />
      <path d="M9 9L11 11M13 9L15 11" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M12 15C11 14 10 14 9 14" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round" />
      <line x1="9" y1="3" x2="7" y2="1" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="15" y1="3" x2="17" y2="1" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  Cars: (color) => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill={color} stroke="none">
      <path d="M2 14L3 10H21L22 14C22 15 21 16 20 16H4C3 16 2 15 2 14Z" />
      <circle cx="5" cy="16" r="1.5" fill="white" />
      <circle cx="19" cy="16" r="1.5" fill="white" />
      <rect x="6" y="11" width="12" height="2" fill={color} opacity="0.6" />
    </svg>
  ),
  BW: (color) => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill={color} stroke="none">
      <circle cx="12" cy="12" r="8" style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
      <path d="M12 4V20M4 12H20" stroke="white" strokeWidth="1" fill="none" />
    </svg>
  ),
  Urban: (color) => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill={color} stroke="none">
      <path d="M3 20L3 6L6 3L6 20M8 20L8 8L11 5L11 20M13 20L13 7L16 4L16 20M18 20L18 10L21 8L21 20M2 21L22 21" />
      <circle cx="5" cy="10" r="0.8" fill="white" opacity="0.7" />
      <circle cx="5" cy="14" r="0.8" fill="white" opacity="0.7" />
      <circle cx="10" cy="12" r="0.8" fill="white" opacity="0.7" />
      <circle cx="15" cy="10" r="0.8" fill="white" opacity="0.7" />
    </svg>
  ),
  Films: (color) => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill={color} stroke="none">
      <rect x="3" y="8" width="18" height="10" rx="1" />
      <path d="M7 21V3M17 21V3" />
      <polygon points="10,12 10,16 14,14" fill="white" />
    </svg>
  ),
  Cute: (color) => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill={color} stroke="none">
      <circle cx="12" cy="12" r="8" style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
      <circle cx="9" cy="11" r="1.5" fill="white" />
      <circle cx="15" cy="11" r="1.5" fill="white" />
      <path d="M9 14C10 15 14 15 15 14" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
  ),
  Anime: (color) => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#dc2626" stroke="none">
      <ellipse cx="12" cy="12" rx="3" ry="5" />
      <circle cx="12" cy="10" r="1.5" fill="white" />
    </svg>
  ),
};

export default function CategoriesCarousel() {
  const router = useRouter();

  return (
    <section className="categoriasSection pt-4" style={{ paddingTop: '1rem', paddingBottom: '1rem', paddingLeft: '1rem', overflow: 'visible' }}>
      <div className="max-w-6xl mx-auto" style={{ overflow: 'visible' }}>
        {/* Carrusel horizontal */}
        <div className="overflow-y-hidden overflow-x-auto scrollbar-hide" style={{ overflowY: 'visible' }}>
          <div className="flex gap-3 py-4 px-3" style={{ width: 'fit-content', minWidth: '100%' }}>
            {categories.map((category, index) => {
              const baseClass = `flex-shrink-0 flex flex-col items-center justify-center gap-2 w-16 h-16 rounded-2xl backdrop-blur-md bg-gradient-to-br from-[#686868]/30 to-[#686868]/10 dark:from-[#686868]/30 dark:to-[#686868]/10 border border-[#686868]/50 dark:border-[#686868]/50 hover:border-[#686868]/80 hover:from-[#686868]/40 hover:to-[#686868]/20 transition-all duration-300 hover:scale-110 cursor-pointer relative`;
              
              return (
                <button
                  key={index}
                  onClick={() => router.push(category.href)}
                  className={baseClass}
                  title={category.name}
                  style={{
                    filter: `drop-shadow(0 0 8px ${category.color}88) drop-shadow(0 0 4px ${category.color}44)`,
                    boxShadow: `inset 0 0 10px ${category.color}22`,
                  }}
                >
                  <div className="flex items-center justify-center relative z-10">
                    {IconMap[category.icon](category.color)}
                  </div>
                  <span className="text-[0.65rem] font-medium text-white dark:text-white text-center leading-none relative z-10 w-full px-0.5">{category.name}</span>
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
