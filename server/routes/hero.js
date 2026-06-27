import { Router } from "express";
import HeroSection from "../models/HeroSection.js";
import { requireSecret } from "../middleware/requireSecret.js";

const router = Router();

router.get("/", async (req, res) => {
  let doc = await HeroSection.findById("hero");
  if (!doc) doc = await HeroSection.create({ _id: "hero" });
  res.json(doc);
});

router.put("/", requireSecret, async (req, res) => {
  const { title, subtitle, buttonText, buttonUrl, videoUrl } = req.body;
  const update = {};
  if (title      !== undefined) update.title      = String(title).slice(0, 200);
  if (subtitle   !== undefined) update.subtitle   = String(subtitle).slice(0, 500);
  if (buttonText !== undefined) update.buttonText = String(buttonText).slice(0, 100);
  if (buttonUrl  !== undefined) update.buttonUrl  = String(buttonUrl).slice(0, 500);
  if (videoUrl   !== undefined) update.videoUrl   = String(videoUrl).slice(0, 500);
  const doc = await HeroSection.findByIdAndUpdate("hero", { $set: update }, { new: true, upsert: true });
  res.json(doc);
});

export default router;
