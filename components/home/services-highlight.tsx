"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import { useState, useRef } from "react";

const imgMakeup = "/service-makeup.png";
const imgNail = "/service-nails.png";
const imgHair = "/service-hair.png";

const slides = [
  {
    bg: "#d9caea",
    title: "Make-up",
    desc: "Feel confident and radiant with makeup that enhances your beauty without overpowering it.",
    btnColor: "#d75ad4",
    watermark: "Nude Makeup",
    image: imgMakeup,
  },
  {
    bg: "#efc3d5",
    title: "Nails",
    desc: "From nude tones to modern nail art, discover styles tailored to your beauty.",
    btnColor: "#9b6dff",
    watermark: "Nude Almond",
    image: imgNail,
  },
  {
    bg: "#f3e7d9",
    title: "Hair",
    desc: "Timeless hairstyles created with precision, care, and modern elegance.",
    btnColor: "#a7748f",
    watermark: "Butterfly Layers",
    image: imgHair,
  },
];

export default function ServicesHighlight() {
  const [active, setActive] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const slide = slides[active];

  const goTo = (index: number) => {
    swiperRef.current?.slideToLoop(index);
  };

  return (
    <section
      className="relative w-full overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: slide.bg, minHeight: 700 }}
    >
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        speed={800}
        loop
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        onSlideChange={(swiper) => setActive(swiper.realIndex)}
        className="w-full h-full"
        style={{ minHeight: 700 }}
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <div className="flex flex-col md:flex-row items-stretch w-full" style={{ minHeight: 700 }}>
              <div className="flex flex-col gap-6 px-15 py-16 z-10 md:w-1/2 justify-center">
                <h2
                  className="text-[#433459] text-[96px] leading-none tracking-[-3.84px]"
                  style={{ fontFamily: "var(--font-antonio)" }}
                >
                  {s.title}
                </h2>
                <p className="text-[#5e5667] text-3xl leading-10 tracking-[-0.64px] font-light max-w-sm">
                  {s.desc}
                </p>
                <Link
                  href="/services"
                  className="self-start text-white font-semibold text-base px-6 py-3.5 rounded-full transition-colors hover:opacity-85"
                  style={{ backgroundColor: s.btnColor }}
                >
                  Look Closely
                </Link>
              </div>

              <div className="md:w-1/2 self-stretch relative overflow-hidden" style={{ minHeight: 700 }}>
                <img
                  src={s.image}
                  alt={s.title}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute bottom-14 left-0 right-0 flex justify-start px-15 pointer-events-none overflow-hidden z-0">
        <span
          className="font-bold text-[160px] whitespace-nowrap select-none tracking-[8px] leading-none"
          style={{
            fontFamily: "var(--font-antonio)",
            backgroundImage: `linear-gradient(to bottom, #433459 14%, ${slide.bg} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            opacity: 0.64,
          }}
        >
          {slide.watermark}
        </span>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className="rounded-full transition-all duration-400"
            style={{
              width: i === active ? 13 : 8,
              height: i === active ? 13 : 8,
              backgroundColor: i === active ? "#433459" : "rgba(255,255,255,0.85)",
              boxShadow: i === active ? "0 2px 8px rgba(67,52,89,0.3)" : "none",
            }}
          />
        ))}
      </div>
    </section>
  );
}
