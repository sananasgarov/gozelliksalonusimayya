"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { X, Menu } from "lucide-react";

const logoHeart = "/logoicon.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
        style={{ backgroundColor: scrolled ? "#ffffff" : "transparent" }}
      >
        {/* Bar */}
        <div className="flex items-center justify-between px-15 py-5">
          {/* Logo */}
          <Link href="/" className="flex items-start shrink-0">
            <span
              className="text-[40px] leading-12 -mr-1.5 whitespace-nowrap transition-colors duration-300"
              style={{
                fontFamily: "var(--font-great-vibes)",
                color: scrolled ? "#1a1a1a" : "#ffffff",
              }}
            >
              Samiyya
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={scrolled ? "/logoblack.png" : logoHeart}
              alt=""
              className="size-9 object-cover shrink-0 mt-0.5"
            />
          </Link>

          {/* Right */}
          <div className="flex items-center gap-6">
            <Link
              href="/booking"
              className="bg-[#9b6dff] hover:bg-[#8a5dee] text-white font-medium text-base px-6 py-3 rounded-full transition-colors whitespace-nowrap"
            >
              Book Now
            </Link>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="p-1 shrink-0"
              aria-label="Toggle menu"
            >
              <Menu
                size={24}
                color={scrolled ? "#433459" : "#ffffff"}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Dropdown menu — slides from top */}
      <div
        className="fixed left-0 right-0 top-0 z-999 transition-transform duration-400 ease-in-out"
        style={{
          backgroundColor: "#d9caea",
          height: "370px",
          transform: menuOpen ? "translateY(0)" : "translateY(-100%)",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        {/* Close button — absolute top-right */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-15 p-1"
          aria-label="Close menu"
        >
          <X size={28} color="#433459" />
        </button>

        {/* Links — fully centered */}
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-[#433459] text-xl font-medium hover:opacity-60 transition-opacity"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
