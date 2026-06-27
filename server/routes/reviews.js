import { Router } from "express";
import Review from "../models/Review.js";
import { requireSecret } from "../middleware/requireSecret.js";

const router = Router();

router.get("/", async (req, res) => {
  const items = await Review.find().sort({ createdAt: -1 });
  res.json(items);
});

router.post("/", requireSecret, async (req, res) => {
  const { name, stars, text, avatarUrl } = req.body;
  if (!name || !text) return res.status(400).json({ error: "name and text required" });
  const item = await Review.create({
    name:      String(name).slice(0, 100),
    text:      String(text).slice(0, 2000),
    stars:     Math.min(5, Math.max(1, Number(stars) || 5)),
    avatarUrl: String(avatarUrl ?? "/avatar.png").slice(0, 500),
  });
  res.status(201).json(item);
});

router.put("/:id", requireSecret, async (req, res) => {
  const { name, stars, text, avatarUrl } = req.body;
  const update = {};
  if (name      !== undefined) update.name      = String(name).slice(0, 100);
  if (text      !== undefined) update.text      = String(text).slice(0, 2000);
  if (stars     !== undefined) update.stars     = Math.min(5, Math.max(1, Number(stars) || 5));
  if (avatarUrl !== undefined) update.avatarUrl = String(avatarUrl).slice(0, 500);
  const item = await Review.findByIdAndUpdate(req.params.id, { $set: update }, { new: true });
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

router.delete("/:id", requireSecret, async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
