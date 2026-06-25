import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden">
      <video
        src="/home1.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 57%, rgba(17,17,17,0.7) 0%, rgba(17,17,17,0.01) 100%)",
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-8 px-4 max-w-2xl">
        <div className="flex flex-col gap-6 text-center">
          <h1
            className="text-[#faf9f7] text-5xl md:text-[56px] leading-[1.14] tracking-[-2.24px]"
            style={{ fontFamily: "var(--font-antonio)" }}
          >
            Where Beauty Meets Elegance
          </h1>
          <p className="text-[#e7e4df] text-xl md:text-2xl leading-8 tracking-[-0.48px] font-medium">
            Experience refined beauty services crafted for confidence, elegance, and individuality.
          </p>
        </div>
        <Link
          href="/booking"
          className="bg-[#9b6dff] hover:bg-[#8a5dee] text-white font-medium text-base px-6 py-3 rounded-full transition-colors"
        >
          Book Now
        </Link>
      </div>
    </section>
  );
}
