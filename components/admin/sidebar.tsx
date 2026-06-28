"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/>
        <rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>
      </svg>
    ),
  },
  {
    href: "/admin/hero",
    label: "Hero",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3"/>
      </svg>
    ),
  },
  {
    href: "/admin/about",
    label: "About",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    ),
  },
  {
    href: "/admin/services",
    label: "Services",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
    ),
  },
  {
    href: "/admin/gallery",
    label: "Gallery",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
    ),
  },
  {
    href: "/admin/reviews",
    label: "Reviews",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  {
    href: "/admin/brands",
    label: "Brands",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
      </svg>
    ),
  },
  {
    href: "/admin/faq",
    label: "FAQ",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
  {
    href: "/admin/contact",
    label: "Contact",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.74a16 16 0 0 0 6.29 6.29l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
  {
    href: "/admin/legal",
    label: "Legal Pages",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
];

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <>
      {navItems.map((item) => {
        const active =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative group"
            style={{
              color: active ? "#ffffff" : "rgba(196,184,217,0.7)",
              backgroundColor: active ? "rgba(155,109,255,0.18)" : "transparent",
            }}
          >
            {active && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full" style={{ backgroundColor: "#9b6dff" }} />
            )}
            <span style={{ color: active ? "#9b6dff" : "rgba(196,184,217,0.5)" }} className="transition-colors group-hover:text-[#9b6dff]">
              {item.icon}
            </span>
            <span className="group-hover:text-white transition-colors">{item.label}</span>
          </Link>
        );
      })}
    </>
  );
}

function LogoutBtn() {
  async function handleLogout() {
    await fetch("/api/backend/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }
  return (
    <button
      onClick={handleLogout}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group"
      style={{ color: "rgba(196,184,217,0.6)" }}
    >
      <span className="group-hover:text-red-400 transition-colors">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
      </span>
      <span className="group-hover:text-red-400 transition-colors">Log out</span>
    </button>
  );
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const sidebarContent = (
    <>
      <div className="flex items-center gap-2 px-6 py-6">
        <span className="text-white text-2xl leading-none" style={{ fontFamily: "var(--font-great-vibes)" }}>Samiyya</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logoblack.png" alt="" className="w-5 h-5 object-contain brightness-0 invert" />
      </div>
      <div className="mx-5 mb-4 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(155,109,255,0.4), transparent)" }} />
      <p className="px-6 text-[10px] font-semibold tracking-[0.12em] uppercase mb-2" style={{ color: "rgba(196,184,217,0.45)" }}>
        Navigation
      </p>
      <nav className="flex flex-col gap-0.5 px-3 flex-1 overflow-y-auto">
        <NavLinks pathname={pathname} onNavigate={() => setDrawerOpen(false)} />
      </nav>
      <div className="mx-5 mt-3 mb-4 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(155,109,255,0.4), transparent)" }} />
      <div className="px-3 pb-5">
        <LogoutBtn />
      </div>
    </>
  );

  return (
    <>
      {/* ── DESKTOP sidebar ── */}
      <aside
        className="hidden lg:flex w-60 shrink-0 flex-col h-screen sticky top-0"
        style={{ background: "linear-gradient(180deg, #1e1030 0%, #2a1545 100%)" }}
      >
        {sidebarContent}
      </aside>

      {/* ── MOBILE top header ── */}
      <header
        className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3"
        style={{ background: "linear-gradient(180deg, #1e1030 0%, #2a1545 100%)", borderBottom: "1px solid rgba(155,109,255,0.15)" }}
      >
        <div className="flex items-center gap-1.5">
          <span className="text-white text-2xl leading-none" style={{ fontFamily: "var(--font-great-vibes)" }}>Samiyya</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logoblack.png" alt="" className="w-5 h-5 object-contain brightness-0 invert" />
        </div>
        <button
          onClick={() => setDrawerOpen(true)}
          className="p-2 rounded-lg"
          style={{ color: "rgba(196,184,217,0.8)" }}
          aria-label="Open menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </header>

      {/* ── MOBILE drawer backdrop ── */}
      {drawerOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* ── MOBILE drawer ── */}
      <div
        className="lg:hidden fixed top-0 left-0 bottom-0 z-50 w-72 flex flex-col"
        style={{
          background: "linear-gradient(180deg, #1e1030 0%, #2a1545 100%)",
          transform: drawerOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 300ms ease-in-out",
          willChange: "transform",
        }}
      >
        {/* Close button */}
        <div className="flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-1.5">
            <span className="text-white text-2xl leading-none" style={{ fontFamily: "var(--font-great-vibes)" }}>Samiyya</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logoblack.png" alt="" className="w-5 h-5 object-contain brightness-0 invert" />
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            className="p-1.5 rounded-lg"
            style={{ color: "rgba(196,184,217,0.7)" }}
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="mx-5 mb-4 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(155,109,255,0.4), transparent)" }} />
        <p className="px-6 text-[10px] font-semibold tracking-[0.12em] uppercase mb-2" style={{ color: "rgba(196,184,217,0.45)" }}>
          Navigation
        </p>

        <nav className="flex flex-col gap-0.5 px-3 flex-1 overflow-y-auto">
          <NavLinks pathname={pathname} onNavigate={() => setDrawerOpen(false)} />
        </nav>

        <div className="mx-5 mt-3 mb-4 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(155,109,255,0.4), transparent)" }} />
        <div className="px-3 pb-6">
          <LogoutBtn />
        </div>
      </div>
    </>
  );
}
