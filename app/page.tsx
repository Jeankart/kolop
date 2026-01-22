import HeroBanner from './components/HeroBanner';
import CategoriesCarousel from './components/CategoriesCarousel';
import FeaturedCarousel from './components/FeaturedCarousel';
import CategoryCarousel from './components/CategoryCarousel';

export default function Home() {
  const chargingWallpapers = [
    { id: 1, name: 'wall1.gif' },
    { id: 2, name: 'wall2.gif' },
    { id: 3, name: 'wall3.gif' },
    { id: 4, name: 'wall4.gif' },
    { id: 5, name: 'wall5.gif' },
    { id: 6, name: 'wall6.gif' },
  ];

  const aiWallpapers = [
    { id: 1, name: 'wall1.gif' },
    { id: 2, name: 'wall2.gif' },
    { id: 3, name: 'wall3.gif' },
    { id: 4, name: 'wall4.gif' },
    { id: 5, name: 'wall5.gif' },
  ];

  const aestheticWallpapers = [
    { id: 1, name: 'wall1.gif' },
    { id: 2, name: 'wall2.gif' },
    { id: 3, name: 'wall3.gif' },
    { id: 4, name: 'wall4.gif' },
    { id: 5, name: 'wall5.gif' },
  ];

  const catsWallpapers = [
    { id: 1, name: 'wall1.gif' },
    { id: 2, name: 'wall2.gif' },
    { id: 3, name: 'wall3.gif' },
  ];

  const carsWallpapers = [
    { id: 1, name: 'wall1.gif' },
    { id: 2, name: 'wall2.gif' },
    { id: 3, name: 'wall3.gif' },
  ];

  const bwWallpapers = [
    { id: 1, name: 'wall1.gif' },
    { id: 2, name: 'wall2.gif' },
    { id: 3, name: 'wall3.gif' },
  ];

  const urbanWallpapers = [
    { id: 1, name: 'wall1.gif' },
    { id: 2, name: 'wall2.gif' },
    { id: 3, name: 'wall3.gif' },
  ];

  const filmsWallpapers = [
    { id: 1, name: 'wall1.gif' },
    { id: 2, name: 'wall2.gif' },
    { id: 3, name: 'wall3.gif' },
  ];

  const cuteWallpapers = [
    { id: 1, name: 'wall1.gif' },
    { id: 2, name: 'wall2.gif' },
    { id: 3, name: 'wall3.gif' },
  ];

  const animeWallpapers = [
    { id: 1, name: 'wall1.gif' },
    { id: 2, name: 'wall2.gif' },
    { id: 3, name: 'wall3.gif' },
  ];

  return (
    <main className="min-h-screen bg-[#151515] dark:bg-[#151515]">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Categories Carousel */}
      <CategoriesCarousel />

      {/* Featured Carousel */}
      <FeaturedCarousel />

      {/* Charging Carousel */}
      <CategoryCarousel
        title="Charging"
        emoji="🔌"
        wallpapers={chargingWallpapers}
        folder="wallCharging"
        moreLink="/charging"
      />

      {/* AI Carousel */}
      <CategoryCarousel
        title="AI"
        emoji="🤖"
        wallpapers={aiWallpapers}
        folder="wallAI"
        moreLink="/ai"
      />

      {/* Aesthetic Carousel */}
      <CategoryCarousel
        title="Aesthetic"
        emoji="🎨"
        wallpapers={aestheticWallpapers}
        folder="wallAesthetic"
        moreLink="/aesthetic"
      />

      {/* Cats Carousel */}
      <CategoryCarousel
        title="Cats"
        emoji="🐱"
        wallpapers={catsWallpapers}
        folder="wallCats"
        moreLink="/cats"
      />

      {/* Cars Carousel */}
      <CategoryCarousel
        title="Cars"
        emoji="🏎️"
        wallpapers={carsWallpapers}
        folder="wallCars"
        moreLink="/cars"
      />

      {/* B&W Carousel */}
      <CategoryCarousel
        title="B&W"
        emoji="⚫"
        wallpapers={bwWallpapers}
        folder="wallB&W"
        moreLink="/bw"
      />

      {/* Urban Carousel */}
      <CategoryCarousel
        title="Urban"
        emoji="🏙️"
        wallpapers={urbanWallpapers}
        folder="wallUrban"
        moreLink="/urban"
      />

      {/* Films Carousel */}
      <CategoryCarousel
        title="Films"
        emoji="🎬"
        wallpapers={filmsWallpapers}
        folder="wallFilms"
        moreLink="/films"
      />

      {/* Cute Carousel */}
      <CategoryCarousel
        title="Cute"
        emoji="🌸"
        wallpapers={cuteWallpapers}
        folder="wallCute"
        moreLink="/cute"
      />

      {/* Anime Carousel */}
      <CategoryCarousel
        title="Anime"
        emoji="⛩️"
        wallpapers={animeWallpapers}
        folder="wallAnime"
        moreLink="/anime"
      />
    </main>
  );
}
