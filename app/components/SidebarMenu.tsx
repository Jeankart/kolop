'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Home, Settings } from 'lucide-react';

export default function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const categories = [
    { name: 'Live', emoji: '🔴', path: '/live' },
    { name: 'Charging', emoji: '🔌', path: '/charging' },
    { name: 'AI', emoji: '🤖', path: '/ai' },
    { name: 'Aesthetic', emoji: '🎨', path: '/aesthetic' },
    { name: 'Cats', emoji: '🐱', path: '/cats' },
    { name: 'Cars', emoji: '🏎️', path: '/cars' },
    { name: 'B&W', emoji: '⚫', path: '/bw' },
    { name: 'Urban', emoji: '🏙️', path: '/urban' },
    { name: 'Films', emoji: '🎬', path: '/films' },
    { name: 'Cute', emoji: '🌸', path: '/cute' },
    { name: 'Anime', emoji: '⛩️', path: '/anime' },
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
                  <span className="text-lg">{category.emoji}</span>
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
