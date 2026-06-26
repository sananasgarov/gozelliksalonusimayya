import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { timingSafeEqual } from "crypto";
import { createSession } from "@/lib/session";
import { LoginSchema } from "@/lib/schemas";
import { checkRateLimit, resetRateLimit } from "@/lib/rate-limit";

function safeStringEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a.padEnd(64));
  const bufB = Buffer.from(b.padEnd(64));
  return timingSafeEqual(bufA, bufB) && a.length === b.length;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim()
    ?? request.headers.get("x-real-ip")
    ?? "unknown";

  const rate = checkRateLimit(`login:${ip}`);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: `Too many attempts. Try again in ${Math.ceil((rate.retryAfter ?? 900) / 60)} minutes.` },
      { status: 429, headers: { "Retry-After": String(rate.retryAfter) } }
    );
  }

  // Limit body size (reject payloads over 2KB)
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 2048) {
    return NextResponse.json({ error: "Request too large." }, { status: 413 });
  }

  const body = await request.json().catch(() => null);

  const parsed = LoginSchema.safeParse(body);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Invalid input.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const { username, password } = parsed.data;

  const expectedUsername = process.env.ADMIN_USERNAME ?? "";
  const hash = process.env.ADMIN_PASSWORD_HASH ?? "";

  // Always run bcrypt regardless of username match to prevent timing attacks
  const [validUsername, validPassword] = await Promise.all([
    Promise.resolve(safeStringEqual(username, expectedUsername)),
    hash ? bcrypt.compare(password, hash) : Promise.resolve(false),
  ]);

  if (!validUsername || !validPassword) {
    return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
  }

  resetRateLimit(`login:${ip}`);
  await createSession();
  return NextResponse.json({ ok: true });
}
