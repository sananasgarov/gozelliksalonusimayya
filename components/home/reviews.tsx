"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

const imgAvatar = "/avatar.png";

const reviews = [
  {
    name: "Emma Jonshon",
    stars: 5,
    text: "Lorem ipsum dolor sit amet, cute future consectetur adipiscing elit. Cras et nunc non ante fringilla accumsan. Vestibulum consectetur dui porta at lost.",
  },
  {
    name: "Emma Jonshon",
    stars: 5,
    text: "Lorem ipsum dolor sit amet, cute future consectetur adipiscing elit. Cras et nunc non ante fringilla accumsan. Vestibulum consectetur dui porta at lost.",
  },
  {
    name: "Emma Jonshon",
    stars: 5,
    text: "Lorem ipsum dolor sit amet, cute future consectetur adipiscing elit. Cras et nunc non ante fringilla accumsan. Vestibulum consectetur dui porta at lost.",
  },
  {
    name: "Emma Jonshon",
    stars: 5,
    text: "Lorem ipsum dolor sit amet, cute future consectetur adipiscing elit. Cras et nunc non ante fringilla accumsan. Vestibulum consectetur dui porta at lost.",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="py-20 w-full">
      <h2
        className="text-[#433459] text-[40px] leading-12 tracking-[-0.8px] mb-8 px-15"
        style={{ fontFamily: "var(--font-antonio)" }}
      >
        Customer Reviews
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
        {reviews.map((r, i) => (
          <SwiperSlide key={i} style={{ width: 427 }}>
            <div className="border border-[#3f3450]/50 rounded-[20px] p-6 flex flex-col gap-3 hover:bg-[#f0ecf8] transition-colors h-full">
              <div className="flex gap-4 items-center">
                <div className="size-20 rounded-full overflow-hidden shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imgAvatar} alt={r.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[#433459] text-[28px] font-medium leading-9 tracking-[-0.56px]">
                    {r.name}
                  </p>
                  <div className="flex">
                    {Array.from({ length: r.stars }).map((_, s) => (
                      <span key={s} className="text-yellow-400 text-lg">★</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-[#615a6a] text-xl leading-7 tracking-[-0.4px]">
                {r.text}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
