import { timingSafeEqual } from "crypto";

export function requireSecret(req, res, next) {
  const secret = req.headers["x-backend-secret"];
  const expected = process.env.BACKEND_SECRET ?? "";
  if (!secret || !expected) return res.status(401).json({ error: "Unauthorized" });

  const a = Buffer.from(secret);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}
