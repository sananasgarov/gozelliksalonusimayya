import { Router } from "express";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import { requireSecret } from "../middleware/requireSecret.js";

const router = Router();

// Called by Next.js login route to verify credentials against MongoDB
router.post("/verify-credentials", requireSecret, async (req, res) => {
  const { username, password } = req.body ?? {};
  if (!username || !password) {
    return res.status(400).json({ ok: false });
  }

  const admin = await Admin.findOne({ username });
  if (!admin) return res.json({ ok: false });

  const valid = await bcrypt.compare(password, admin.password);
  res.json({ ok: valid });
});

export default router;
