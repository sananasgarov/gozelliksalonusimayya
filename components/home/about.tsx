"use client";

import Image from "next/image";
import { useState } from "react";

const photos = [
  "/about-main.png",
  "/about-top.png",
  "/about-bottom.png",
];

type AboutData = {
  description: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
};

const DEFAULTS: AboutData = {
  description:
    "I am Samiyya, a licensed makeup artist and Certified Makeup Master Class Graduate, passionate about enhancing natural beauty through elegant and personalized beauty services.\n\nWith experience serving 150+ clients, I specialize in makeup, simple hairstyling, nail services, brow lamination, and lash lamination for weddings, photoshoots, birthdays, and special occasions.\n\nAvailable for both mobile and home studio appointments, my goal is to provide a comfortable experience and create beautiful, confidence-boosting looks tailored to every client.",
  stat1Value: "5+",
  stat1Label: "Years of Experience",
  stat2Value: "95%",
  stat2Label: "Client Satisfaction",
  stat3Value: "250+",
  stat3Label: "Appointments",
};

export default function About({ data }: { data?: AboutData | null }) {
  const [active, setActive] = useState(0);
  const d = { ...DEFAULTS, ...data };

  const paragraphs = d.description
    ? d.description.split(/\n\n+/).filter(Boolean)
    : DEFAULTS.description.split(/\n\n+/);

  const stats = [
    { value: d.stat1Value, label: d.stat1Label },
    { value: d.stat2Value, label: d.stat2Label },
    { value: d.stat3Value, label: d.stat3Label },
  ];

  return (
    <section id="about" className="pt-25 pb-25 px-4 md:px-15 w-full">
      <h2
        className="text-[#433459] text-[32px] md:text-[40px] leading-10 md:leading-12 tracking-[-0.8px] mb-8 md:mb-10"
        style={{ fontFamily: "var(--font-antonio)" }}
        data-aos="fade-up"
      >
        About Us
      </h2>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start lg:items-center w-full" data-aos="fade-up" data-aos-delay="100">

        {/* Desktop accordion (lg+) */}
        <div
          className="hidden lg:flex gap-3 h-150 shrink-0"
          style={{ width: "652px", minWidth: "652px" }}
        >
          {photos.map((src, i) => (
            <div
              key={i}
              className="h-full rounded-[20px] overflow-hidden relative cursor-pointer"
              style={{
                width: active === i ? "400px" : "114px",
                transition: "width 500ms ease-in-out",
              }}
              onMouseEnter={() => setActive(i)}
            >
              <Image src={src} alt={`About photo ${i + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>

        {/* Mobile/tablet: single photo */}
        <div className="lg:hidden w-full h-72 sm:h-96 rounded-[20px] overflow-hidden relative">
          <Image src={photos[0]} alt="About" fill className="object-cover" />
        </div>

        {/* Text + stats */}
        <div className="flex flex-col gap-8 md:gap-20 flex-1">
          <div className="flex flex-col gap-4 md:gap-10 text-[#615a6a] text-base md:text-xl leading-7 tracking-[-0.4px]">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="flex justify-between w-full">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1 md:gap-2 items-center text-center">
                <p
                  className="text-[#433459] text-[32px] md:text-[56px] leading-none tracking-[-1.12px]"
                  style={{ fontFamily: "var(--font-antonio)" }}
                >
                  {s.value}
                </p>
                <p className="text-[#5e5667] text-xs md:text-base leading-5 md:leading-6 tracking-[-0.32px]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
