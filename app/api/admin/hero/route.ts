import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { backendFetch } from "@/lib/backend";

async function auth() {
  const ok = await getSession();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return null;
}

export async function PUT(req: NextRequest) {
  const deny = await auth(); if (deny) return deny;
  const body = await req.json();
  const res = await backendFetch("/api/hero", { method: "PUT", body: JSON.stringify(body) });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
