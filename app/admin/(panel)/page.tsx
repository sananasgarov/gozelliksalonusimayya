import { publicFetch } from "@/lib/backend";
import Link from "next/link";

const statConfig = [
  {
    key: "gallery",
    label: "Gallery Images",
    href: "/admin/gallery",
    color: "#7c4dcc",
    bg: "rgba(124,77,204,0.08)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
      </svg>
    ),
  },
  {
    key: "reviews",
    label: "Reviews",
    href: "/admin/reviews",
    color: "#e91e8c",
    bg: "rgba(233,30,140,0.07)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  {
    key: "services",
    label: "Services",
    href: "/admin/services",
    color: "#0ea5e9",
    bg: "rgba(14,165,233,0.07)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    key: "brands",
    label: "Brands",
    href: "/admin/brands",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.07)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
      </svg>
    ),
  },
  {
    key: "faq",
    label: "FAQ Items",
    href: "/admin/faq",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.07)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
];

const quickLinks = [
  { href: "/admin/hero", label: "Edit Hero Section", desc: "Update headline & video" },
  { href: "/admin/about", label: "Edit About Section", desc: "Update studio description" },
  { href: "/admin/contact", label: "Edit Contact Info", desc: "Update address & hours" },
];

export default async function AdminDashboard() {
  const [gallery, reviews, services, brands, faq] = await Promise.all([
    publicFetch("/api/gallery"),
    publicFetch("/api/reviews"),
    publicFetch("/api/services"),
    publicFetch("/api/brands"),
    publicFetch("/api/faq"),
  ]);

  const counts: Record<string, number | string> = {
    gallery: gallery?.length ?? "—",
    reviews: reviews?.length ?? "—",
    services: services?.length ?? "—",
    brands: brands?.length ?? "—",
    faq: faq?.length ?? "—",
  };

  const isOnline = gallery !== null;

  return (
    <div>
      <style>{`
        .admin-stat-card:hover { box-shadow: 0 6px 20px rgba(30,16,48,0.1); transform: translateY(-2px); }
        .admin-quick-link:hover { background: rgba(155,109,255,0.1) !important; border-color: rgba(155,109,255,0.25) !important; }
      `}</style>

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "#9b6dff" }}>
          Samiyya Studio
        </p>
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#1e1030", fontFamily: "var(--font-antonio)" }}>
          Dashboard
        </h1>
        <p className="text-sm mt-1" style={{ color: "#6b5f80" }}>
          Welcome back — here&apos;s an overview of your content.
        </p>
      </div>

      {/* Status pill */}
      <div
        className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium mb-7"
        style={{
          background: isOnline ? "rgba(34,197,94,0.09)" : "rgba(239,68,68,0.09)",
          border: `1px solid ${isOnline ? "rgba(34,197,94,0.25)" : "rgba(239,68,68,0.25)"}`,
          color: isOnline ? "#16a34a" : "#dc2626",
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: isOnline ? "#22c55e" : "#ef4444" }} />
        {isOnline ? "Connected to MongoDB" : "Backend offline — run: cd server && npm run dev"}
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {statConfig.map((s) => (
          <Link
            key={s.key}
            href={s.href}
            className="admin-stat-card rounded-2xl p-5 flex flex-col gap-3 transition-all duration-200"
            style={{ backgroundColor: "#ffffff", border: "1px solid rgba(155,109,255,0.1)", boxShadow: "0 1px 4px rgba(30,16,48,0.06)" }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: s.bg, color: s.color }}>
              {s.icon}
            </div>
            <div>
              <p className="text-3xl font-bold leading-none mb-1" style={{ color: "#1e1030", fontFamily: "var(--font-antonio)" }}>
                {counts[s.key]}
              </p>
              <p className="text-xs" style={{ color: "#6b5f80" }}>{s.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div
        className="rounded-2xl p-6"
        style={{ backgroundColor: "#ffffff", border: "1px solid rgba(155,109,255,0.1)", boxShadow: "0 1px 4px rgba(30,16,48,0.06)" }}
      >
        <h2 className="text-sm font-semibold mb-4" style={{ color: "#1e1030" }}>Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="admin-quick-link flex items-center justify-between rounded-xl px-4 py-3.5 transition-all duration-150"
              style={{ background: "rgba(155,109,255,0.05)", border: "1px solid rgba(155,109,255,0.12)" }}
            >
              <div>
                <p className="text-sm font-medium" style={{ color: "#1e1030" }}>{link.label}</p>
                <p className="text-xs mt-0.5" style={{ color: "#6b5f80" }}>{link.desc}</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9b6dff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 ml-3">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
