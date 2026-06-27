import { Router } from "express";
import FaqItem from "../models/FaqItem.js";
import { requireSecret } from "../middleware/requireSecret.js";

const router = Router();

router.get("/", async (req, res) => {
  const items = await FaqItem.find().sort({ order: 1 });
  res.json(items);
});

router.post("/", requireSecret, async (req, res) => {
  const { question, answer, order } = req.body;
  if (!question || !answer) return res.status(400).json({ error: "question and answer required" });
  const item = await FaqItem.create({
    question: String(question).slice(0, 500),
    answer:   String(answer).slice(0, 3000),
    order:    Number(order) || 0,
  });
  res.status(201).json(item);
});

router.put("/:id", requireSecret, async (req, res) => {
  const { question, answer, order } = req.body;
  const update = {};
  if (question !== undefined) update.question = String(question).slice(0, 500);
  if (answer   !== undefined) update.answer   = String(answer).slice(0, 3000);
  if (order    !== undefined) update.order    = Number(order) || 0;
  const item = await FaqItem.findByIdAndUpdate(req.params.id, { $set: update }, { new: true });
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

router.delete("/:id", requireSecret, async (req, res) => {
  await FaqItem.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
