'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Moon, Sun, Bell, Share2, HelpCircle } from 'lucide-react';
import Header from '@/app/components/Header';
import BottomNavigation from '@/app/components/BottomNavigation';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    // En una versión real, guardarías esto en localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', !darkMode ? 'dark' : 'light');
    }
  };

  const handleNotifications = () => {
    setNotifications(!notifications);
    if (typeof window !== 'undefined') {
      localStorage.setItem('notifications', JSON.stringify(!notifications));
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Wallpaper',
        text: 'Descarga los mejores wallpapers para tu dispositivo',
        url: window.location.origin,
      });
    }
  };

  return (
    <main className="bg-zinc-950 min-h-screen overflow-x-hidden">
      <Header />
      <section className="px-4 md:px-6 py-8 max-w-2xl mx-auto pt-24 pb-20">
        {/* Header con botón de regreso */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/" className="text-white hover:text-[#00d084] transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Ajustes</h1>
        </div>

        {/* Secciones de Configuración */}
        <div className="space-y-6">
          {/* Sección: Apariencia */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              Apariencia
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Modo Oscuro</p>
                <p className="text-xs text-zinc-400 mt-1">Usa colores oscuros en la interfaz</p>
              </div>
              <button
                onClick={handleThemeToggle}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  darkMode ? 'bg-[#00d084]' : 'bg-zinc-700'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    darkMode ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Sección: Notificaciones */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notificaciones
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Notificaciones de nuevos wallpapers</p>
                <p className="text-xs text-zinc-400 mt-1">Recibe notificaciones cuando hay nuevos contenidos</p>
              </div>
              <button
                onClick={handleNotifications}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  notifications ? 'bg-[#00d084]' : 'bg-zinc-700'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    notifications ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Sección: Compartir */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              Compartir
            </h2>
            <button
              onClick={handleShare}
              className="w-full px-4 py-3 bg-[#00d084] text-black font-semibold rounded-lg hover:bg-[#00c770] transition-colors"
            >
              Compartir Wallpaper
            </button>
            <p className="text-xs text-zinc-400 mt-3">Invita a tus amigos a descubrir nuestros wallpapers</p>
          </div>

          {/* Sección: Acerca de */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              Información
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Versión</span>
                <span className="text-white font-semibold">1.0.0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Wallpapers disponibles</span>
                <span className="text-white font-semibold">17+</span>
              </div>
            </div>
          </div>

          {/* Sección: Enlaces útiles */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">Enlaces útiles</h2>
            <div className="space-y-2">
              <Link
                href="/privacy"
                className="block px-4 py-2 text-[#00d084] hover:text-[#00c770] transition-colors text-sm"
              >
                → Política de Privacidad
              </Link>
              <Link
                href="/terms"
                className="block px-4 py-2 text-[#00d084] hover:text-[#00c770] transition-colors text-sm"
              >
                → Términos de Servicio
              </Link>
              <a
                href="mailto:support@wallpaper.com"
                className="block px-4 py-2 text-[#00d084] hover:text-[#00c770] transition-colors text-sm"
              >
                → Contacto
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-4 pb-8">
            <p className="text-zinc-500 text-xs">
              Made with ❤️ for wallpaper lovers
            </p>
            <p className="text-zinc-600 text-xs mt-2">
              © 2026 Wallpaper. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </section>

      <BottomNavigation />
    </main>
  );
}
