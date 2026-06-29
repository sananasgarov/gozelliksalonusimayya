import { Router } from "express";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import { requireSecret } from "../middleware/requireSecret.js";

const router = Router();

const loginAttempts = new Map();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

function checkLoginRateLimit(ip) {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || entry.resetAt < now) {
    loginAttempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_ATTEMPTS) return false;
  entry.count++;
  return true;
}

// Dummy hash — always run bcrypt to prevent timing attacks
const DUMMY_HASH = "$2b$12$invalidhashthatalwaysfailsXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

router.post("/verify-credentials", requireSecret, async (req, res) => {
  const ip = (req.headers["x-forwarded-for"]?.split(",")[0]?.trim()) ?? req.socket.remoteAddress ?? "unknown";

  if (!checkLoginRateLimit(ip)) {
    return res.status(429).json({ ok: false });
  }

  const { username, password } = req.body ?? {};
  if (!username || !password || typeof username !== "string" || typeof password !== "string") {
    return res.status(400).json({ ok: false });
  }

  const admin = await Admin.findOne({ username });
  const valid = await bcrypt.compare(password, admin?.password ?? DUMMY_HASH);
  res.json({ ok: valid && !!admin });
});

export default router;
