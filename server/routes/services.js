import { Router } from "express";
import Service from "../models/Service.js";
import { requireSecret } from "../middleware/requireSecret.js";

const ALLOWED_CATEGORIES = new Set(["makeup", "hair", "nail"]);
const router = Router();

router.get("/", async (req, res) => {
  const cat = req.query.category;
  const filter = cat && ALLOWED_CATEGORIES.has(String(cat)) ? { category: String(cat) } : {};
  const items = await Service.find(filter).sort({ order: 1 });
  res.json(items);
});

router.post("/", requireSecret, async (req, res) => {
  const { title, desc, category, imageUrl, order } = req.body;
  if (!title) return res.status(400).json({ error: "title required" });
  if (!ALLOWED_CATEGORIES.has(String(category ?? ""))) {
    return res.status(400).json({ error: "Invalid category" });
  }
  const item = await Service.create({
    title:    String(title).slice(0, 200),
    desc:     String(desc ?? "").slice(0, 1000),
    category: String(category),
    imageUrl: String(imageUrl ?? "").slice(0, 500),
    order:    Number(order) || 0,
  });
  res.status(201).json(item);
});

router.put("/:id", requireSecret, async (req, res) => {
  const { title, desc, category, imageUrl, order } = req.body;
  const update = {};
  if (title    !== undefined) update.title    = String(title).slice(0, 200);
  if (desc     !== undefined) update.desc     = String(desc).slice(0, 1000);
  if (imageUrl !== undefined) update.imageUrl = String(imageUrl).slice(0, 500);
  if (order    !== undefined) update.order    = Number(order) || 0;
  if (category !== undefined) {
    if (!ALLOWED_CATEGORIES.has(String(category))) {
      return res.status(400).json({ error: "Invalid category" });
    }
    update.category = String(category);
  }
  const item = await Service.findByIdAndUpdate(req.params.id, { $set: update }, { new: true });
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

router.delete("/:id", requireSecret, async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
