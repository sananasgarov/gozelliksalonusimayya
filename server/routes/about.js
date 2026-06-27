import { Router } from "express";
import AboutSection from "../models/AboutSection.js";
import { requireSecret } from "../middleware/requireSecret.js";

const router = Router();

router.get("/", async (req, res) => {
  let doc = await AboutSection.findById("about");
  if (!doc) doc = await AboutSection.create({ _id: "about" });
  res.json(doc);
});

router.put("/", requireSecret, async (req, res) => {
  const { description, stat1Value, stat1Label, stat2Value, stat2Label, stat3Value, stat3Label } = req.body;
  const update = {};
  if (description !== undefined) update.description = String(description).slice(0, 5000);
  if (stat1Value  !== undefined) update.stat1Value  = String(stat1Value).slice(0, 50);
  if (stat1Label  !== undefined) update.stat1Label  = String(stat1Label).slice(0, 100);
  if (stat2Value  !== undefined) update.stat2Value  = String(stat2Value).slice(0, 50);
  if (stat2Label  !== undefined) update.stat2Label  = String(stat2Label).slice(0, 100);
  if (stat3Value  !== undefined) update.stat3Value  = String(stat3Value).slice(0, 50);
  if (stat3Label  !== undefined) update.stat3Label  = String(stat3Label).slice(0, 100);
  const doc = await AboutSection.findByIdAndUpdate("about", { $set: update }, { new: true, upsert: true });
  res.json(doc);
});

export default router;
