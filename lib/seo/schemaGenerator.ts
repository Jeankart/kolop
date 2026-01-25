// Función para generar Schema JSON-LD
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Wallpaper',
    description: 'Descubre y descarga los mejores wallpapers para tu dispositivo',
    url: 'https://wallpaper.example.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://wallpaper.example.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Wallpaper App',
    url: 'https://wallpaper.example.com',
    description: 'La mejor aplicación para descargar wallpapers de alta calidad',
    image: 'https://wallpaper.example.com/og-image.jpg',
    sameAs: [
      'https://twitter.com/wallpaperapp',
      'https://instagram.com/wallpaperapp',
    ],
  };
}

export function generateCollectionPageSchema(category: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category} Wallpapers`,
    description: `Descarga wallpapers de ${category}. Fondos de pantalla de alta calidad.`,
    url: `https://wallpaper.example.com/${category.toLowerCase()}`,
  };
}

export function generateFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cómo descargar wallpapers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Selecciona una categoría, elige el wallpaper que te guste y haz clic en descargar.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Son gratis todos los wallpapers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, todos nuestros wallpapers son completamente gratis para descargar.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuál es la resolución de los wallpapers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nuestros wallpapers están disponibles en alta resolución, óptimos para cualquier dispositivo.',
        },
      },
    ],
  };
}
