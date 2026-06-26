"use client";

import Link from "next/link";
import SlideText from "@/components/slide-text";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import { useState, useRef } from "react";

const imgMakeup = "/service-makeup.png";
const imgNail = "/service-nails.png";
const imgHair = "/service-hair.png";

const SPEED = 1100;

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

  const goTo = (index: number) => {
    swiperRef.current?.slideToLoop(index);
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: slides[active].bg,
        minHeight: "100vh",
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
        style={{ minHeight: "100vh" }}
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <div className="relative flex flex-col md:flex-row items-stretch w-full" style={{ minHeight: "100vh" }}>
              {/* Content */}
              <div className="flex flex-col gap-4 md:gap-6 px-4 md:px-15 pt-10 md:pt-50 pb-10 md:pb-16 z-10 w-full md:w-3/5 justify-start">
                <h2
                  className="text-[#433459] text-[56px] md:text-[96px] leading-none tracking-[-2px] md:tracking-[-3.84px]"
                  style={{ fontFamily: "var(--font-antonio)" }}
                  data-aos="fade-up"
                >
                  {s.title}
                </h2>
                <p
                  className="text-[#5e5667] text-lg md:text-3xl leading-7 md:leading-10 tracking-[-0.64px] font-light max-w-2lg"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  {s.desc}
                </p>
                <Link
                  href="/services"
                  className="self-start text-white font-semibold text-base px-6 py-3.5 rounded-full hover:opacity-85 group"
                  style={{ backgroundColor: s.btnColor }}
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <SlideText>Look Closely</SlideText>
                </Link>
              </div>

              {/* Image */}
              <div className="relative overflow-hidden shrink-0 self-stretch md:mt-10 md:mr-15 min-h-100" style={{ width: 538 }}>
                <img
                  src={s.image}
                  alt={s.title}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  style={{ willChange: "opacity" }}
                />
              </div>

              {/* Watermark — inside slide so it fades with the slide */}
              <div className="absolute bottom-14 left-0 right-0 flex justify-start px-15 pointer-events-none overflow-hidden z-0">
                <span
                  className="font-bold text-[160px] whitespace-nowrap select-none tracking-[8px] leading-none"
                  style={{
                    fontFamily: "var(--font-antonio)",
                    backgroundImage: `linear-gradient(to bottom, #433459 14%, ${s.bg} 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    opacity: 0.64,
                  }}
                >
                  {s.watermark}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className="rounded-full"
            style={{
              width: i === active ? 13 : 8,
              height: i === active ? 13 : 8,
              backgroundColor: i === active ? "#433459" : "rgba(255,255,255,0.85)",
              boxShadow: i === active ? "0 2px 8px rgba(67,52,89,0.3)" : "none",
              transition: "all 500ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
