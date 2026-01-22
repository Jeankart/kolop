'use client';

export default function HeroBanner() {
  return (
    <section className="relative w-full h-[calc(var(--spacing)*35)] md:h-[calc(var(--spacing)*50)] pt-16 px-4 md:px-6 headerButton">
      <div className="relative w-full h-full rounded-[10px] overflow-hidden bg-gradient-to-br from-zinc-900 to-black">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://videos.pexels.com/video-files/15283134/15283134-hd_1080_1920_30fps.mp4"
            type="video/mp4"
          />
        </video>

        {/* Overlay gradient para mejor contraste */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
            IOS 26 LIVE
          </h1>
        </div>
      </div>
    </section>
  );
}
