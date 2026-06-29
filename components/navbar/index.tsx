"use client";

import Link from "next/link";
import SlideText from "@/components/slide-text";
import BookNowButton from "@/components/book-now-button";
import { useState, useEffect, useRef } from "react";
import { X, Menu } from "lucide-react";

const logoHeart = "/logoicon.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar({ forceScrolled = false, darkIcons = false }: { forceScrolled?: boolean; darkIcons?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [_scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  const scrolled = forceScrolled || _scrolled;
  const dark = scrolled || darkIcons;

  useEffect(() => {
    if (forceScrolled) return;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);

      if (y < 60) {
        setHidden(false);
      } else if (y > lastScrollY.current + 8) {
        setHidden(true);
      } else if (y < lastScrollY.current - 4) {
        setHidden(false);
      }

      lastScrollY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [forceScrolled]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[transform,background-color] duration-400 ease-in-out border-b-[0.5px] ${scrolled ? "border-[#2B2139]" : "border-transparent"}`}
        style={{
          backgroundColor: scrolled ? "#F4F2EE" : "transparent",
          transform: hidden && !menuOpen ? "translateY(-100%)" : "translateY(0)",
        }}
      >
        <div className="flex items-center justify-between px-4 sm:px-8 md:px-15 py-4 md:py-5">
          <Link href="/" className="flex items-start shrink-0">
            <span
              className="text-[40px] leading-12 whitespace-nowrap transition-colors duration-300"
              style={{
                fontFamily: "var(--font-great-vibes)",
                color: dark ? "#1a1a1a" : "#ffffff",
              }}
            >
              Samiyya
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={dark ? "/logoblack.png" : logoHeart}
              alt=""
              className="size-9 object-cover -translate-x-[3px] shrink-0 mt-0.45"
            />
          </Link>

          <div className="flex items-center gap-6">
            <BookNowButton className="hidden sm:flex items-center justify-center bg-[#9b6dff] hover:bg-[#8a5dee] text-white font-medium text-[16px] leading-6 px-6 py-3 rounded-full transition-colors whitespace-nowrap group" />

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="p-1 shrink-0"
              aria-label="Toggle menu"
            >
              <Menu size={24} color={dark ? "#433459" : "#ffffff"} />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          className="fixed inset-0 z-998"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div
        className="fixed left-0 right-0 z-999"
        style={{
          backgroundColor: "#d9caea",
          height: "370px",
          top: -2,
          transform: menuOpen ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 350ms ease-in-out",
          willChange: "transform",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-4 md:right-15 p-1"
          aria-label="Close menu"
        >
          <X size={28} color="#433459" />
        </button>

        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-[#433459] text-xl font-medium transition-opacity group"
            >
              <SlideText>{l.label}</SlideText>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
