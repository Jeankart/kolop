/**
 * Advanced Schema.org implementations for enhanced SEO
 * Includes: FAQ Page, Image Objects, Local Business, Aggregate Ratings
 */

export function generateFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Are the wallpapers free to download?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, all wallpapers on Kloop are completely free to download. No registration or payment required.',
        },
      },
      {
        '@type': 'Question',
        name: 'What file formats are supported?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We support JPG, PNG, and high-resolution formats optimized for all devices including iPhones, iPads, Android phones, and desktops.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use these wallpapers commercially?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'All wallpapers on Kloop are for personal use. For commercial use, please review our terms of service.',
        },
      },
      {
        '@type': 'Question',
        name: 'How often are new wallpapers added?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We continuously add new, curated wallpapers to our collection. Check back regularly for the latest additions.',
        },
      },
      {
        '@type': 'Question',
        name: 'What makes Kloop different from other wallpaper apps?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Kloop offers carefully curated, high-quality wallpapers with diverse categories including AI-generated, live, anime, and aesthetic backgrounds. All optimized for superior visual quality.',
        },
      },
    ],
  };
}

export function generateImageObjectSchema(
  imageUrl: string,
  imageName: string,
  description: string,
  datePublished: string = new Date().toISOString()
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    url: imageUrl,
    name: imageName,
    description: description,
    datePublished: datePublished,
    author: {
      '@type': 'Organization',
      name: 'Kloop Wallpapers',
    },
    license: 'https://creativecommons.org/licenses/by/4.0/',
  };
}

export function generateAggregateRatingSchema(
  ratingValue: number = 4.8,
  reviewCount: number = 1500,
  bestRating: number = 5,
  worstRating: number = 1
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: ratingValue,
    reviewCount: reviewCount,
    bestRating: bestRating,
    worstRating: worstRating,
  };
}

export function generateProductSchema(
  name: string,
  description: string,
  imageUrl: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: name,
    description: description,
    image: imageUrl,
    brand: {
      '@type': 'Brand',
      name: 'Kloop',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: generateAggregateRatingSchema(),
  };
}

export function generateAppSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Kloop - Premium Wallpapers',
    description: 'Premium wallpaper platform offering high-quality, curated backgrounds for all devices',
    applicationCategory: 'Multimedia',
    operatingSystem: 'iOS, Android, Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1500',
    },
  };
}

export function generateNewsArticleSchema(
  headline: string,
  description: string,
  imageUrl: string,
  datePublished: string = new Date().toISOString(),
  author: string = 'Kloop Team'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: headline,
    description: description,
    image: imageUrl,
    datePublished: datePublished,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Kloop',
      logo: {
        '@type': 'ImageObject',
        url: 'https://kloop.vercel.app/apple-touch-icon.png',
      },
    },
  };
}
