'use client';

import { ThemeProvider } from './providers';
import Header from './components/Header';
import BottomNavigation from './components/BottomNavigation';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <Header />
      <main className="pb-24 bg-[#151515] dark:bg-[#151515]">
        {children}
      </main>
      <BottomNavigation />
    </ThemeProvider>
  );
}
