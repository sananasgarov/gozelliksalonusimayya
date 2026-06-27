"use client";

import Link from "next/link";
import SlideText from "@/components/slide-text";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import { useState, useRef, useEffect } from "react";

type HomeSlide = { _id?: string; title: string; desc: string; imageUrl: string; watermark: string; bg: string; btnColor: string };

const SPEED = 1100;

const FALLBACK: HomeSlide[] = [
  { title: "Make-up", desc: "Feel confident and radiant with makeup that enhances your beauty without overpowering it.", imageUrl: "/service-makeup.png", watermark: "Nude Makeup",      bg: "#d9caea", btnColor: "#d75ad4" },
  { title: "Nails",   desc: "From nude tones to modern nail art, discover styles tailored to your beauty.",            imageUrl: "/service-nails.png",  watermark: "Nude Almond",      bg: "#efc3d5", btnColor: "#9b6dff" },
  { title: "Hair",    desc: "Timeless hairstyles created with precision, care, and modern elegance.",                  imageUrl: "/service-hair.png",   watermark: "Butterfly Layers", bg: "#f3e7d9", btnColor: "#a7748f" },
];

export default function ServicesHighlight({ homeSlides }: { homeSlides?: HomeSlide[] | null }) {
  const [active, setActive] = useState(0);
  const [dotsVisible, setDotsVisible] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const slides = homeSlides && homeSlides.length > 0 ? homeSlides : FALLBACK;

  const goTo = (index: number) => {
    swiperRef.current?.slideToLoop(index);
  };

  useEffect(() => {
    function check() {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // Show dots only while this section occupies the viewport
      setDotsVisible(rect.top <= 10 && rect.bottom >= window.innerHeight * 0.5);
    }
    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden"
        style={{
          backgroundColor: slides[active]?.bg ?? "#d9caea",
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
            <SwiperSlide key={s._id ?? i}>
              <div className="relative flex flex-col md:flex-row items-stretch w-full" style={{ minHeight: "100vh" }}>
                {/* Content */}
                <div className="flex flex-col gap-4 md:gap-6 px-4 md:px-15 pt-10 md:pt-50 pb-10 md:pb-82.25 z-10 w-full md:w-3/5">
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
                    className="self-start flex items-center justify-center text-white font-semibold text-[20px] leading-6 rounded-full hover:opacity-85 group"
                    style={{ backgroundColor: s.btnColor, width: 188, height: 56 }}
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <SlideText>Look Closely</SlideText>
                  </Link>
                </div>

                {/* Image */}
                <div className="relative overflow-hidden shrink-0 self-stretch md:mt-10 md:mr-15 min-h-100" style={{ width: 538 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.imageUrl || "/service-makeup.png"}
                    alt={s.title}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    style={{ willChange: "opacity" }}
                  />
                </div>

                {/* Watermark */}
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
      </section>

      {/* Dots — position:fixed, outside every stacking context */}
      <div
        className="fixed left-1/2 -translate-x-1/2 flex items-center gap-3 transition-opacity duration-300"
        style={{
          bottom: 24,
          zIndex: 9999,
          opacity: dotsVisible ? 1 : 0,
          pointerEvents: dotsVisible ? "auto" : "none",
        }}
      >
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
    </>
  );
}
