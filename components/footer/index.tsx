"use client";

import Link from "next/link";
import SlideText from "@/components/slide-text";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact Us", href: "/#contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Booking Policy", href: "/booking-policy" },
];

type ContactData = {
  info?: {
    email?: string;
    instagram?: string;
    tiktok?: string;
    facebook?: string;
  };
} | null;

function scrollToTop() {
  const start = window.scrollY;
  const duration = 700;
  const startTime = performance.now();

  function easeInOutCubic(t: number) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function step(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, start * (1 - easeInOutCubic(progress)));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

export default function Footer({ contact }: { contact?: ContactData }) {
  const info = contact?.info;
  const instagram =
    info?.instagram ?? "https://www.instagram.com/samiyya.studio";
  const tiktok = info?.tiktok ?? "https://www.tiktok.com/@samiyya.studio";
  const facebook = info?.facebook ?? "https://www.facebook.com/samiyya.studio";

  const contactLinks = [
    { label: "Instagram", href: instagram, external: true },
    { label: "Tik Tok", href: tiktok, external: true },
    { label: "Facebook", href: facebook, external: true },
  ];

  return (
    <footer
      className="w-full pt-16 md:pt-10 pb-8"
      style={{ backgroundColor: "#d9caea" }}
    >
      <div className="max-w-380 mx-auto px-4 md:px-15 flex flex-col gap-13">
        {/* Top row */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-5 items-start">
          {/* Logo + tagline */}
          <div className="flex flex-col gap-4 w-full md:w-106.75 md:shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Logo Black.png"
              alt="Samiyya Studio"
              className="h-10 md:h-12 w-auto object-contain self-start"
            />
            <p className="text-[#5e5667] text-xl sm:text-lg md:text-2xl font-medium leading-7 sm:leading-7 md:leading-8 tracking-[-0.48px]">
              Where Beauty Meets Elegance
            </p>
          </div>

          {/* Link columns */}
          <div className="flex flex-wrap items-start justify-between gap-8 flex-1">
            {/* Quick Links */}
            <div className="flex flex-col gap-3 md:gap-4">
              <p className="text-[#433459] text-xl sm:text-2xl md:text-[28px] font-medium leading-7 sm:leading-8 md:leading-9 tracking-[-0.56px]">
                Quick Links
              </p>
              <div className="flex flex-col gap-2 md:gap-3">
                {quickLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="text-[#615a6a] text-base md:text-xl leading-6 md:leading-7 tracking-[-0.4px] hover:text-[#433459] transition-colors group"
                  >
                    <SlideText>{l.label}</SlideText>
                  </Link>
                ))}
              </div>
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-3 md:gap-4">
              <p className="text-[#433459] text-xl sm:text-2xl md:text-[28px] font-medium leading-7 sm:leading-8 md:leading-9 tracking-[-0.56px]">
                Legal Information
              </p>
              <div className="flex flex-col gap-2 md:gap-3">
                {legalLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="text-[#615a6a] text-base md:text-xl leading-6 md:leading-7 tracking-[-0.4px] hover:text-[#433459] transition-colors group"
                  >
                    <SlideText>{l.label}</SlideText>
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-3 md:gap-4">
              <p className="text-[#433459] text-xl sm:text-2xl md:text-[28px] font-medium leading-7 sm:leading-8 md:leading-9 tracking-[-0.56px]">
                Contact Us
              </p>
              <div className="flex flex-col gap-2 md:gap-3">
                {contactLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target={l.external ? "_blank" : undefined}
                    rel={l.external ? "noopener noreferrer" : undefined}
                    className="text-[#615a6a] text-base md:text-xl leading-6 md:leading-7 tracking-[-0.4px] hover:text-[#433459] transition-colors group"
                  >
                    <SlideText>{l.label}</SlideText>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-5">
          <div className="flex justify-end">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-[#615a6a] text-xl leading-7 tracking-[-0.4px] hover:text-[#433459] transition-colors group"
            >
              <SlideText>Back to top ↑</SlideText>
            </button>
          </div>
          <div className="bg-[#433459] h-[0.5px] rounded-full w-full" />
          <p className="text-[#615a6a] text-sm leading-5 tracking-[-0.28px]">
            © {new Date().getFullYear()} Samiyya Studio. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
