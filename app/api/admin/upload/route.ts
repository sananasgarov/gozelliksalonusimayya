import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

const MAX_BYTES = 50 * 1024 * 1024; // 50MB

export async function POST(req: NextRequest) {
  const ok = await getSession();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const contentLength = Number(req.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BYTES) {
    return NextResponse.json({ error: "File too large (max 50MB)" }, { status: 413 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large (max 50MB)" }, { status: 413 });
  }

  const backendForm = new FormData();
  backendForm.append("file", file);

  const res = await fetch(`${process.env.BACKEND_URL}/api/upload`, {
    method: "POST",
    headers: { "x-backend-secret": process.env.BACKEND_SECRET ?? "" },
    body: backendForm,
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
