import CategoryGallery from '@/app/components/CategoryGallery';

const wallpapers = [
  { id: 1, name: 'wall1.gif' },
  { id: 2, name: 'wall2.gif' },
  { id: 3, name: 'wall3.gif' },
  { id: 4, name: 'wall4.gif' },
  { id: 5, name: 'wall5.gif' },
  { id: 6, name: 'wall6.gif' },
];

export default function ChargingPage() {
  return <CategoryGallery title="Charging" folder="wallCharging" wallpapers={wallpapers} />;
}
