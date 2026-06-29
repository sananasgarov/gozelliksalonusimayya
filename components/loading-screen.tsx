"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const MIN_MS = 900;
    const MAX_VIDEO_WAIT_MS = 5000;
    const start = Date.now();

    let windowLoaded = false;
    let videoReady = false;
    let finished = false;

    const finish = () => {
      if (finished || !windowLoaded || !videoReady) return;
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
    const onVideoReady = () => { videoReady = true; finish(); };

    const videoTimeout = setTimeout(() => { videoReady = true; finish(); }, MAX_VIDEO_WAIT_MS);

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    window.addEventListener("heroVideoReady", onVideoReady, { once: true });

    if (document.readyState === "complete") {
      windowLoaded = true;
    } else {
      window.addEventListener("load", onWindowLoad, { once: true });
    }

    finish();

    return () => {
      window.removeEventListener("load", onWindowLoad);
      window.removeEventListener("heroVideoReady", onVideoReady);
      clearTimeout(videoTimeout);
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
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <span
          style={{
            fontFamily: "var(--font-great-vibes)",
            fontSize: "64px",
            lineHeight: 1,
            color: "#433459",
            marginRight: "-6px",
          }}
        >
          Samiyya
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logoblack.png" alt="" style={{ width: 44, height: 44, objectFit: "contain" }} className="transform translate-x-[3px] translate-y-[5px]" />
      </div>
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
