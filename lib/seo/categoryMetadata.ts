import { Metadata } from 'next';

export const categoryMetadata: Record<string, { title: string; description: string }> = {
  ios: {
    title: 'Wallpapers iOS - Fondos para iPhone y iPad',
    description: 'Descarga wallpapers diseñados especialmente para iOS. Fondos de pantalla de alta calidad para iPhone, iPad y dispositivos Apple.',
  },
  live: {
    title: 'Live Wallpapers - Fondos Animados',
    description: 'Descarga wallpapers animados para tu dispositivo. Fondos dinámicos y en movimiento para una experiencia visual única.',
  },
  ai: {
    title: 'AI Wallpapers - Fondos Generados por IA',
    description: 'Descubre wallpapers generados con Inteligencia Artificial. Diseños únicos y personalizados creados automáticamente.',
  },
  aesthetic: {
    title: 'Aesthetic Wallpapers - Fondos Estéticos',
    description: 'Descarga wallpapers con diseño estético. Fondos minimalist y elegantes para tu dispositivo.',
  },
  anime: {
    title: 'Anime Wallpapers - Fondos de Anime',
    description: 'Los mejores wallpapers de anime. Fondos de pantalla con personajes y escenas de tus series favoritas.',
  },
  bw: {
    title: 'Blanco y Negro Wallpapers - Fondos BW',
    description: 'Wallpapers en blanco y negro. Fondos clásicos y elegantes para tu dispositivo.',
  },
  cars: {
    title: 'Cars Wallpapers - Fondos de Autos',
    description: 'Descarga wallpapers de autos. Fondos de pantalla con coches deportivos y vehículos impresionantes.',
  },
  cats: {
    title: 'Cats Wallpapers - Fondos de Gatos',
    description: 'Wallpapers con gatos. Fondos adorables y tiernos con felinos para tu dispositivo.',
  },
  charging: {
    title: 'Charging Wallpapers - Fondos de Carga',
    description: 'Wallpapers con temática de carga. Fondos divertidos y atractivos para tu dispositivo.',
  },
  cute: {
    title: 'Cute Wallpapers - Fondos Adorables',
    description: 'Descarga wallpapers lindos y adorables. Fondos de pantalla tiernos y coloridos.',
  },
  films: {
    title: 'Films Wallpapers - Fondos de Películas',
    description: 'Wallpapers de películas. Fondos de pantalla con escenas y personajes de cine.',
  },
  urban: {
    title: 'Urban Wallpapers - Fondos Urbanos',
    description: 'Fondos urbanos y modernos. Wallpapers con tema de ciudad y arquitectura contemporánea.',
  },
  featured: {
    title: 'Featured Wallpapers - Fondos Destacados',
    description: 'Descubre nuestros wallpapers más destacados y populares. Los mejores fondos de pantalla seleccionados.',
  },
};

export function getCategoryMetadata(category: string): Metadata {
  const categoryKey = category.toLowerCase();
  const info = categoryMetadata[categoryKey] || {
    title: `${category} Wallpapers`,
    description: `Descarga wallpapers de ${category}. Fondos de pantalla de alta calidad.`,
  };

  return {
    title: info.title,
    description: info.description,
    keywords: `wallpaper ${category}, fondos ${category}, descargar`,
    openGraph: {
      title: info.title,
      description: info.description,
      type: 'website',
      url: `https://wallpaper.example.com/${categoryKey}`,
    },
  };
}
