import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  stars:     { type: Number, default: 5, min: 1, max: 5 },
  text:      { type: String, required: true },
  avatarUrl: { type: String, default: "/avatar.png" },
}, { timestamps: true });

export default mongoose.model("Review", ReviewSchema);
