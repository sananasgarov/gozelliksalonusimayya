import { Router } from "express";
import Gallery from "../models/Gallery.js";
import { requireSecret } from "../middleware/requireSecret.js";

const router = Router();

router.get("/", async (req, res) => {
  const items = await Gallery.find().sort({ order: 1, createdAt: 1 });
  res.json(items);
});

router.post("/", requireSecret, async (req, res) => {
  const { imageUrl, altText, order } = req.body;
  if (!imageUrl || typeof imageUrl !== "string") {
    return res.status(400).json({ error: "imageUrl required" });
  }
  const item = await Gallery.create({
    imageUrl: String(imageUrl).slice(0, 500),
    altText:  String(altText ?? "").slice(0, 300),
    order:    Number(order) || 0,
  });
  res.status(201).json(item);
});

router.put("/:id", requireSecret, async (req, res) => {
  const { imageUrl, altText, order } = req.body;
  const update = {};
  if (imageUrl !== undefined) update.imageUrl = String(imageUrl).slice(0, 500);
  if (altText  !== undefined) update.altText  = String(altText).slice(0, 300);
  if (order    !== undefined) update.order    = Number(order) || 0;
  const item = await Gallery.findByIdAndUpdate(req.params.id, { $set: update }, { new: true });
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

router.delete("/:id", requireSecret, async (req, res) => {
  await Gallery.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
