import { Metadata } from 'next';
import HeroBanner from './components/HeroBanner';
import CategoriesCarousel from './components/CategoriesCarousel';
import FeaturedCarousel from './components/FeaturedCarousel';
import HomeCategoryCarousel from './components/HomeCategoryCarousel';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Download Premium Wallpapers - Free 4K & 8K Backgrounds',
  description: 'Discover the latest and most popular phone wallpapers, updated daily with new designs. Download free high-quality 4K & 8K wallpapers for iOS, Android, and desktop. Categories: Anime, Aesthetic, Cars, Gaming, Abstract, Widgets, Charging and more. All premium wallpapers without watermarks.',
  keywords: 'wallpapers, backgrounds, 4K, 8K, free download, iOS, Android, premium, aesthetic, anime, cars, gaming, abstract, daily updates',
  openGraph: {
    title: 'Download Premium Wallpapers - Free 4K & 8K Backgrounds',
    description: 'The best high-quality wallpapers updated daily. Download stunning 4K & 8K backgrounds for your device.',
    type: 'website',
    url: 'https://kloop.vercel.app',
    images: [
      {
        url: 'https://kloop.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

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

      {/* Anime Carousel */}
      <HomeCategoryCarousel
        category="Anime"
        title="Anime"
        emoji="⛩️"
        folder="wallAnime"
        moreLink="/anime"
      />

      {/* Aesthetic Carousel */}
      <HomeCategoryCarousel
        category="Aesthetic"
        title="Aesthetic"
        emoji="🎨"
        folder="wallAesthetic"
        moreLink="/aesthetic"
      />

      {/* Widgets Carousel */}
      <HomeCategoryCarousel
        category="Widgets"
        title="Widgets"
        emoji="🎚️"
        folder="wallWidgets"
        moreLink="/widgets"
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

      {/* AI Carousel */}
      <HomeCategoryCarousel
        category="AI"
        title="AI"
        emoji="🤖"
        folder="wallAI"
        moreLink="/ai"
      />

      {/* IOS Carousel */}
      <HomeCategoryCarousel
        category="IOS"
        title="IOS"
        emoji="🍎"
        folder="wallUploads"
        moreLink="/ios"
      />

      {/* iOS 26 Live Special Section */}
      <section className="px-4 md:px-6 py-12 max-w-7xl mx-auto homeiOS26Section">
        <div className="homeios26CardWrapper">
          <Link href="/ios">
            <div className="homeios26Card relative w-full h-72 md:h-80 rounded-xl overflow-hidden group cursor-pointer">
              {/* Background gradient */}
              <div className="homeios26CardBg absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900" />

              {/* Video overlay */}
              <video
                autoPlay
                muted
                loop
                playsInline
                controls={false}
                preload="auto"
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
                <p className="homeios26CardDesc text-lg md:text-xl text-zinc-300 drop-shadow-lg">
                  Exclusive collection of dynamic wallpapers
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

      {/* Updated Daily Section - SEO & Trust Building */}
      <section className="px-4 md:px-6 py-12 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-xl p-8 md:p-12 border border-zinc-700">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl">📅</span>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Updated Daily with New Designs
              </h2>
              <p className="text-zinc-300 text-lg">
                We add fresh, high-quality wallpapers every day to keep your device looking stunning. All 4K & 8K backgrounds available for free download.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚡</span>
              <div>
                <h3 className="font-bold text-white mb-1">Fast Downloads</h3>
                <p className="text-sm text-zinc-400">High-speed downloads with no watermarks</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎨</span>
              <div>
                <h3 className="font-bold text-white mb-1">Multiple Categories</h3>
                <p className="text-sm text-zinc-400">Anime, Aesthetic, Gaming, Cars, and more</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">📱</span>
              <div>
                <h3 className="font-bold text-white mb-1">All Devices</h3>
                <p className="text-sm text-zinc-400">Perfect for iOS, Android, and desktop</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

