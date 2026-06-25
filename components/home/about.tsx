"use client";

import Image from "next/image";
import { useState } from "react";

const photos = [
  "/about-main.png",
  "/about-top.png",
  "/about-bottom.png",
];

const stats = [
  { value: "5+", label: "Years of Experience" },
  { value: "95%", label: "Client Satisfaction" },
  { value: "250+", label: "Appointments" },
];

export default function About() {
  const [active, setActive] = useState(0);

  return (
    <section id="about" className="pt-20 px-15 w-full">
      <h2
        className="text-[#433459] text-[40px] leading-12 tracking-[-0.8px] mb-10"
        style={{ fontFamily: "var(--font-antonio)" }}
      >
        About Us
      </h2>

      <div className="flex gap-10 items-center w-full">
        <div className="flex gap-3 h-150" style={{ width: "652px", minWidth: "652px" }}>
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
              <Image
                src={src}
                alt={`About photo ${i + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-10 flex-1">
          <div className="flex flex-col gap-5 text-[#615a6a] text-xl leading-7 tracking-[-0.4px]">
            <p>
              I am Samiyya, a licensed makeup artist and Certified Makeup Master
              Class Graduate, passionate about enhancing natural beauty through
              elegant and personalized beauty services.
            </p>
            <p>
              With experience serving 150+ clients, I specialize in makeup,
              simple hairstyling, nail services, brow lamination, and lash
              lamination for weddings, photoshoots, birthdays, and special
              occasions.
            </p>
            <p>
              Available for both mobile and home studio appointments, my goal is
              to provide a comfortable experience and create beautiful,
              confidence-boosting looks tailored to every client.
            </p>
          </div>

          <div className="flex justify-between w-full">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-2 items-center text-center">
                <p
                  className="text-[#433459] text-[56px] leading-none tracking-[-1.12px]"
                  style={{ fontFamily: "var(--font-antonio)" }}
                >
                  {s.value}
                </p>
                <p className="text-[#5e5667] text-base leading-6 tracking-[-0.32px]">
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
