"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const form = e.currentTarget;
    const res = await fetch("/api/backend/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        username: (form.elements.namedItem("username") as HTMLInputElement).value,
        password: (form.elements.namedItem("password") as HTMLInputElement).value,
      }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Login failed.");
      setPending(false);
    }
  }

  return (
    <div className="min-h-screen flex" style={{ background: "linear-gradient(135deg, #1e1030 0%, #2a1545 50%, #3d1f6e 100%)" }}>
      {/* Left brand panel */}
      <div className="hidden lg:flex flex-col items-center justify-center w-[42%] relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 40% 50%, rgba(155,109,255,0.15) 0%, transparent 70%)" }} />
        <div className="relative z-10 flex flex-col items-center gap-6 text-center px-12">
          <div className="flex items-center gap-1">
            <span className="text-white text-6xl" style={{ fontFamily: "var(--font-great-vibes)" }}>Samiyya</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logoblack.png" alt="" className="w-10 h-10 object-contain brightness-0 invert" />
          </div>
          <p className="text-[rgba(196,184,217,0.65)] text-lg leading-relaxed max-w-xs">
            Studio management panel — manage your content, gallery, and services from one place.
          </p>
          <div className="mt-4 flex flex-col gap-3 w-full max-w-[220px]">
            {["Gallery & Portfolio", "Services & Pricing", "Reviews & FAQ", "Contact & Hours"].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "#9b6dff" }} />
                <span className="text-[rgba(196,184,217,0.7)] text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Decorative circles */}
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-5" style={{ background: "#9b6dff", transform: "translate(40%, 40%)" }} />
        <div className="absolute top-0 left-0 w-48 h-48 rounded-full opacity-5" style={{ background: "#9b6dff", transform: "translate(-40%, -40%)" }} />
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[380px]">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <span className="text-white text-4xl" style={{ fontFamily: "var(--font-great-vibes)" }}>Samiyya</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logoblack.png" alt="" className="w-8 h-8 object-contain brightness-0 invert" />
          </div>

          <div
            className="rounded-2xl p-8"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(155,109,255,0.15)", backdropFilter: "blur(20px)" }}
          >
            <h1 className="text-white text-2xl font-semibold mb-1">Welcome back</h1>
            <p className="text-[rgba(196,184,217,0.55)] text-sm mb-7">Sign in to your admin panel</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[rgba(196,184,217,0.7)] text-xs font-medium tracking-wide uppercase" htmlFor="username">
                  Username
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "rgba(155,109,255,0.6)" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                    </svg>
                  </span>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    placeholder="Enter username"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-white text-sm outline-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(155,109,255,0.2)",
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(155,109,255,0.6)"; e.currentTarget.style.background = "rgba(155,109,255,0.08)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(155,109,255,0.2)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[rgba(196,184,217,0.7)] text-xs font-medium tracking-wide uppercase" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "rgba(155,109,255,0.6)" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </span>
                  <input
                    id="password"
                    name="password"
                    type={showPass ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    placeholder="Enter password"
                    className="w-full pl-10 pr-12 py-3 rounded-xl text-white text-sm outline-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(155,109,255,0.2)",
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(155,109,255,0.6)"; e.currentTarget.style.background = "rgba(155,109,255,0.08)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(155,109,255,0.2)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                    style={{ color: "rgba(155,109,255,0.5)" }}
                  >
                    {showPass ? (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-lg px-4 py-3 flex items-center gap-2.5" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={pending}
                className="mt-1 w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60"
                style={{ background: "linear-gradient(135deg, #7c4dcc 0%, #9b6dff 100%)", boxShadow: "0 4px 20px rgba(155,109,255,0.3)" }}
                onMouseEnter={(e) => !pending && (e.currentTarget.style.boxShadow = "0 6px 24px rgba(155,109,255,0.45)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(155,109,255,0.3)")}
              >
                {pending ? (
                  <>
                    <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                    </svg>
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign In
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-[rgba(196,184,217,0.3)] text-xs mt-6">
            Samiyya Studio · Admin Panel
          </p>
        </div>
      </div>
    </div>
  );
}
