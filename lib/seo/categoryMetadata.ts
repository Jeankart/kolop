import { Metadata } from 'next';

export const categoryMetadata: Record<string, { title: string; description: string }> = {
  ios: {
    title: 'iOS Wallpapers - Backgrounds for iPhone & iPad',
    description: 'Download wallpapers designed specifically for iOS. High-quality backgrounds for iPhone, iPad and Apple devices.',
  },
  live: {
    title: 'Live Wallpapers - Animated Backgrounds',
    description: 'Download animated wallpapers for your device. Dynamic and moving backgrounds for a unique visual experience.',
  },
  ai: {
    title: 'AI Wallpapers - AI-Generated Backgrounds',
    description: 'Discover wallpapers generated with Artificial Intelligence. Unique and personalized designs created automatically.',
  },
  aesthetic: {
    title: 'Aesthetic Wallpapers - Beautiful Backgrounds',
    description: 'Download aesthetic wallpapers. Minimalist and elegant backgrounds for your device.',
  },
  anime: {
    title: 'Anime Wallpapers - Anime Backgrounds',
    description: 'The best anime wallpapers. Beautiful backgrounds featuring characters and scenes from your favorite series.',
  },
  bw: {
    title: 'Black & White Wallpapers - BW Backgrounds',
    description: 'Black and white wallpapers. Classic and elegant backgrounds for your device.',
  },
  cars: {
    title: 'Cars Wallpapers - Vehicle Backgrounds',
    description: 'Download car wallpapers. High-quality backgrounds featuring sports cars and impressive vehicles.',
  },
  cats: {
    title: 'Cats Wallpapers - Cat Backgrounds',
    description: 'Wallpapers with cats. Adorable and cute backgrounds featuring cats for your device.',
  },
  charging: {
    title: 'Charging Wallpapers - Charging Backgrounds',
    description: 'Wallpapers with charging theme. Fun and attractive backgrounds for your device.',
  },
  cute: {
    title: 'Cute Wallpapers - Adorable Backgrounds',
    description: 'Download cute and adorable wallpapers. Cute and colorful backgrounds for your device.',
  },
  films: {
    title: 'Films Wallpapers - Movie Backgrounds',
    description: 'Movie wallpapers. Beautiful backgrounds featuring scenes and characters from films.',
  },
  urban: {
    title: 'Urban Wallpapers - Modern City Backgrounds',
    description: 'Urban and modern backgrounds. Wallpapers with city theme and contemporary architecture.',
  },
  featured: {
    title: 'Featured Wallpapers - Trending Backgrounds',
    description: 'Discover our featured and popular wallpapers. The best selected backgrounds for your device.',
  },
};

export function getCategoryMetadata(category: string): Metadata {
  const categoryKey = category.toLowerCase();
  const info = categoryMetadata[categoryKey] || {
    title: `${category} Wallpapers`,
    description: `Download ${category} wallpapers. High-quality backgrounds for your device.`,
  };

  return {
    title: info.title,
    description: info.description,
    keywords: `wallpaper ${category}, backgrounds, download`,
    openGraph: {
      title: info.title,
      description: info.description,
      type: 'website',
      url: `https://kloop.vercel.app/${categoryKey}`,
    },
  };
}
