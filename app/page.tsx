import HeroBanner from './components/HeroBanner';
import CategoriesCarousel from './components/CategoriesCarousel';
import FeaturedCarousel from './components/FeaturedCarousel';
import HomeCategoryCarousel from './components/HomeCategoryCarousel';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#151515] dark:bg-[#151515]">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Categories Carousel */}
      <CategoriesCarousel />

      {/* Featured Carousel */}
      <FeaturedCarousel />

      {/* Charging Carousel */}
      <HomeCategoryCarousel
        category="Charging"
        title="Charging"
        emoji="🔌"
        folder="wallCharging"
        moreLink="/charging"
      />

      {/* AI Carousel */}
      <HomeCategoryCarousel
        category="AI"
        title="AI"
        emoji="🤖"
        folder="wallAI"
        moreLink="/ai"
      />

      {/* Aesthetic Carousel */}
      <HomeCategoryCarousel
        category="Aesthetic"
        title="Aesthetic"
        emoji="🎨"
        folder="wallAesthetic"
        moreLink="/aesthetic"
      />

      {/* Cats Carousel */}
      <HomeCategoryCarousel
        category="Cats"
        title="Cats"
        emoji="🐱"
        folder="wallCats"
        moreLink="/cats"
      />

      {/* Cars Carousel */}
      <HomeCategoryCarousel
        category="Cars"
        title="Cars"
        emoji="🏎️"
        folder="wallCars"
        moreLink="/cars"
      />

      {/* B&W Carousel */}
      <HomeCategoryCarousel
        category="B&W"
        title="B&W"
        emoji="⚫"
        folder="wallB&W"
        moreLink="/bw"
      />

      {/* Urban Carousel */}
      <HomeCategoryCarousel
        category="Urban"
        title="Urban"
        emoji="🏙️"
        folder="wallUrban"
        moreLink="/urban"
      />

      {/* Films Carousel */}
      <HomeCategoryCarousel
        category="Films"
        title="Films"
        emoji="🎬"
        folder="wallFilms"
        moreLink="/films"
      />

      {/* Cute Carousel */}
      <HomeCategoryCarousel
        category="Cute"
        title="Cute"
        emoji="🌸"
        folder="wallCute"
        moreLink="/cute"
      />

      {/* Anime Carousel */}
      <HomeCategoryCarousel
        category="Anime"
        title="Anime"
        emoji="⛩️"
        folder="wallAnime"
        moreLink="/anime"
      />
    </main>
  );
}

