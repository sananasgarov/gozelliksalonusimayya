"use client";

import { useRef, useEffect } from "react";
import BookNowButton from "@/components/book-now-button";

type HeroData = {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonUrl: string;
  videoUrl: string;
  posterUrl?: string;
};

const DEFAULTS: HeroData = {
  title: "Where Beauty Meets Elegance",
  subtitle: "Experience refined beauty services crafted for confidence, elegance, and individuality.",
  buttonText: "Book Now",
  buttonUrl: "sms:+13476127994",
  videoUrl: process.env.NEXT_PUBLIC_HERO_VIDEO_URL ?? "/home1.mp4",
  posterUrl: "/about-main.png",
};

export default function Hero({ data }: { data?: HeroData | null }) {
  const d = {
    ...DEFAULTS,
    ...data,
    videoUrl: process.env.NEXT_PUBLIC_HERO_VIDEO_URL ?? data?.videoUrl ?? DEFAULTS.videoUrl,
  };
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;

    const onCanPlay = () => {
      window.dispatchEvent(new Event("heroVideoReady"));
    };
    v.addEventListener("canplay", onCanPlay, { once: true });
    v.play().catch(() => {});

    return () => v.removeEventListener("canplay", onCanPlay);
  }, []);

  return (
    <section className="sticky top-0 h-screen w-full flex items-center justify-center text-center overflow-hidden">
      <video
        ref={videoRef}
        src={d.videoUrl}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={d.posterUrl || "/about-main.png"}
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
            {d.title}
          </h1>
          <p className="text-[#e7e4df] text-base md:text-2xl leading-7 md:leading-8 tracking-[-0.48px] font-medium">
            {d.subtitle}
          </p>
        </div>
        <BookNowButton
          className="bg-[#9b6dff] hover:bg-[#8a5dee] text-white font-medium text-[20px] leading-6 rounded-full transition-colors group flex items-center justify-center"
          style={{ width: 153, height: 48 }}
        >
          {d.buttonText}
        </BookNowButton>
      </div>
    </section>
  );
}
