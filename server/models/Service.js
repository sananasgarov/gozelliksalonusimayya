import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  title:    { type: String, required: true },
  desc:     { type: String, default: "" },
  category: { type: String, enum: ["makeup", "hair", "nail"], required: true },
  imageUrl: { type: String, default: "/servicemarkup.png" },
  order:    { type: Number, default: 0 },
});

export default mongoose.model("Service", ServiceSchema);
