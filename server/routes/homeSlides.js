import { Router } from "express";
import HomeSlide from "../models/HomeSlide.js";
import { requireSecret } from "../middleware/requireSecret.js";

const router = Router();

const HEX_COLOR = /^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/;
function validColor(val, fallback) {
  const s = String(val ?? fallback);
  return HEX_COLOR.test(s) ? s : fallback;
}

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
    bg:        validColor(bg, "#d9caea"),
    btnColor:  validColor(btnColor, "#9b6dff"),
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
  if (bg        !== undefined) update.bg        = validColor(bg, "#d9caea");
  if (btnColor  !== undefined) update.btnColor  = validColor(btnColor, "#9b6dff");
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
