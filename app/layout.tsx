import type { Metadata } from "next";
import { Geist, Antonio, Great_Vibes } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const antonio = Antonio({
  variable: "--font-antonio",
  subsets: ["latin"],
  weight: ["400"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Samiyya Studio",
  description: "Where Beauty Meets Elegance",
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
      <body className="min-h-full flex flex-col bg-white">
        {children}
      </body>
    </html>
  );
}
