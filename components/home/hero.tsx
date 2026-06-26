import SlideText from "@/components/slide-text";

export default function Hero() {
  return (
    <section className="sticky top-0 h-screen w-full flex items-center justify-center text-center overflow-hidden">
      <video
        src="/home1.mp4"
        autoPlay
        muted
        loop
        playsInline
        poster="/about-main.png"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 57%, rgba(17,17,17,0.7) 0%, rgba(17,17,17,0.01) 100%)",
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-6 md:gap-8 px-4 max-w-2xl">
        <div className="flex flex-col gap-4 md:gap-6 text-center">
          <h1
            className="text-[#faf9f7] text-4xl sm:text-5xl md:text-[56px] leading-tight md:leading-[1.14] tracking-[-1.5px] md:tracking-[-2.24px]"
            style={{ fontFamily: "var(--font-antonio)" }}
          >
            Where Beauty Meets Elegance
          </h1>
          <p className="text-[#e7e4df] text-base md:text-2xl leading-7 md:leading-8 tracking-[-0.48px] font-medium">
            Experience refined beauty services crafted for confidence, elegance, and individuality.
          </p>
        </div>
        <a
          href="sms:+13476127994"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#9b6dff] hover:bg-[#8a5dee] text-white font-medium text-base rounded-full transition-colors group flex items-center justify-center"
          style={{ width: 153, height: 48, padding: "12px 28px" }}
        >
          <SlideText>Book Now</SlideText>
        </a>
      </div>
    </section>
  );
}
