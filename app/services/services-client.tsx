"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import SlideText from "@/components/slide-text";
import "aos/dist/aos.css";
import GalleryPreview from "@/components/home/gallery-preview";
import Reviews from "@/components/home/reviews";

type TabKey = "makeup" | "hair" | "nail";

type ServiceItem = { title: string; desc: string; imageUrl: string };

type Props = {
  makeup: ServiceItem[];
  hair: ServiceItem[];
  nail: ServiceItem[];
  gallery: { imageUrl: string; altText: string }[] | null;
  reviews: { name: string; stars: number; text: string; avatarUrl: string }[] | null;
};

const DEFAULT_IMAGE = "/servicemarkup.png";

const tabs: { key: TabKey; label: string }[] = [
  { key: "makeup", label: "Make-up" },
  { key: "hair", label: "Hair" },
  { key: "nail", label: "Nail" },
];

export default function ServicesClient({ makeup, hair, nail, gallery, reviews }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>("makeup");

  const servicesMap: Record<TabKey, ServiceItem[]> = { makeup, hair, nail };
  const services = servicesMap[activeTab];

  useEffect(() => {
    AOS.refresh();
  }, [activeTab]);

  return (
    <>
      <div className="px-4 md:px-15 flex gap-6 mb-8 md:mb-10">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className="text-xl md:text-2xl font-medium leading-8 tracking-[-0.48px] transition-colors duration-200 cursor-pointer group"
            style={{ color: activeTab === t.key ? "#9b6dff" : "#433459" }}
          >
            <SlideText>{t.label}</SlideText>
          </button>
        ))}
      </div>

      {/* Service Cards Grid */}
      <div className="px-4 md:px-15 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-16 md:mb-24">
        {services.map((s, i) => (
          <div
            key={`${activeTab}-${i}`}
            className="relative rounded-[20px] overflow-hidden cursor-pointer group h-56 sm:h-72 lg:h-118.25"
            data-aos="fade-up"
            data-aos-delay={Math.min(i * 60, 420)}
          >
            <Image
              src={s.imageUrl || DEFAULT_IMAGE}
              alt={s.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(102,102,102,0.01) 59%, #291b3f 100%)",
              }}
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[89.5%] flex flex-col gap-0.5">
              <p className="text-[#faf9f7] text-sm sm:text-xl md:text-2xl font-medium leading-5 sm:leading-7.5 tracking-[-0.48px]">
                {s.title}
              </p>
              <p className="text-[#e7e4df] text-[10px] sm:text-xs md:text-sm leading-4 sm:leading-5 tracking-[-0.28px] line-clamp-2">
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <GalleryPreview images={gallery} />
      <Reviews reviews={reviews} />
    </>
  );
}
