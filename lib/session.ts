import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "admin_session";
const MAX_AGE = 60 * 60 * 8; // 8 hours

function sign(value: string): string {
  const secret = process.env.SESSION_SECRET!;
  const mac = createHmac("sha256", secret).update(value).digest("hex");
  return `${value}.${mac}`;
}

function verify(signed: string): string | null {
  const lastDot = signed.lastIndexOf(".");
  if (lastDot === -1) return null;
  const value = signed.slice(0, lastDot);
  const expected = sign(value);
  try {
    if (timingSafeEqual(Buffer.from(signed), Buffer.from(expected))) return value;
  } catch {
    return null;
  }
  return null;
}

export async function createSession() {
  const cookieStore = await cookies();
  const token = sign(`admin:${Date.now()}`);
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE,
    path: "/",
  });
}

export async function getSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  const value = verify(token);
  return value !== null;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
