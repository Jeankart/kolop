'use client';

import { useState } from 'react';
import { Menu, X, Settings, Home, Info } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/app/providers';
import InstallGuideModal from './InstallGuideModal';

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [installGuideOpen, setInstallGuideOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme, isDark } = useTheme();

  const categories = [
    { name: 'Live', emoji: '🔴', path: '/live' },
    { name: 'Charging', emoji: '🔌', path: '/charging' },
    { name: 'AI', emoji: '🤖', path: '/ai' },
    { name: 'Aesthetic', emoji: '🎨', path: '/aesthetic' },
    { name: 'Widgets', emoji: '🎚️', path: '/widgets' },
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
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#151515]/80 dark:bg-[#151515]/80 backdrop-blur-md border-b border-zinc-800 dark:border-zinc-800 pt-safe py-2">
        <div className="flex items-center justify-between px-4">
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
            <div className="space-y-1">
              {categories.map((category) => (
                <Link
                  key={category.path}
                  href={category.path}
                  onClick={() => setSidebarOpen(false)}
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
