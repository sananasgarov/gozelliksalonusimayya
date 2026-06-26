import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Samiyya Studio's terms and conditions — service agreements, client responsibilities, and studio policies.",
  alternates: {
    canonical: "https://samiyyastudio.com/terms",
  },
  robots: { index: false, follow: false },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
