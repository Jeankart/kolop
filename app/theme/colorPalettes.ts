// Color Palettes for Light and Dark Mode
export const colorPalettes = {
  dark: {
    background: '#151515',
    foreground: '#ededed',
    accent: '#00d084',
    // Backgrounds
    surface: {
      primary: '#1f1f1f',
      secondary: '#2a2a2a',
      tertiary: '#343434',
    },
    // Card/Component colors
    card: {
      bg: '#1a1a1a',
      border: '#2f2f2f',
    },
    // Text
    text: {
      primary: '#ededed',
      secondary: '#a0a0a0',
      tertiary: '#6b6b6b',
    },
    // UI Elements
    button: {
      hover: 'rgba(255, 255, 255, 0.1)',
      active: 'rgba(255, 255, 255, 0.2)',
    },
    // Glassmorphism
    glass: {
      background: 'rgba(21, 21, 21, 0.3)',
      border: 'rgba(255, 255, 255, 0.1)',
    },
  },
  light: {
    background: '#ffffff',
    foreground: '#171717',
    accent: '#00d084',
    // Backgrounds
    surface: {
      primary: '#f5f5f5',
      secondary: '#eeeeee',
      tertiary: '#e8e8e8',
    },
    // Card/Component colors
    card: {
      bg: '#fafafa',
      border: '#e0e0e0',
    },
    // Text
    text: {
      primary: '#171717',
      secondary: '#666666',
      tertiary: '#999999',
    },
    // UI Elements
    button: {
      hover: 'rgba(0, 0, 0, 0.05)',
      active: 'rgba(0, 0, 0, 0.1)',
    },
    // Glassmorphism
    glass: {
      background: 'rgba(255, 255, 255, 0.5)',
      border: 'rgba(255, 255, 255, 0.8)',
    },
  },
};

export type ColorScheme = 'dark' | 'light';

export function getCSSVariables(scheme: ColorScheme) {
  const palette = colorPalettes[scheme];
  return {
    '--background': palette.background,
    '--foreground': palette.foreground,
    '--accent': palette.accent,
    '--surface-primary': palette.surface.primary,
    '--surface-secondary': palette.surface.secondary,
    '--surface-tertiary': palette.surface.tertiary,
    '--card-bg': palette.card.bg,
    '--card-border': palette.card.border,
    '--text-primary': palette.text.primary,
    '--text-secondary': palette.text.secondary,
    '--text-tertiary': palette.text.tertiary,
    '--button-hover': palette.button.hover,
    '--button-active': palette.button.active,
    '--glass-bg': palette.glass.background,
    '--glass-border': palette.glass.border,
  };
}
