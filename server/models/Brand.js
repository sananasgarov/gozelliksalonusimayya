import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  logoUrl: { type: String, default: "/brand1.png" },
  order:   { type: Number, default: 0 },
});

export default mongoose.model("Brand", BrandSchema);
