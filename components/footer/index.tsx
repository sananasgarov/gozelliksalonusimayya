"use client";

import Link from "next/link";

const logoHeart =
  "/logoblack.png";

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

const contactLinks = [
  { label: "Instagram", href: "https://www.instagram.com/samiyya.studio", external: true },
  { label: "Tik Tok", href: "https://www.tiktok.com/@samiyya.studio", external: true },
  { label: "samiyya@gmail.com", href: "mailto:samiyya@gmail.com", external: false },
];

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

export default function Footer() {
  return (
    <footer
      className="w-full px-4 md:px-15 pt-10 md:pt-13 pb-8"
      style={{ backgroundColor: "#d9caea" }}
    >
      <div className="  mx-auto flex flex-col gap-13">
        {/* Top row */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-5 items-start">
          {/* Logo + tagline */}
          <div className="flex flex-col gap-4 w-full md:w-106.75 md:shrink-0">
            <div className="flex items-start">
              <span
                className="text-black text-[48px] leading-none -mr-1.5 whitespace-nowrap"
                style={{ fontFamily: "var(--font-great-vibes)" }}
              >
                Samiyya
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoHeart}
                alt=""
                className="size-11 object-bottom shrink-0"
              />
            </div>
            <p className="text-[#5e5667] text-2xl font-medium leading-8 tracking-[-0.48px]">
              Where Beauty Meets Elegance
            </p>
          </div>

          {/* Link columns */}
          <div className="flex flex-wrap items-start justify-between gap-8 flex-1">
            {/* Quick Links */}
            <div className="flex flex-col gap-4">
              <p className="text-[#433459] text-[28px] font-medium leading-9 tracking-[-0.56px]">
                Quick Links
              </p>
              <div className="flex flex-col gap-3">
                {quickLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="text-[#615a6a] text-xl leading-7 tracking-[-0.4px] hover:text-[#433459] transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-4">
              <p className="text-[#433459] text-[28px] font-medium leading-9 tracking-[-0.56px]">
                Legal İnformation
              </p>
              <div className="flex flex-col gap-3">
                {legalLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="text-[#615a6a] text-xl leading-7 tracking-[-0.4px] hover:text-[#433459] transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-4">
              <p className="text-[#433459] text-[28px] font-medium leading-9 tracking-[-0.56px]">
                Contact Us
              </p>
              <div className="flex flex-col gap-3">
                {contactLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target={l.external ? "_blank" : undefined}
                    rel={l.external ? "noopener noreferrer" : undefined}
                    className="text-[#615a6a] text-xl leading-7 tracking-[-0.4px] hover:text-[#433459] transition-colors"
                  >
                    {l.label}
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
              className="flex items-center gap-1 text-[#615a6a] text-xl leading-7 tracking-[-0.4px] hover:text-[#433459] transition-colors"
            >
              Back to top
              <span className="text-200px text-black ml-1">↑</span>
            </button>
          </div>
          <div className="bg-[#433459] h-[0.5px] rounded-full w-full" />
          <p className="text-[#615a6a] text-sm leading-5 tracking-[-0.28px]">
            © 2026 Samiyya Studio. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
