'use client';

import { useWallpapersByCategory } from '@/lib/hooks/useWallpapers';
import CategoryCarousel from './CategoryCarousel';

interface HomeCategoryCarouselProps {
  category: string;
  title: string;
  emoji: string;
  folder: string;
  moreLink: string;
}

export default function HomeCategoryCarousel({
  category,
  title,
  emoji,
  folder,
  moreLink,
}: HomeCategoryCarouselProps) {
  const { wallpapers, loading } = useWallpapersByCategory(category);

  if (loading || wallpapers.length === 0) {
    return null;
  }

  return (
    <CategoryCarousel
      title={title}
      emoji={emoji}
      wallpapers={wallpapers}
      folder={folder}
      moreLink={moreLink}
    />
  );
}
