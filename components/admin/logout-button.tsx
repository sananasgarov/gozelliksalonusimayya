"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleLogout() {
    setPending(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <button
      onClick={handleLogout}
      disabled={pending}
      className="text-[#615a6a] text-sm hover:text-[#433459] transition-colors cursor-pointer disabled:opacity-50"
    >
      {pending ? "Logging out…" : "Log out"}
    </button>
  );
}
