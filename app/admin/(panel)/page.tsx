import { publicFetch } from "@/lib/backend";
import Link from "next/link";

const statConfig = [
  {
    key: "gallery",
    label: "Gallery Images",
    href: "/admin/gallery",
    color: "#7c4dcc",
    bg: "linear-gradient(135deg, rgba(124,77,204,0.12) 0%, rgba(155,109,255,0.06) 100%)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
      </svg>
    ),
  },
  {
    key: "reviews",
    label: "Reviews",
    href: "/admin/reviews",
    color: "#e91e8c",
    bg: "linear-gradient(135deg, rgba(233,30,140,0.1) 0%, rgba(233,30,140,0.04) 100%)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  {
    key: "services",
    label: "Services",
    href: "/admin/services",
    color: "#0ea5e9",
    bg: "linear-gradient(135deg, rgba(14,165,233,0.1) 0%, rgba(14,165,233,0.04) 100%)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    key: "brands",
    label: "Brands",
    href: "/admin/brands",
    color: "#f59e0b",
    bg: "linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(245,158,11,0.04) 100%)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
      </svg>
    ),
  },
  {
    key: "faq",
    label: "FAQ Items",
    href: "/admin/faq",
    color: "#22c55e",
    bg: "linear-gradient(135deg, rgba(34,197,94,0.1) 0%, rgba(34,197,94,0.04) 100%)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
];

const quickLinks = [
  {
    href: "/admin/hero",
    label: "Hero Section",
    desc: "Update headline & background video",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3"/>
      </svg>
    ),
  },
  {
    href: "/admin/about",
    label: "About Section",
    desc: "Update studio story & description",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    ),
  },
  {
    href: "/admin/contact",
    label: "Contact Info",
    desc: "Update address & working hours",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.74a16 16 0 0 0 6.29 6.29l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
  {
    href: "/admin/gallery",
    label: "Gallery",
    desc: "Manage portfolio images",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
      </svg>
    ),
  },
  {
    href: "/admin/services",
    label: "Services",
    desc: "Edit service offerings & prices",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    href: "/admin/reviews",
    label: "Reviews",
    desc: "Manage customer testimonials",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
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

  return (
    <div>
      <style>{`
        .stat-card { transition: all 0.2s ease; }
        .stat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(30,16,48,0.12) !important; }
        .quick-link { transition: all 0.15s ease; }
        .quick-link:hover { background: rgba(155,109,255,0.09) !important; border-color: rgba(155,109,255,0.3) !important; }
      `}</style>

      {/* Header banner */}
      <div
        className="rounded-2xl p-7 mb-7 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1e1030 0%, #2d1654 60%, #3d1f6e 100%)" }}
      >
        <div className="absolute top-0 right-0 w-56 h-56 rounded-full opacity-10" style={{ background: "#9b6dff", transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-1/2 w-32 h-32 rounded-full opacity-5" style={{ background: "#c49fff", transform: "translate(-50%, 40%)" }} />
        <div className="relative z-10">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "rgba(196,159,255,0.7)" }}>
            Samiyya Studio
          </p>
          <h1 className="text-4xl font-bold mb-1 text-white" style={{ fontFamily: "var(--font-antonio)" }}>
            Dashboard
          </h1>
          <p className="text-sm" style={{ color: "rgba(196,184,217,0.6)" }}>
            Welcome back — manage your studio content from here.
          </p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-7">
        {statConfig.map((s) => (
          <Link
            key={s.key}
            href={s.href}
            className="stat-card rounded-2xl p-5 flex flex-col gap-4"
            style={{ backgroundColor: "#ffffff", border: "1px solid rgba(155,109,255,0.1)", boxShadow: "0 1px 6px rgba(30,16,48,0.06)" }}
          >
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: s.bg, color: s.color }}>
              {s.icon}
            </div>
            <div>
              <p className="text-[32px] font-bold leading-none mb-1" style={{ color: "#1e1030", fontFamily: "var(--font-antonio)" }}>
                {counts[s.key]}
              </p>
              <p className="text-xs font-medium" style={{ color: "#8b7fa0" }}>{s.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div
        className="rounded-2xl p-6"
        style={{ backgroundColor: "#ffffff", border: "1px solid rgba(155,109,255,0.1)", boxShadow: "0 1px 6px rgba(30,16,48,0.06)" }}
      >
        <div className="flex items-center gap-2 mb-5">
          <div className="w-1 h-5 rounded-full" style={{ background: "linear-gradient(180deg, #7c4dcc, #9b6dff)" }} />
          <h2 className="text-sm font-semibold" style={{ color: "#1e1030" }}>Quick Actions</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="quick-link flex items-center gap-3.5 rounded-xl px-4 py-3.5"
              style={{ background: "rgba(155,109,255,0.04)", border: "1px solid rgba(155,109,255,0.1)" }}
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(155,109,255,0.08)", color: "#7c4dcc" }}>
                {link.icon}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate" style={{ color: "#1e1030" }}>{link.label}</p>
                <p className="text-xs truncate mt-0.5" style={{ color: "#8b7fa0" }}>{link.desc}</p>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9b6dff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 ml-auto opacity-60">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
