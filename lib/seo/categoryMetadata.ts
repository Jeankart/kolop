import { Metadata } from 'next';

export const categoryMetadata: Record<string, { 
  title: string; 
  description: string; 
  keywords: string;
  longDescription: string;
}> = {
  ios: {
    title: 'iOS & iPad Wallpapers - Premium High-Quality Backgrounds for Apple Devices',
    description: 'Download premium iOS wallpapers optimized for iPhone, iPad, and Apple Watch. Curated high-quality backgrounds for all Apple devices.',
    keywords: 'iOS wallpapers, iPhone wallpapers, iPad backgrounds, Apple wallpapers, high-quality, 4K, download free',
    longDescription: 'Explore our premium collection of iOS wallpapers specifically designed for iPhone and iPad. All wallpapers are optimized for Apple devices with perfect aspect ratios and resolutions.',
  },
  live: {
    title: 'Animated Live Wallpapers - Dynamic Moving Backgrounds | Kloop',
    description: 'Download animated live wallpapers with dynamic motion effects. Premium moving backgrounds for an engaging visual experience on your device.',
    keywords: 'live wallpapers, animated backgrounds, moving wallpapers, dynamic effects, video wallpapers',
    longDescription: 'Discover dynamic animated wallpapers with smooth motion effects. Perfect for users who want engaging, moving backgrounds on their devices.',
  },
  ai: {
    title: 'AI-Generated Wallpapers - Unique Artificial Intelligence Art Backgrounds',
    description: 'Explore AI-generated wallpapers created with cutting-edge artificial intelligence. Unique, personalized, and creative backgrounds generated automatically.',
    keywords: 'AI wallpapers, AI art, generated backgrounds, artificial intelligence, creative wallpapers, unique designs',
    longDescription: 'Experience the future with AI-generated wallpapers. Each background is created using advanced artificial intelligence, ensuring unique and creative designs.',
  },
  aesthetic: {
    title: 'Aesthetic Wallpapers - Minimalist & Elegant High-Quality Backgrounds',
    description: 'Download aesthetic wallpapers featuring minimalist and elegant designs. Beautiful, sophisticated backgrounds for a refined look on your device.',
    keywords: 'aesthetic wallpapers, minimalist wallpapers, elegant backgrounds, modern wallpapers, artistic designs',
    longDescription: 'Premium aesthetic wallpapers perfect for those who appreciate minimalist and elegant design. Each background combines simplicity with visual appeal.',
  },
  anime: {
    title: 'Anime Wallpapers - Manga & Anime Character Backgrounds',
    description: 'Download premium anime wallpapers featuring characters and scenes from your favorite series. High-quality backgrounds for anime fans.',
    keywords: 'anime wallpapers, manga wallpapers, anime backgrounds, character wallpapers, Japanese anime',
    longDescription: 'Explore our extensive collection of anime wallpapers featuring characters and iconic scenes from popular anime series and manga.',
  },
  bw: {
    title: 'Black & White Wallpapers - Classic Monochrome High-Quality Backgrounds',
    description: 'Download black and white wallpapers offering timeless elegance. Premium monochrome backgrounds for a classic, sophisticated aesthetic.',
    keywords: 'black and white wallpapers, monochrome backgrounds, BW wallpapers, classic wallpapers, elegant designs',
    longDescription: 'Classic black and white wallpapers that never go out of style. Perfect for creating a sophisticated, minimalist look on any device.',
  },
  cars: {
    title: 'Car Wallpapers - Luxury & Sports Car High-Quality Backgrounds',
    description: 'Download premium car wallpapers featuring luxury, sports, and supercars. High-resolution automotive backgrounds for car enthusiasts.',
    keywords: 'car wallpapers, sports car backgrounds, luxury cars, vehicle wallpapers, automotive backgrounds, supercars',
    longDescription: 'Premium wallpapers featuring stunning sports cars, luxury vehicles, and supercars. Perfect for automotive enthusiasts and car lovers.',
  },
  cats: {
    title: 'Cat Wallpapers - Cute & Adorable Feline Backgrounds',
    description: 'Download cute cat wallpapers featuring adorable felines. Charming and playful backgrounds perfect for cat lovers.',
    keywords: 'cat wallpapers, cute cat backgrounds, feline wallpapers, kitten backgrounds, cat lovers',
    longDescription: 'Adorable cat wallpapers featuring cute and charming feline photos. Perfect for cat enthusiasts who want to personalize their devices.',
  },
  charging: {
    title: 'Charging Wallpapers - Fun & Creative Charging Screen Backgrounds',
    description: 'Download fun charging wallpapers with creative designs. Perfect for enhancing your devices charging screen experience.',
    keywords: 'charging wallpapers, charging screen, battery wallpapers, charging animation, device wallpapers',
    longDescription: 'Creative charging wallpapers designed to make your device charging experience more enjoyable and visually appealing.',
  },
  cute: {
    title: 'Cute Wallpapers - Adorable & Colorful High-Quality Backgrounds',
    description: 'Download cute and adorable wallpapers with colorful, charming designs. Perfect backgrounds for those who love cuteness and playfulness.',
    keywords: 'cute wallpapers, adorable backgrounds, colorful wallpapers, pastel wallpapers, fun designs',
    longDescription: 'Delightful cute wallpapers featuring colorful and charming designs. Perfect for anyone who wants to add a touch of playfulness to their device.',
  },
  films: {
    title: 'Movie Wallpapers - Film & Cinema High-Quality Backgrounds',
    description: 'Download premium movie wallpapers featuring iconic scenes and characters from films. Cinema-inspired backgrounds for film enthusiasts.',
    keywords: 'movie wallpapers, film backgrounds, cinema wallpapers, movie characters, Hollywood wallpapers',
    longDescription: 'Premium wallpapers featuring iconic moments and characters from your favorite films. Perfect for cinema and entertainment lovers.',
  },
  urban: {
    title: 'Urban Wallpapers - Modern City & Architecture High-Quality Backgrounds',
    description: 'Download urban wallpapers featuring modern cityscapes, architecture, and contemporary design. Perfect backgrounds for city lovers.',
    keywords: 'urban wallpapers, city backgrounds, architecture wallpapers, modern design, cityscape, metropolitan',
    longDescription: 'Modern urban wallpapers showcasing stunning cityscapes and contemporary architecture. Ideal for those who love urban aesthetics.',
  },
  featured: {
    title: 'Featured & Trending Wallpapers - Best Curated High-Quality Backgrounds',
    description: 'Discover our featured and trending wallpapers. The most popular and carefully curated backgrounds selected for their exceptional quality.',
    keywords: 'featured wallpapers, trending wallpapers, best wallpapers, popular backgrounds, curated selection',
    longDescription: 'Explore our carefully curated selection of featured wallpapers. These are the most popular and highest-quality backgrounds in our collection.',
  },
};

export function getCategoryMetadata(category: string): Metadata {
  const categoryKey = category.toLowerCase();
  const info = categoryMetadata[categoryKey] || {
    title: `${category} Wallpapers - Premium High-Quality Backgrounds | Kloop`,
    description: `Download premium ${category} wallpapers. High-quality backgrounds optimized for all devices.`,
    keywords: `${category} wallpapers, ${category} backgrounds, download free`,
    longDescription: `Premium ${category} wallpapers curated for quality and aesthetics.`,
  };

  return {
    title: info.title,
    description: info.description,
    keywords: info.keywords,
    alternates: {
      canonical: `https://kloop.vercel.app/${categoryKey}`,
    },
    openGraph: {
      title: info.title,
      description: info.description,
      type: 'website',
      url: `https://kloop.vercel.app/${categoryKey}`,
      images: [
        {
          url: 'https://kloop.vercel.app/apple-touch-icon.png',
          width: 180,
          height: 180,
          alt: info.title,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: info.title,
      description: info.description,
      images: ['https://kloop.vercel.app/apple-touch-icon.png'],
    },
  };
}
