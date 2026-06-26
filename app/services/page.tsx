"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import SlideText from "@/components/slide-text";
import "aos/dist/aos.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import GalleryPreview from "@/components/home/gallery-preview";
import Reviews from "@/components/home/reviews";

type TabKey = "makeup" | "hair" | "nail";

const categoryImages: Record<TabKey, string> = {
  makeup: "/servicemarkup.png",
  hair: "/servicemarkup.png",
  nail: "/servicemarkup.png",
};

const servicesData: Record<TabKey, { title: string; desc: string }[]> = {
  makeup: [
    {
      title: "Natural Makeup",
      desc: "A fresh and minimal makeup look that enhances your natural beauty.",
    },
    {
      title: "Soft Glam Makeup",
      desc: "A soft and elegant makeup look with subtle definition and a natural glow.",
    },
    {
      title: "Full Glam Makeup",
      desc: "A bold and flawless makeup look with dramatic eyes and defined features.",
    },
    {
      title: "Evening Makeup",
      desc: "An elegant makeup look designed for formal and nighttime occasions.",
    },
    {
      title: "Birthday Party Makeup",
      desc: "A stylish makeup look created to make you shine on your special day.",
    },
    {
      title: "Engagement Makeup",
      desc: "A refined and long-lasting makeup look for your engagement celebration.",
    },
    {
      title: "Wedding Makeup",
      desc: "A timeless and flawless bridal makeup look tailored for your wedding day.",
    },
    {
      title: "Photoshoot Makeup",
      desc: "A camera-ready makeup look that highlights your best features.",
    },
    {
      title: "Event Makeup",
      desc: "A customized makeup look suitable for any special occasion or event.",
    },
    {
      title: "Brow Lamination",
      desc: "A brow treatment that lifts and sets hairs for fuller and perfectly styled eyebrows.",
    },
    {
      title: "Lash Lamination",
      desc: "A lash treatment that lifts and curls natural lashes for a longer, defined look.",
    },
    {
      title: "Brow Shaping",
      desc: "A precise eyebrow shaping service that enhances your facial features.",
    },
  ],
  hair: [
    {
      title: "Blowout & Style",
      desc: "A professional blowout giving you smooth, voluminous, and long-lasting results.",
    },
    {
      title: "Hair Coloring",
      desc: "Full or partial color application to transform and refresh your hair look.",
    },
    {
      title: "Balayage",
      desc: "A freehand highlighting technique for natural-looking sun-kissed dimension.",
    },
    {
      title: "Hair Extensions",
      desc: "High-quality extensions to add length and volume seamlessly to your hair.",
    },
    {
      title: "Brazilian Blowout",
      desc: "A smoothing treatment that eliminates frizz and adds lasting shine.",
    },
    {
      title: "Keratin Treatment",
      desc: "A protein treatment that strengthens and smooths hair from within.",
    },
    {
      title: "Updo & Bridal Hair",
      desc: "Elegant and structured hairstyles designed for your most special days.",
    },
    {
      title: "Hair Cut & Trim",
      desc: "Precision cuts and trims tailored to suit your face shape and style.",
    },
    {
      title: "Highlights",
      desc: "Customized highlights woven through your hair for multi-dimensional color.",
    },
    {
      title: "Toner Treatment",
      desc: "A toning service to neutralize brassiness and enhance your hair color.",
    },
    {
      title: "Scalp Treatment",
      desc: "A nourishing scalp treatment to promote healthy hair growth and balance.",
    },
    {
      title: "Braiding",
      desc: "Creative and classic braiding styles for every occasion and hair type.",
    },
  ],
  nail: [
    {
      title: "Classic Manicure",
      desc: "A timeless nail care service that leaves your nails polished and perfect.",
    },
    {
      title: "Gel Manicure",
      desc: "Long-lasting gel polish that stays chip-free for weeks with a glossy finish.",
    },
    {
      title: "Acrylic Nails",
      desc: "Durable acrylic extensions for a stronger and more defined nail look.",
    },
    {
      title: "Nail Art",
      desc: "Creative and intricate nail designs tailored to your personal style.",
    },
    {
      title: "Pedicure",
      desc: "A relaxing foot care treatment that softens skin and pampers your feet.",
    },
    {
      title: "French Manicure",
      desc: "A classic white-tip manicure for an elegant and timeless appearance.",
    },
    {
      title: "Dip Powder Nails",
      desc: "A lightweight and durable nail technique using colored powder for lasting color.",
    },
    {
      title: "Nail Extensions",
      desc: "Seamless nail extensions crafted to match your desired length and shape.",
    },
    {
      title: "Gel Pedicure",
      desc: "A long-lasting gel polish pedicure that keeps your toes looking flawless.",
    },
    {
      title: "Nail Removal",
      desc: "Safe and gentle nail product removal to protect the health of your nails.",
    },
    {
      title: "Nail Repair",
      desc: "Expert nail repair to fix breakage and restore the strength of your nails.",
    },
    {
      title: "Shellac Manicure",
      desc: "A Shellac polish service combining gel durability with classic nail polish ease.",
    },
  ],
};

const tabs: { key: TabKey; label: string }[] = [
  { key: "makeup", label: "Make-up" },
  { key: "hair", label: "Hair" },
  { key: "nail", label: "Nail" },
];


export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("makeup");

  const services = servicesData[activeTab];
  const image = categoryImages[activeTab];

  useEffect(() => {
    AOS.refresh();
  }, [activeTab]);

  return (
    <div className="bg-[#f4f2ee] min-h-screen">
      <Navbar darkIcons />

      <div className="px-4 md:px-15 pt-32 md:pt-42 pb-4 md:pb-6">
        <h1
          className="text-[#433459] text-[32px] md:text-[40px] leading-12 tracking-[-0.8px]"
          style={{ fontFamily: "var(--font-antonio)" }}
        >
          Services
        </h1>
      </div>

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
              src={image}
              alt={s.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(102,102,102,0.01) 59%, #291b3f 100%)",
              }}
            />
            {/* Text */}
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

      <GalleryPreview />
      <Reviews />
      <Footer />
    </div>
  );
}
