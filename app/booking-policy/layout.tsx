import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Policy",
  description:
    "Learn about Samiyya Studio's booking policy — deposit requirements, cancellation rules, mobile services, and how to book your appointment in Pittsburgh, PA.",
  alternates: {
    canonical: "https://samiyyastudio.com/booking-policy",
  },
  robots: { index: false, follow: false },
};

export default function BookingPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
