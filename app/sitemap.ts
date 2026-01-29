import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kloop.vercel.app';
  
  const categories = [
    { slug: 'ios', priority: 0.95 },
    { slug: 'live', priority: 0.9 },
    { slug: 'ai', priority: 0.9 },
    { slug: 'aesthetic', priority: 0.85 },
    { slug: 'anime', priority: 0.85 },
    { slug: 'bw', priority: 0.8 },
    { slug: 'cars', priority: 0.8 },
    { slug: 'widgets', priority: 0.75 },
    { slug: 'charging', priority: 0.75 },
    { slug: 'cute', priority: 0.8 },
    { slug: 'films', priority: 0.8 },
    { slug: 'urban', priority: 0.85 },
    { slug: 'featured', priority: 0.95 },
  ];

  // Páginas principales
  const mainPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/featured`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/settings`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  // Páginas de categorías con prioridades dinámicas
  const categoryPages = categories.map((cat) => ({
    url: `${baseUrl}/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: cat.priority,
  }));

  return [...mainPages, ...categoryPages];
}
