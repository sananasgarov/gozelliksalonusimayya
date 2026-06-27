import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { checkRateLimit, resetRateLimit } from "@/lib/rate-limit";

if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET env var is not set");
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  const rate = checkRateLimit(`login:${ip}`);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: `Too many attempts. Try again in ${Math.ceil((rate.retryAfter ?? 900) / 60)} minutes.` },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const { username, password } = body;

  if (!username || !password || typeof username !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "Username and password required." }, { status: 400 });
  }

  if (username.length > 100 || password.length > 200) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  const expectedUser = process.env.ADMIN_USERNAME ?? "";
  const hash = process.env.ADMIN_PASSWORD_HASH ?? "";

  const validUser = username === expectedUser;
  const validPass = hash ? await bcrypt.compare(password, hash) : false;

  if (!validUser || !validPass) {
    return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
  }

  resetRateLimit(`login:${ip}`);

  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(JWT_SECRET);

  const response = NextResponse.json({ ok: true });
  response.cookies.set("admin_jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return response;
}
