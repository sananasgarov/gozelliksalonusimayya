import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { backendFetch } from "@/lib/backend";

async function auth() {
  const ok = await getSession();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return null;
}

// GET /api/admin/legal?key=terms
export async function GET(req: NextRequest) {
  const deny = await auth(); if (deny) return deny;
  const key = req.nextUrl.searchParams.get("key") ?? "terms";
  const res = await backendFetch(`/api/legal/${key}`);
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

// POST /api/admin/legal
export async function POST(req: NextRequest) {
  const deny = await auth(); if (deny) return deny;
  const body = await req.json();
  const res = await backendFetch("/api/legal", { method: "POST", body: JSON.stringify(body) });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

// PUT /api/admin/legal  { id, ...fields }
export async function PUT(req: NextRequest) {
  const deny = await auth(); if (deny) return deny;
  const { id, ...rest } = await req.json();
  const res = await backendFetch(`/api/legal/${id}`, { method: "PUT", body: JSON.stringify(rest) });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

// DELETE /api/admin/legal  { id }
export async function DELETE(req: NextRequest) {
  const deny = await auth(); if (deny) return deny;
  const { id } = await req.json();
  const res = await backendFetch(`/api/legal/${id}`, { method: "DELETE" });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
