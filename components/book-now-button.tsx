"use client";

import { useEffect, useState } from "react";
import SlideText from "@/components/slide-text";

const DEFAULT_PHONE = "13476127994";

function isMobileDevice(): boolean {
  return (
    /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth < 768
  );
}

type Props = {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  phone?: string;
};

export default function BookNowButton({ className, style, children = "Book Now", phone }: Props) {
  const p = phone ?? DEFAULT_PHONE;
  const smsHref = `sms:+${p}`;
  const waHref = `https://wa.me/${p}`;
  const [href, setHref] = useState(smsHref);

  useEffect(() => {
    setHref(isMobileDevice() ? smsHref : waHref);
  }, [smsHref, waHref]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
    >
      <SlideText>{children}</SlideText>
    </a>
  );
}
