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
    <section id="reviews" className="py-12 md:py-20 w-full">
      <h2
        className="text-[#433459] text-[28px] md:text-[40px] leading-9 md:leading-12 tracking-[-0.8px] mb-6 md:mb-8 px-4 md:px-15"
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
        slidesOffsetBefore={16}
        slidesOffsetAfter={16}
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
                  <div className="flex gap-0.5">
                    {Array.from({ length: r.stars }).map((_, s) => (
                      <svg key={s} width="18" height="18" viewBox="0 0 24 24" fill="#D9CAEA" stroke="#C49FFF" strokeWidth="1.5" strokeLinejoin="round">
                        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                      </svg>
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
