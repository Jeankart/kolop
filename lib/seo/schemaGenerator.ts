// Function to generate Schema JSON-LD
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Wallpaper',
    description: 'Discover and download the best wallpapers for your device',
    url: 'https://kloop.wallpapers.app',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://kloop.wallpapers.app/search?q={search_term_string}',
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
    url: 'https://kloop.wallpapers.app',
    description: 'The best app to download high-quality wallpapers',
    image: 'https://kloop.wallpapers.app/og-image.jpg',
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
    description: `Download ${category} wallpapers. High-quality backgrounds for your device.`,
    url: `https://kloop.wallpapers.app/${category.toLowerCase()}`,
  };
}

export function generateFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How to download wallpapers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Select a category, choose the wallpaper you like and click download.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are all wallpapers free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, all our wallpapers are completely free to download.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the resolution of the wallpapers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our wallpapers are available in high resolution, optimized for any device.',
        },
      },
    ],
  };
}
