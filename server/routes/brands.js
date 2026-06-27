import { Router } from "express";
import Brand from "../models/Brand.js";
import { requireSecret } from "../middleware/requireSecret.js";

const router = Router();

router.get("/", async (req, res) => {
  const items = await Brand.find().sort({ order: 1 });
  res.json(items);
});

router.post("/", requireSecret, async (req, res) => {
  const { name, logoUrl, order } = req.body;
  if (!name) return res.status(400).json({ error: "name required" });
  const item = await Brand.create({
    name:    String(name).slice(0, 100),
    logoUrl: String(logoUrl ?? "").slice(0, 500),
    order:   Number(order) || 0,
  });
  res.status(201).json(item);
});

router.put("/:id", requireSecret, async (req, res) => {
  const { name, logoUrl, order } = req.body;
  const update = {};
  if (name    !== undefined) update.name    = String(name).slice(0, 100);
  if (logoUrl !== undefined) update.logoUrl = String(logoUrl).slice(0, 500);
  if (order   !== undefined) update.order   = Number(order) || 0;
  const item = await Brand.findByIdAndUpdate(req.params.id, { $set: update }, { new: true });
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

router.delete("/:id", requireSecret, async (req, res) => {
  await Brand.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
