import type { Metadata } from "next";
import { Geist, Antonio, Great_Vibes } from "next/font/google";
import "./globals.css";
import LoadingScreen from "@/components/loading-screen";

const BASE_URL = "https://samiyyastudio.com";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const antonio = Antonio({
  variable: "--font-antonio",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Samiyya Studio — Beauty Salon in Pittsburgh, PA",
    template: "%s | Samiyya Studio",
  },
  description:
    "Samiyya Studio is a premier beauty salon in Pittsburgh, PA offering professional makeup, hair, and nail services. Bridal makeup, balayage, gel manicures, lash lamination, and more.",
  keywords: [
    "beauty salon Pittsburgh",
    "makeup artist Pittsburgh",
    "hair salon Pittsburgh PA",
    "nail salon Pittsburgh",
    "bridal makeup Pittsburgh",
    "balayage Pittsburgh",
    "lash lamination Pittsburgh",
    "Samiyya Studio",
    "gel manicure Pittsburgh",
    "brow lamination Pittsburgh",
  ],
  authors: [{ name: "Samiyya Studio" }],
  creator: "Samiyya Studio",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Samiyya Studio",
    title: "Samiyya Studio — Beauty Salon in Pittsburgh, PA",
    description:
      "Premier beauty salon in Pittsburgh offering makeup, hair, and nail services. Book your appointment today.",
    images: [
      {
        url: "/about-main.png",
        width: 1200,
        height: 630,
        alt: "Samiyya Studio — Beauty Salon Pittsburgh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Samiyya Studio — Beauty Salon in Pittsburgh, PA",
    description:
      "Premier beauty salon in Pittsburgh offering makeup, hair, and nail services.",
    images: ["/about-main.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: "Samiyya Studio",
  image: `${BASE_URL}/about-main.png`,
  url: BASE_URL,
  telephone: "+13476127994",
  address: {
    "@type": "PostalAddress",
    streetAddress: "4624 Chatsworth Ave",
    addressLocality: "Pittsburgh",
    addressRegion: "PA",
    postalCode: "15207",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 40.4014,
    longitude: -79.9403,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  sameAs: [
    "https://www.instagram.com/samiyya.studio",
    "https://www.tiktok.com/@samiyya.studio",
    "https://www.facebook.com/samiyya.studio",
  ],
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${antonio.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: `history.scrollRestoration = 'manual';` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white">
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
