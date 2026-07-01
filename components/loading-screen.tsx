"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const MIN_MS = 900;
    const start = Date.now();

    let windowLoaded = false;
    let finished = false;

    const finish = () => {
      if (finished || !windowLoaded) return;
      finished = true;
      const elapsed = Date.now() - start;
      const wait = Math.max(0, MIN_MS - elapsed);
      setTimeout(() => {
        setFading(true);
        AOS.init({ duration: 700, once: true, easing: "ease-out-cubic", offset: 60 });
      }, wait);
      setTimeout(() => {
        setVisible(false);
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        AOS.refresh();
      }, wait + 500);
    };

    const onWindowLoad = () => { windowLoaded = true; finish(); };

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    if (document.readyState === "complete") {
      windowLoaded = true;
    } else {
      window.addEventListener("load", onWindowLoad, { once: true });
    }

    finish();

    return () => {
      window.removeEventListener("load", onWindowLoad);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#f4f2ee",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "8px",
        transition: "opacity 500ms ease",
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? "none" : "auto",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/Logo Black.png" alt="Samiyya Studio" style={{ height: 80, width: "auto", objectFit: "contain" }} />
      <p
        style={{
          fontFamily: "var(--font-geist)",
          fontSize: "14px",
          color: "#9b8aaa",
          letterSpacing: "0.08em",
          fontWeight: 400,
        }}
      >
        Where Beauty Meets Elegance
      </p>
    </div>
  );
}
