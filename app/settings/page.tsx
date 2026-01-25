'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Moon, Sun, Share2, HelpCircle, Trash2, Globe } from 'lucide-react';
import Header from '@/app/components/Header';
import BottomNavigation from '@/app/components/BottomNavigation';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load from localStorage on mount
    const savedTheme = localStorage.getItem('theme');
    const savedLanguage = localStorage.getItem('language');
    
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleThemeToggle = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
    }
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  const handleClearCache = () => {
    if (typeof window !== 'undefined') {
      if (confirm('Clear application cache? This action cannot be undone.')) {
        localStorage.clear();
        alert('Cache cleared successfully');
      }
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Wallpaper',
        text: 'Download the best wallpapers for your device',
        url: window.location.origin,
      });
    }
  };

  if (!mounted) return null;

  return (
    <main className="bg-zinc-950 min-h-screen overflow-x-hidden">
      <Header />
      <section className="px-4 md:px-6 py-8 max-w-2xl mx-auto pt-24 pb-20">
        {/* Header with back button */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/" className="text-white hover:text-[#00d084] transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Settings</h1>
        </div>

        {/* Configuration Sections */}
        <div className="space-y-6">
          {/* Section: Appearance */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              Appearance
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Dark Mode</p>
                <p className="text-xs text-zinc-400 mt-1">Use dark colors on the interface</p>
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

          {/* Section: Language */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Language
            </h2>
            <div className="space-y-2">
              <button
                onClick={() => handleLanguageChange('es')}
                className={`w-full px-4 py-2 rounded-lg transition-colors text-left ${
                  language === 'es'
                    ? 'bg-[#00d084] text-black font-semibold'
                    : 'bg-zinc-800 text-white hover:bg-zinc-700'
                }`}
              >
                🇪🇸 Spanish
              </button>
              <button
                onClick={() => handleLanguageChange('en')}
                className={`w-full px-4 py-2 rounded-lg transition-colors text-left ${
                  language === 'en'
                    ? 'bg-[#00d084] text-black font-semibold'
                    : 'bg-zinc-800 text-white hover:bg-zinc-700'
                }`}
              >
                🇬🇧 English
              </button>
            </div>
          </div>

          {/* Section: Share */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              Share
            </h2>
            <button
              onClick={handleShare}
              className="w-full px-4 py-3 bg-[#00d084] text-black font-semibold rounded-lg hover:bg-[#00c770] transition-colors"
            >
              Share Wallpaper
            </button>
            <p className="text-xs text-zinc-400 mt-3">Invite your friends to discover our wallpapers</p>
          </div>

          {/* Section: Storage */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              Storage
            </h2>
            <div className="space-y-4">
              <div className="bg-zinc-800/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-zinc-400">Application cache</p>
                  <p className="text-xs bg-zinc-700 text-zinc-200 px-2 py-1 rounded">~2.5 MB</p>
                </div>
                <p className="text-xs text-zinc-500">Automatically cleaned every 30 days</p>
              </div>
              <button
                onClick={handleClearCache}
                className="w-full px-4 py-2 bg-red-900/50 hover:bg-red-900 text-red-200 border border-red-800 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear Cache
              </button>
              <p className="text-xs text-zinc-500 text-center">This action cannot be undone</p>
            </div>
          </div>

          {/* Section: About */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              About
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Version</span>
                <span className="text-white font-semibold">1.0.0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Available wallpapers</span>
                <span className="text-white font-semibold">17+</span>
              </div>
            </div>
          </div>

          {/* Section: Useful Links */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">Useful Links</h2>
            <div className="space-y-2">
              <Link
                href="/privacy"
                className="block px-4 py-2 text-[#00d084] hover:text-[#00c770] transition-colors text-sm"
              >
                → Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="block px-4 py-2 text-[#00d084] hover:text-[#00c770] transition-colors text-sm"
              >
                → Terms of Service
              </Link>
              <a
                href="mailto:support@kloop.wallpapers.app"
                className="block px-4 py-2 text-[#00d084] hover:text-[#00c770] transition-colors text-sm"
              >
                → Contact
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-4 pb-8">
            <p className="text-zinc-500 text-xs">
              Made with ❤️ for wallpaper lovers
            </p>
            <p className="text-zinc-600 text-xs mt-2">
              © 2026 Wallpaper. All rights reserved.
            </p>
          </div>
        </div>
      </section>

      <BottomNavigation />
    </main>
  );
}
