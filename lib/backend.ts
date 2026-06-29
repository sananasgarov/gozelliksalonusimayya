const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:5000";
const BACKEND_SECRET = process.env.BACKEND_SECRET ?? "";

export async function backendFetch(path: string, init?: RequestInit) {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "x-backend-secret": BACKEND_SECRET,
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });
  return res;
}

export async function publicFetch(path: string) {
  try {
    const res = await fetch(`${BACKEND_URL}${path}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json().catch(() => null);
  } catch {
    return null;
  }
}
