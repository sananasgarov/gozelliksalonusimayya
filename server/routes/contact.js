import { Router } from "express";
import ContactInfo from "../models/ContactInfo.js";
import WorkHour from "../models/WorkHour.js";
import { requireSecret } from "../middleware/requireSecret.js";

const router = Router();

router.get("/", async (req, res) => {
  let info = await ContactInfo.findById("contact");
  if (!info) info = await ContactInfo.create({ _id: "contact" });
  const hours = await WorkHour.find().sort({ order: 1 });
  res.json({ info, hours });
});

router.put("/info", requireSecret, async (req, res) => {
  const { phone, phoneHref, email, address, mapUrl, instagram, tiktok, facebook } = req.body;
  const update = {};
  if (phone     !== undefined) update.phone     = String(phone).slice(0, 50);
  if (phoneHref !== undefined) update.phoneHref = String(phoneHref).slice(0, 200);
  if (email     !== undefined) update.email     = String(email).slice(0, 200);
  if (address   !== undefined) update.address   = String(address).slice(0, 300);
  if (mapUrl    !== undefined) update.mapUrl    = String(mapUrl).slice(0, 500);
  if (instagram !== undefined) update.instagram = String(instagram).slice(0, 200);
  if (tiktok    !== undefined) update.tiktok    = String(tiktok).slice(0, 200);
  if (facebook  !== undefined) update.facebook  = String(facebook).slice(0, 200);
  const doc = await ContactInfo.findByIdAndUpdate("contact", { $set: update }, { new: true, upsert: true });
  res.json(doc);
});

router.post("/hours", requireSecret, async (req, res) => {
  const { day, openTime, closeTime, order } = req.body;
  if (!day) return res.status(400).json({ error: "day required" });
  const item = await WorkHour.create({
    day:       String(day).slice(0, 50),
    openTime:  String(openTime ?? "").slice(0, 20),
    closeTime: String(closeTime ?? "").slice(0, 20),
    order:     Number(order) || 0,
  });
  res.status(201).json(item);
});

router.put("/hours/:id", requireSecret, async (req, res) => {
  const { day, openTime, closeTime, order } = req.body;
  const update = {};
  if (day       !== undefined) update.day       = String(day).slice(0, 50);
  if (openTime  !== undefined) update.openTime  = String(openTime).slice(0, 20);
  if (closeTime !== undefined) update.closeTime = String(closeTime).slice(0, 20);
  if (order     !== undefined) update.order     = Number(order) || 0;
  const item = await WorkHour.findByIdAndUpdate(req.params.id, { $set: update }, { new: true });
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

router.delete("/hours/:id", requireSecret, async (req, res) => {
  await WorkHour.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
