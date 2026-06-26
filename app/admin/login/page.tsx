"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const form = e.currentTarget;
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#f4f2ee" }}
    >
      <div
        className="w-full max-w-sm rounded-[24px] px-8 py-10 flex flex-col gap-7"
        style={{ backgroundColor: "#d9caea" }}
      >
        <div className="flex items-start justify-center">
          <span
            className="text-[#433459] text-[44px] leading-none -mr-1"
            style={{ fontFamily: "var(--font-great-vibes)" }}
          >
            Samiyya
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logoblack.png" alt="" className="w-9 h-9 object-contain mt-0.5" />
        </div>

        <p className="text-center text-[#433459] text-lg font-medium tracking-[-0.36px]">
          Admin Panel
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[#5e5667] text-sm tracking-[-0.28px]" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="rounded-[12px] px-4 py-3 text-[#433459] text-base outline-none focus:ring-2 focus:ring-[#9b6dff] transition-shadow"
              style={{ backgroundColor: "#f4f2ee", border: "none" }}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#5e5667] text-sm tracking-[-0.28px]" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="rounded-[12px] px-4 py-3 text-[#433459] text-base outline-none focus:ring-2 focus:ring-[#9b6dff] transition-shadow"
              style={{ backgroundColor: "#f4f2ee", border: "none" }}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-2 rounded-full py-3.5 text-white font-semibold text-base transition-opacity hover:opacity-85 disabled:opacity-60 cursor-pointer"
            style={{ backgroundColor: "#433459" }}
          >
            {pending ? "Logging in…" : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}
