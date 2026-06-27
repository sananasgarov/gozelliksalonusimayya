import mongoose from "mongoose";

const legalSectionSchema = new mongoose.Schema({
  pageKey: { type: String, enum: ["terms", "privacy", "booking"], required: true },
  title:   { type: String, default: "" },
  body:    { type: String, default: "" },
  order:   { type: Number, default: 0 },
});

export default mongoose.models.LegalSection ?? mongoose.model("LegalSection", legalSectionSchema);
