// Function to generate Schema JSON-LD
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Kloop Wallpapers',
    description: 'Discover and download premium high-quality wallpapers for iPhone, iPad, Android and desktop',
    url: 'https://kloop.vercel.app',
    image: 'https://kloop.vercel.app/apple-touch-icon.png',
    sameAs: [
      'https://twitter.com/wallpaperapp',
      'https://instagram.com/wallpaperapp',
    ],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://kloop.vercel.app/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Kloop - Premium Wallpapers',
    url: 'https://kloop.vercel.app',
    description: 'Premium wallpaper platform offering high-quality, curated backgrounds for all devices',
    image: 'https://kloop.vercel.app/apple-touch-icon.png',
    sameAs: [
      'https://twitter.com/wallpaperapp',
      'https://instagram.com/wallpaperapp',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      url: 'https://kloop.vercel.app',
    },
  };
}

export function generateBreadcrumbSchema(category: string, categoryName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://kloop.vercel.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: categoryName,
        item: `https://kloop.vercel.app/${category}`,
      },
    ],
  };
}

export function generateCollectionPageSchema(category: string, categoryName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `https://kloop.vercel.app/${category}#collecton`,
    name: `${categoryName} Wallpapers - Download Premium ${categoryName} Backgrounds`,
    description: `Discover and download premium ${categoryName} wallpapers. High-quality, carefully curated backgrounds optimized for all devices.`,
    url: `https://kloop.vercel.app/${category}`,
    image: 'https://kloop.vercel.app/apple-touch-icon.png',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Kloop Wallpapers',
      url: 'https://kloop.vercel.app',
    },
  };
}
