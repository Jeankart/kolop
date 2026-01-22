import CategoryGallery from '@/app/components/CategoryGallery';

const wallpapers = [
  { id: 1, name: 'wall1.gif' },
  { id: 2, name: 'wall2.gif' },
  { id: 3, name: 'wall3.gif' },
];

export default function CarsPage() {
  return <CategoryGallery title="Cars" folder="wallCars" wallpapers={wallpapers} />;
}
