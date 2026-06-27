import { Router } from "express";
import LegalSection from "../models/LegalSection.js";
import { requireSecret } from "../middleware/requireSecret.js";

const ALLOWED_KEYS = new Set(["terms", "privacy", "booking"]);
const router = Router();

router.get("/:key", async (req, res) => {
  const key = String(req.params.key);
  if (!ALLOWED_KEYS.has(key)) {
    return res.status(400).json({ error: "Invalid page key" });
  }
  const sections = await LegalSection.find({ pageKey: key }).sort({ order: 1 });
  res.json(sections);
});

router.post("/", requireSecret, async (req, res) => {
  const { pageKey, title, body, order } = req.body;
  if (!ALLOWED_KEYS.has(String(pageKey ?? ""))) {
    return res.status(400).json({ error: "Invalid pageKey" });
  }
  if (!title) return res.status(400).json({ error: "title required" });
  const item = await LegalSection.create({
    pageKey: String(pageKey),
    title:   String(title).slice(0, 300),
    body:    String(body ?? "").slice(0, 20000),
    order:   Number(order) || 0,
  });
  res.status(201).json(item);
});

router.put("/:id", requireSecret, async (req, res) => {
  const { title, body, order } = req.body;
  const update = {};
  if (title !== undefined) update.title = String(title).slice(0, 300);
  if (body  !== undefined) update.body  = String(body).slice(0, 20000);
  if (order !== undefined) update.order = Number(order) || 0;
  const item = await LegalSection.findByIdAndUpdate(req.params.id, { $set: update }, { new: true });
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

router.delete("/:id", requireSecret, async (req, res) => {
  await LegalSection.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
