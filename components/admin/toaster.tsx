"use client";

import { useEffect, useState } from "react";

type ToastItem = { id: number; message: string; type: "error" | "success" | "delete" };
let _id = 0;

export function toast(message: string, type: "error" | "success" | "delete" = "error") {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("__admin_toast", { detail: { id: ++_id, message, type } })
  );
}

export function Toaster() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const handler = (e: Event) => {
      const t = (e as CustomEvent<ToastItem>).detail;
      setToasts((p) => [...p, t]);
      setTimeout(() => setToasts((p) => p.filter((x) => x.id !== t.id)), 4000);
    };
    window.addEventListener("__admin_toast", handler);
    return () => window.removeEventListener("__admin_toast", handler);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium text-white shadow-lg pointer-events-auto"
          style={{
            background: t.type === "success"
              ? "linear-gradient(135deg,#16a34a 0%,#22c55e 100%)"
              : "linear-gradient(135deg,#dc2626 0%,#ef4444 100%)",
            boxShadow: t.type === "success"
              ? "0 4px 16px rgba(34,197,94,0.35)"
              : "0 4px 16px rgba(239,68,68,0.35)",
          }}
        >
          {t.type !== "success" ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          )}
          {t.message}
        </div>
      ))}
    </div>
  );
}
