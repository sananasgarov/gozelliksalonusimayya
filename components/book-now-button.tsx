"use client";

import { useEffect, useState } from "react";
import SlideText from "@/components/slide-text";

const PHONE = "13476127994";
const SMS_HREF = `sms:+${PHONE}`;
const WA_HREF = `https://wa.me/${PHONE}`;

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
};

export default function BookNowButton({ className, style, children = "Book Now" }: Props) {
  const [href, setHref] = useState(SMS_HREF);

  useEffect(() => {
    setHref(isMobileDevice() ? SMS_HREF : WA_HREF);
  }, []);

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
