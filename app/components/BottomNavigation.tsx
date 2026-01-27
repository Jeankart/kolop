'use client';

import { Home, Flame, Smartphone } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNavigation() {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Flame, label: 'Hot', href: '/featured' },
    { icon: Smartphone, label: 'Live', href: '/live' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 backdrop-blur-md bg-[#686868]/20 dark:bg-[#686868]/20 border-t border-[#686868]/30 dark:border-[#686868]/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-around h-20 pb-safe">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center h-full gap-0 p-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-[#00d084]'
                    : 'text-white/60 dark:text-white/60 hover:text-white dark:hover:text-white'
                }`}
                aria-label={item.label}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'drop-shadow-lg' : ''}`} style={isActive ? { filter: 'drop-shadow(0 0 8px #00d084)' } : {}} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        nav {
          border-radius: 24px 24px 0 0;
        }
      `}</style>
    </nav>
  );
}
