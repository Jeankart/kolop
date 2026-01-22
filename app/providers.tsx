'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getCSSVariables, type ColorScheme } from './theme/colorPalettes';

type Theme = 'dark' | 'light' | 'auto';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  setTheme: () => {},
  isDark: true,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  const applyColorScheme = (scheme: ColorScheme) => {
    const variables = getCSSVariables(scheme);
    const root = document.documentElement;
    Object.entries(variables).forEach(([key, value]) => {
      root.style.setProperty(key, value as string);
    });
  };

  const applyTheme = (effectiveTheme: 'dark' | 'light') => {
    const root = document.documentElement;
    root.classList.add('dark');
    applyColorScheme(effectiveTheme);
  };

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    const initialTheme = stored || 'dark';
    setTheme(initialTheme);

    let effectiveTheme: 'dark' | 'light' = initialTheme === 'auto'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      : initialTheme;

    setIsDark(effectiveTheme === 'dark');
    applyTheme(effectiveTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let effectiveTheme: 'dark' | 'light' = theme === 'auto'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      : theme;

    setIsDark(effectiveTheme === 'dark');
    applyTheme(effectiveTheme);
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  useEffect(() => {
    if (theme !== 'auto' || !mounted) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const effectiveTheme: 'dark' | 'light' = mediaQuery.matches ? 'dark' : 'light';
      setIsDark(mediaQuery.matches);
      applyTheme(effectiveTheme);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, mounted]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
