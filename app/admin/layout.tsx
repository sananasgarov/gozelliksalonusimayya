import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Samiyya Studio",
  robots: { index: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
