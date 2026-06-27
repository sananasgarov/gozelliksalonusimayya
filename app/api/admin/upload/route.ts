import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import path from "path";

const MAX_BYTES = 50 * 1024 * 1024;

const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".mp4", ".mov", ".webm"]);
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg", "image/png", "image/webp", "image/gif",
  "video/mp4", "video/quicktime", "video/webm",
]);

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CF_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CF_R2_SECRET_ACCESS_KEY!,
  },
});

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

  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return NextResponse.json({ error: "File type not allowed" }, { status: 400 });
  }

  const ext = path.extname(file.name).toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    return NextResponse.json({ error: "File extension not allowed" }, { status: 400 });
  }

  const key = `uploads/${randomUUID()}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    await r2.send(new PutObjectCommand({
      Bucket: process.env.CF_R2_BUCKET_NAME!,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    }));
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "R2 upload failed";
    console.error("[R2 Upload Error]", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ url: `${process.env.CF_R2_PUBLIC_URL}/${key}` });
}
