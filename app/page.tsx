import HeroBanner from './components/HeroBanner';
import CategoriesCarousel from './components/CategoriesCarousel';
import FeaturedCarousel from './components/FeaturedCarousel';
import HomeCategoryCarousel from './components/HomeCategoryCarousel';
import Link from 'next/link';

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

      {/* iOS 26 Live Special Section */}
      <section className="px-4 md:px-6 py-12 max-w-7xl mx-auto homeiOS26Section">
        <div className="homeios26CardWrapper">
          <Link href="/ios26">
            <div className="homeios26Card relative w-full h-96 md:h-[500px] rounded-xl overflow-hidden group cursor-pointer">
              {/* Background gradient */}
              <div className="homeios26CardBg absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900" />

              {/* Video overlay */}
              <video
                autoPlay
                muted
                loop
                playsInline
                className="homeios26CardVideo absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-300"
              >
                <source
                  src="https://videos.pexels.com/video-files/15283134/15283134-hd_1080_1920_30fps.mp4"
                  type="video/mp4"
                />
              </video>

              {/* Content overlay */}
              <div className="homeios26CardOverlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Text content */}
              <div className="homeios26CardContent absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <h2 className="homeios26CardTitle text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                  iOS 26 Live
                </h2>
                <p className="homeios26CardDesc text-lg md:text-xl text-cyan-200 drop-shadow-lg">
                  Colección exclusiva de fondos dinámicos
                </p>
                <div className="homeios26CardArrow mt-6 text-3xl group-hover:translate-y-2 transition-transform duration-300">
                  ↓
                </div>
              </div>

              {/* Hover effect border */}
              <div className="homeios26CardBorder absolute inset-0 border-2 border-cyan-500/0 group-hover:border-cyan-500/50 rounded-xl transition-all duration-300" />
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}

