"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

const images = Array(8).fill("/gallery-1.png");

export default function GalleryPreview() {
  return (
    <section className="py-20 w-full">
      <h2
        className="text-[#433459] text-[40px] leading-12 tracking-[-0.8px] mb-8 px-15"
        style={{ fontFamily: "var(--font-antonio)" }}
      >
        Gallery Preview
      </h2>

      <Swiper
        modules={[FreeMode]}
        freeMode={{ enabled: true, momentum: true }}
        slidesPerView="auto"
        spaceBetween={20}
        grabCursor
        slidesOffsetBefore={60}
        slidesOffsetAfter={60}
        className="w-full overflow-visible!"
      >
        {images.map((src, i) => (
          <SwiperSlide key={i} style={{ width: 315, height: 473 }}>
            <div className="w-full h-full rounded-[20px] overflow-hidden group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Gallery ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
