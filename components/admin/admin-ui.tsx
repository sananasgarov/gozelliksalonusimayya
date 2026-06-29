"use client";

import React from "react";
import { toast } from "./toaster";

export async function adminFetch<T = Record<string, unknown>>(
  url: string,
  init?: RequestInit
): Promise<T | null> {
  try {
    const res = await fetch(url, {
      ...init,
      headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({})) as { error?: string };
      toast(data.error || "Xəta baş verdi", "error");
      return null;
    }
    return await res.json().catch(() => null) as T;
  } catch {
    toast("Şəbəkə xətası. Yenidən cəhd edin.", "error");
    return null;
  }
}

/* ------------------------------------------------------------------
   Card
------------------------------------------------------------------ */
export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl p-6 ${className}`}
      style={{ backgroundColor: "#ffffff", border: "1px solid rgba(155,109,255,0.1)", boxShadow: "0 1px 4px rgba(30,16,48,0.06)" }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------
   Field
------------------------------------------------------------------ */
export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium tracking-wide uppercase" style={{ color: "#6b5f80" }}>{label}</label>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------
   Input / Textarea / Select base styles
------------------------------------------------------------------ */
export const inputCls =
  "w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all " +
  "border focus:border-[#9b6dff] focus:bg-white";

export const inputStyle = {
  backgroundColor: "#f7f5fb",
  borderColor: "rgba(155,109,255,0.2)",
  color: "#1e1030",
};

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={inputCls + (props.className ? " " + props.className : "")}
      style={{ ...inputStyle, ...props.style }}
    />
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={inputCls + " resize-y min-h-24" + (props.className ? " " + props.className : "")}
      style={{ ...inputStyle, ...props.style }}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={inputCls + (props.className ? " " + props.className : "")}
      style={{ ...inputStyle, ...props.style }}
    />
  );
}

/* ------------------------------------------------------------------
   Buttons
------------------------------------------------------------------ */
export function PrimaryBtn({
  children,
  onClick,
  disabled,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 disabled:opacity-50 cursor-pointer"
      style={{ background: "linear-gradient(135deg, #7c4dcc 0%, #9b6dff 100%)", boxShadow: "0 4px 12px rgba(155,109,255,0.3)" }}
      onMouseEnter={(e) => { if (!disabled) (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 18px rgba(155,109,255,0.45)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(155,109,255,0.3)"; }}
    >
      {children}
    </button>
  );
}

export function SecondaryBtn({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 disabled:opacity-50 cursor-pointer"
      style={{ background: "rgba(155,109,255,0.06)", color: "#7c4dcc", border: "1px solid rgba(155,109,255,0.2)" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(155,109,255,0.12)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(155,109,255,0.06)"; }}
    >
      {children}
    </button>
  );
}

export function DangerBtn({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 disabled:opacity-50 cursor-pointer"
      style={{ background: "rgba(239,68,68,0.07)", color: "#dc2626", border: "1px solid rgba(239,68,68,0.15)" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.12)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.07)"; }}
    >
      {children}
    </button>
  );
}

export function EditBtn({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer"
      style={{ background: "rgba(155,109,255,0.07)", color: "#7c4dcc", border: "1px solid rgba(155,109,255,0.15)" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(155,109,255,0.13)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(155,109,255,0.07)"; }}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------
   SavedBadge
------------------------------------------------------------------ */
export function SavedBadge({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full" style={{ background: "rgba(34,197,94,0.1)", color: "#16a34a" }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      Saved
    </span>
  );
}

/* ------------------------------------------------------------------
   Empty state
------------------------------------------------------------------ */
export function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 rounded-2xl" style={{ border: "2px dashed rgba(155,109,255,0.15)", color: "#9b6dff" }}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-3 opacity-50">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <p className="text-sm" style={{ color: "#6b5f80" }}>{label}</p>
    </div>
  );
}

/* ------------------------------------------------------------------
   Section heading inside a card
------------------------------------------------------------------ */
export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-base font-semibold mb-5" style={{ color: "#1e1030" }}>{children}</h2>
  );
}
