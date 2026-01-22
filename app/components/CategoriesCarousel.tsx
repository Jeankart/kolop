'use client';

import { useRouter } from 'next/navigation';

const categories = [
  { name: 'Live', emoji: '📱', href: '/live', isButton: true },
  { name: 'Charging', emoji: '⚡' },
  { name: 'AI', emoji: '🤖' },
  { name: 'Aesthetic', emoji: '✨' },
  { name: 'Cats', emoji: '🐱' },
  { name: 'Cars', emoji: '🚗' },
  { name: 'B&W', emoji: '🎞️' },
  { name: 'Urban', emoji: '🏙️' },
  { name: 'Films', emoji: '🎬' },
  { name: 'Cute', emoji: '🌸' },
  { name: 'Anime', emoji: '⛩️' },
];

const colors = [
  'bg-zinc-900 dark:bg-zinc-900',
  'bg-zinc-800 dark:bg-zinc-900',
  'bg-zinc-800 dark:bg-zinc-900',
  'bg-zinc-800 dark:bg-zinc-900',
  'bg-zinc-800 dark:bg-zinc-900',
  'bg-zinc-800 dark:bg-zinc-900',
  'bg-zinc-900 dark:bg-zinc-900',
  'bg-zinc-800 dark:bg-zinc-900',
  'bg-zinc-800 dark:bg-zinc-900',
  'bg-zinc-800 dark:bg-zinc-900',
  'bg-zinc-800 dark:bg-zinc-900',
];

export default function CategoriesCarousel() {
  const router = useRouter();

  return (
    <section className="categoriasSection pt-4" style={{ paddingTop: '1rem', paddingBottom: '0', paddingLeft: '1rem' }}>
      <div className="max-w-6xl mx-auto">
        {/* Carrusel horizontal */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-3 pb-2" style={{ width: 'fit-content', minWidth: '100%' }}>
            {categories.map((category, index) => {
              const baseClass = `flex-shrink-0 flex flex-col items-center justify-center gap-1 w-16 h-16 rounded-2xl backdrop-blur-md bg-[#686868]/20 dark:bg-[#686868]/20 border border-[#686868]/30 dark:border-[#686868]/30 hover:opacity-80 transition-opacity`;
              
              return (
                <button
                  key={index}
                  onClick={() => category.isButton && router.push(category.href || '/')}
                  className={baseClass}
                  title={category.name}
                >
                  <span className="text-2xl">{category.emoji}</span>
                  <span className="text-xs font-medium text-white dark:text-white text-center">{category.name}</span>
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
