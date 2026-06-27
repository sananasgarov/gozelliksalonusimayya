import { Router } from "express";
import HomeSlide from "../models/HomeSlide.js";
import { requireSecret } from "../middleware/requireSecret.js";

const router = Router();

router.get("/", async (req, res) => {
  const slides = await HomeSlide.find().sort({ order: 1 });
  res.json(slides);
});

router.post("/", requireSecret, async (req, res) => {
  const { title, desc, imageUrl, watermark, bg, btnColor, order } = req.body;
  if (!title) return res.status(400).json({ error: "title required" });
  const slide = await HomeSlide.create({
    title:     String(title).slice(0, 100),
    desc:      String(desc ?? "").slice(0, 1000),
    imageUrl:  String(imageUrl ?? "").slice(0, 500),
    watermark: String(watermark ?? "").slice(0, 100),
    bg:        String(bg ?? "#d9caea").slice(0, 20),
    btnColor:  String(btnColor ?? "#9b6dff").slice(0, 20),
    order:     Number(order) || 0,
  });
  res.status(201).json(slide);
});

router.put("/:id", requireSecret, async (req, res) => {
  const { title, desc, imageUrl, watermark, bg, btnColor, order } = req.body;
  const update = {};
  if (title     !== undefined) update.title     = String(title).slice(0, 100);
  if (desc      !== undefined) update.desc      = String(desc).slice(0, 1000);
  if (imageUrl  !== undefined) update.imageUrl  = String(imageUrl).slice(0, 500);
  if (watermark !== undefined) update.watermark = String(watermark).slice(0, 100);
  if (bg        !== undefined) update.bg        = String(bg).slice(0, 20);
  if (btnColor  !== undefined) update.btnColor  = String(btnColor).slice(0, 20);
  if (order     !== undefined) update.order     = Number(order) || 0;

  const slide = await HomeSlide.findByIdAndUpdate(req.params.id, { $set: update }, { new: true });
  if (!slide) return res.status(404).json({ error: "Not found" });
  res.json(slide);
});

router.delete("/:id", requireSecret, async (req, res) => {
  await HomeSlide.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
