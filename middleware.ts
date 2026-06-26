import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "admin_session";

async function verifyToken(signed: string): Promise<boolean> {
  const secret = process.env.SESSION_SECRET;
  if (!secret) return false;

  const lastDot = signed.lastIndexOf(".");
  if (lastDot === -1) return false;

  const value = signed.slice(0, lastDot);
  const hexMac = signed.slice(lastDot + 1);

  if (hexMac.length !== 64) return false;

  const encoder = new TextEncoder();

  let key: CryptoKey;
  try {
    key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );
  } catch {
    return false;
  }

  const macBytes = new Uint8Array(hexMac.match(/.{2}/g)!.map((b) => parseInt(b, 16)));

  try {
    return await crypto.subtle.verify("HMAC", key, macBytes, encoder.encode(value));
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin/login")) return NextResponse.next();

  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token || !(await verifyToken(token))) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
