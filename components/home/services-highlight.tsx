"use client";

import Link from "next/link";
import SlideText from "@/components/slide-text";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import { useState, useRef } from "react";

type HomeSlide = { _id?: string; title: string; desc: string; imageUrl: string; watermark: string; bg: string; btnColor: string };

const SPEED = 1100;

const FALLBACK: HomeSlide[] = [
  { title: "Make-up", desc: "Feel confident and radiant with makeup that enhances your beauty without overpowering it.", imageUrl: "/service-makeup.png", watermark: "Nude Makeup",      bg: "#d9caea", btnColor: "#d75ad4" },
  { title: "Nails",   desc: "From nude tones to modern nail art, discover styles tailored to your beauty.",            imageUrl: "/service-nails.png",  watermark: "Nude Almond",      bg: "#efc3d5", btnColor: "#9b6dff" },
  { title: "Hair",    desc: "Timeless hairstyles created with precision, care, and modern elegance.",                  imageUrl: "/service-hair.png",   watermark: "Butterfly Layers", bg: "#f3e7d9", btnColor: "#a7748f" },
];

export default function ServicesHighlight({ homeSlides }: { homeSlides?: HomeSlide[] | null }) {
  const [active, setActive] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const slides = homeSlides && homeSlides.length > 0 ? homeSlides : FALLBACK;

  const goTo = (index: number) => {
    swiperRef.current?.slideToLoop(index);
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        height: "100vh",
        backgroundColor: slides[active]?.bg ?? "#d9caea",
        transition: `background-color ${SPEED}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      }}
    >
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        speed={SPEED}
        loop
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        onSlideChange={(swiper) => setActive(swiper.realIndex)}
        className="w-full h-full"
      >
        {slides.map((s, i) => (
          <SwiperSlide key={s._id ?? i}>
            <div className="relative w-full h-full overflow-hidden">

              {/* ── MOBILE ── */}
              <div className="flex flex-col h-full md:hidden">
                <div className="relative overflow-hidden" style={{ flex: "0 0 55%" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.imageUrl || "/service-makeup.png"}
                    alt={s.title}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                </div>
                <div className="flex flex-col gap-4 px-4 py-8">
                  <div className="flex flex-col gap-3">
                    <h2
                      className="leading-none tracking-[-2px]"
                      style={{ fontFamily: "var(--font-antonio)", fontSize: 48, color: "#433459", fontWeight: 400 }}
                    >
                      {s.title}
                    </h2>
                    <p className="leading-7 font-light" style={{ fontSize: 18, letterSpacing: "-0.36px", color: "#5e5667" }}>
                      {s.desc}
                    </p>
                  </div>
                  <Link
                    href="/services"
                    className="self-start flex items-center justify-center text-white font-semibold rounded-full hover:opacity-85 group"
                    style={{ backgroundColor: s.btnColor, width: 160, height: 48, fontSize: 18, lineHeight: "24px" }}
                  >
                    <SlideText>Look Closely</SlideText>
                  </Link>
                </div>
              </div>

              {/* ── DESKTOP — Figma: 1440×800px pixel-perfect ── */}
              <div className="hidden md:block relative h-full">

                {/* Photo — absolute left-[calc(58.33%+2px)] top-[33px] w-[538px] */}
                <div
                  className="absolute overflow-hidden"
                  style={{ left: "calc(58.33% + 2px)", top: 33, width: 538, bottom: 0 }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.imageUrl || "/service-makeup.png"}
                    alt={s.title}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                </div>

                {/* Watermark — absolute left-[60px] top-[74.125%] (593/800) */}
                <div
                  className="absolute pointer-events-none select-none z-0"
                  style={{ left: 60, top: "74.125%" }}
                >
                  <span
                    className="whitespace-nowrap leading-none block"
                    style={{
                      fontFamily: "var(--font-antonio)",
                      fontSize: 160,
                      fontWeight: 400,
                      letterSpacing: "8px",
                      backgroundImage: `linear-gradient(to bottom, #433459 13.768%, ${s.bg} 100%)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      color: "transparent",
                      opacity: 0.64,
                    }}
                  >
                    {s.watermark}
                  </span>
                </div>

                {/* Content — absolute left-[60px] top-[calc(50%-70px)] -translate-y-1/2 w-[650px] */}
                <div
                  className="absolute flex flex-col z-10"
                  style={{
                    left: 60,
                    top: "calc(50% - 70px)",
                    transform: "translateY(-50%)",
                    width: 650,
                    gap: 24,
                  }}
                >
                  {/* Title + Desc group — gap-[16px] */}
                  <div className="flex flex-col w-full" style={{ gap: 16 }}>
                    <h2
                      className="w-full"
                      style={{
                        fontFamily: "var(--font-antonio)",
                        fontSize: 96,
                        lineHeight: 1,
                        letterSpacing: "-3.84px",
                        color: "#433459",
                        fontWeight: 400,
                      }}
                    >
                      {s.title}
                    </h2>
                    <p
                      className="w-full font-light"
                      style={{
                        fontSize: 32,
                        lineHeight: "40px",
                        letterSpacing: "-0.64px",
                        color: "#5e5667",
                        fontWeight: 300,
                      }}
                    >
                      {s.desc}
                    </p>
                  </div>

                  {/* Button — h-[56px] w-[188px] rounded-[999999px] */}
                  <Link
                    href="/services"
                    className="flex items-center justify-center text-white font-semibold hover:opacity-85 group shrink-0"
                    style={{
                      backgroundColor: s.btnColor,
                      width: 188,
                      height: 56,
                      borderRadius: 999999,
                      fontSize: 20,
                      lineHeight: "24px",
                    }}
                  >
                    <SlideText>Look Closely</SlideText>
                  </Link>
                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Dots — absolute bottom-[36px] (800-764=36px), gap-[8px], active:12px #433459, inactive:8px #f5f5f5 */}
      <div
        className="absolute left-1/2 -translate-x-1/2 z-20 flex items-center"
        style={{ bottom: 36, gap: 8 }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className="rounded-full shrink-0"
            style={{
              width:  i === active ? 12 : 8,
              height: i === active ? 12 : 8,
              backgroundColor: i === active ? "#433459" : "#f5f5f5",
              transition: "all 500ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
