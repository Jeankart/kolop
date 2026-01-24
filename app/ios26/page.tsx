import Header from '@/app/components/Header';
import BottomNavigation from '@/app/components/BottomNavigation';

export default function iOS26LivePage() {
  return (
    <main className="bg-zinc-950 min-h-screen overflow-x-hidden">
      <Header />
      <section className="px-4 md:px-6 py-8 max-w-7xl mx-auto ios26MainSection">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 ios26Title">
          iOS 26 Live
        </h1>
        <p className="text-zinc-400 mb-8 ios26Subtitle">
          Colección exclusiva de fondos de pantalla dinámicos
        </p>

        {/* Asymmetric Grid */}
        <div className="ios26AsymmetricGrid grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]">
          {/* Large item 1 - Top left */}
          <div className="ios26GridItem col-span-2 md:col-span-2 md:row-span-2 rounded-lg overflow-hidden bg-gradient-to-br from-zinc-800 to-black hover:shadow-lg transition-shadow">
            <img
              src="/wallLive/img-1.jpg"
              alt="iOS 26 Live 1"
              className="ios26GridImage w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Small items - Top right */}
          <div className="ios26GridItem rounded-lg overflow-hidden bg-gradient-to-br from-zinc-800 to-black hover:shadow-lg transition-shadow">
            <img
              src="/wallLive/img-2.jpg"
              alt="iOS 26 Live 2"
              className="ios26GridImage w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="ios26GridItem rounded-lg overflow-hidden bg-gradient-to-br from-zinc-800 to-black hover:shadow-lg transition-shadow">
            <img
              src="/wallLive/img-3.jpg"
              alt="iOS 26 Live 3"
              className="ios26GridImage w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Small items - Middle right */}
          <div className="ios26GridItem rounded-lg overflow-hidden bg-gradient-to-br from-zinc-800 to-black hover:shadow-lg transition-shadow">
            <img
              src="/wallLive/img-4.jpg"
              alt="iOS 26 Live 4"
              className="ios26GridImage w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="ios26GridItem rounded-lg overflow-hidden bg-gradient-to-br from-zinc-800 to-black hover:shadow-lg transition-shadow">
            <img
              src="/wallLive/img-5.jpg"
              alt="iOS 26 Live 5"
              className="ios26GridImage w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Large item 2 - Bottom left */}
          <div className="ios26GridItem col-span-2 md:col-span-2 md:row-span-2 rounded-lg overflow-hidden bg-gradient-to-br from-zinc-800 to-black hover:shadow-lg transition-shadow">
            <img
              src="/wallLive/img-6.jpg"
              alt="iOS 26 Live 6"
              className="ios26GridImage w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Small items - Bottom right */}
          <div className="ios26GridItem rounded-lg overflow-hidden bg-gradient-to-br from-zinc-800 to-black hover:shadow-lg transition-shadow">
            <img
              src="/wallLive/img-7.jpg"
              alt="iOS 26 Live 7"
              className="ios26GridImage w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="ios26GridItem rounded-lg overflow-hidden bg-gradient-to-br from-zinc-800 to-black hover:shadow-lg transition-shadow">
            <img
              src="/wallLive/img-8.jpg"
              alt="iOS 26 Live 8"
              className="ios26GridImage w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Medium item - Bottom middle */}
          <div className="ios26GridItem col-span-2 rounded-lg overflow-hidden bg-gradient-to-br from-zinc-800 to-black hover:shadow-lg transition-shadow">
            <img
              src="/wallLive/img-9.jpg"
              alt="iOS 26 Live 9"
              className="ios26GridImage w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Last small item */}
          <div className="ios26GridItem col-span-2 md:col-span-2 rounded-lg overflow-hidden bg-gradient-to-br from-zinc-800 to-black hover:shadow-lg transition-shadow">
            <img
              src="/wallLive/img-10.jpg"
              alt="iOS 26 Live 10"
              className="ios26GridImage w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      <BottomNavigation />
    </main>
  );
}
