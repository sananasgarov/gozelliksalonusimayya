import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Samiyya Studio's full menu of beauty services in Pittsburgh, PA — makeup (bridal, glam, natural), hair (balayage, coloring, extensions), and nails (gel, acrylic, nail art).",
  alternates: {
    canonical: "https://samiyyastudio.com/services",
  },
  openGraph: {
    title: "Beauty Services — Samiyya Studio Pittsburgh",
    description:
      "Professional makeup, hair, and nail services in Pittsburgh, PA. Bridal packages, balayage, gel manicures, and more.",
    url: "https://samiyyastudio.com/services",
    images: [
      {
        url: "/servicemarkup.png",
        width: 1200,
        height: 630,
        alt: "Samiyya Studio Services",
      },
    ],
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
