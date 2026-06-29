"use client";

import { useState, useEffect, useRef } from "react";
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

function ReviewCard({ r, i, visible }: { r: ReviewItem; i: number; visible: boolean }) {
  const [pressed, setPressed] = useState(false);

  return (
    <div
      style={{ animationDelay: `${i * 120}ms` }}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      onTouchCancel={() => setPressed(false)}
      className={`group rounded-[20px] p-6 flex flex-col gap-3 h-full flex-1 cursor-pointer border-[0.5px] transition-[background-color,border-color] duration-450 ease-in-out ${
        pressed ? "border-transparent bg-[#d9caea]" : "border-[#3f3450] hover:border-transparent bg-transparent hover:bg-[#d9caea]"
      } ${visible ? "review-card-animate" : "review-card-hidden"}`}
    >
      <div className="flex gap-4 items-center">
        <div className="size-16 sm:size-20 rounded-full overflow-hidden shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={r.avatarUrl || "/avatar.png"} alt={r.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col gap-1">
          <p className={`transition-colors duration-450 text-[22px] sm:text-[28px] font-medium leading-9 tracking-[-0.56px] ${pressed ? "text-black" : "text-[#433459] group-hover:text-black"}`}>
            {r.name}
          </p>
          <div className="flex">
            {Array.from({ length: Math.min(5, Math.max(1, r.stars)) }).map((_, s) => (
              <svg
                key={s}
                width="20" height="20" viewBox="0 0 24 24"
                strokeLinejoin="round"
                className={pressed ? "review-star-pressed" : "review-star"}
              >
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
            ))}
          </div>
        </div>
      </div>
      <p className="text-[#615a6a] text-[16px] sm:text-[20px] leading-7 tracking-[-0.4px]">
        {r.text}
      </p>
    </div>
  );
}

export default function Reviews({ reviews }: { reviews?: ReviewItem[] | null }) {
  const items = reviews && reviews.length > 0 ? reviews : FALLBACK;
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="reviews" className="w-full overflow-x-hidden">
      <h2
        className="text-[#433459] text-[28px] md:text-[40px] leading-9 md:leading-12 tracking-[-0.8px] mb-6 md:mb-8 px-4 md:px-15"
        style={{ fontFamily: "var(--font-antonio)" }}
        data-aos="fade-up"
        suppressHydrationWarning
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
          <SwiperSlide key={i} className="w-75! sm:w-95! md:w-106.75!">
            <ReviewCard r={r} i={i} visible={visible} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
