"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

type ReviewItem = { name: string; stars: number; text: string; avatarUrl: string };

const FALLBACK: ReviewItem[] = [
  { name: "Emma Johnson", stars: 5, text: "Amazing service! I felt so confident and beautiful after my appointment. Highly recommend Samiyya Studio to everyone.", avatarUrl: "/avatar.png" },
  { name: "Sarah Williams", stars: 5, text: "Professional, talented, and so warm. The bridal makeup was absolutely stunning. All my guests were amazed!", avatarUrl: "/avatar.png" },
  { name: "Aisha Patel", stars: 5, text: "I love how Samiyya listens to exactly what you want. The nail art was perfect and lasted weeks without chipping.", avatarUrl: "/avatar.png" },
  { name: "Maria Garcia", stars: 5, text: "Best makeup artist I've ever been to. The results look incredible both in person and in photos!", avatarUrl: "/avatar.png" },
];

export default function Reviews({ reviews }: { reviews?: ReviewItem[] | null }) {
  const items = reviews && reviews.length > 0 ? reviews : FALLBACK;

  return (
    <section id="reviews" className="pt-25 pb-25 w-full overflow-x-hidden">
      <h2
        className="text-[#433459] text-[28px] md:text-[40px] leading-9 md:leading-12 tracking-[-0.8px] mb-6 md:mb-8 px-4 md:px-15"
        style={{ fontFamily: "var(--font-antonio)" }}
        data-aos="fade-up"
      >
        Customer Reviews
      </h2>

      <style>{`
        .reviews-swiper .swiper-wrapper { align-items: stretch; }
        .reviews-swiper .swiper-slide { height: auto !important; display: flex; flex-direction: column; overflow: visible !important; }
        .reviews-swiper { overflow: visible !important; }
      `}</style>

      <Swiper
        modules={[FreeMode]}
        freeMode={{ enabled: true, momentum: true }}
        slidesPerView="auto"
        spaceBetween={20}
        grabCursor
        slidesOffsetBefore={16}
        slidesOffsetAfter={16}
        className="reviews-swiper w-full overflow-visible! lg:px-12! px-4"
      >
        {items.map((r, i) => (
          <SwiperSlide key={i} className="w-70! sm:w-90! md:w-106.75!">
            <div
              className="border border-[#3f3450]/30 rounded-[20px] p-4 sm:p-6 flex flex-col gap-2 sm:gap-3 hover:bg-[#D9CAEA]/40 hover:shadow-md hover:border-[#3f3450]/60 transition-all duration-500 ease-out h-full flex-1 cursor-pointer"
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <div className="flex gap-3 sm:gap-4 items-center">
                <div className="size-14 sm:size-20 rounded-full overflow-hidden shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.avatarUrl || "/avatar.png"} alt={r.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[#433459] text-base sm:text-[22px] md:text-[28px] font-medium leading-6 sm:leading-8 md:leading-9 tracking-[-0.56px]">
                    {r.name}
                  </p>
                  <div className="flex gap-0.5">
                    {Array.from({ length: Math.min(5, Math.max(1, r.stars)) }).map((_, s) => (
                      <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="#D9CAEA" stroke="#3F3450" strokeWidth="1.5" strokeLinejoin="round" className="sm:w-4.5 sm:h-4.5">
                        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-[#615a6a] text-sm sm:text-base md:text-xl leading-5 sm:leading-6 md:leading-7 tracking-[-0.4px]">
                {r.text}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
