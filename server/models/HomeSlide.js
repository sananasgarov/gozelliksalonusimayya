import mongoose from "mongoose";

const HomeSlideSchema = new mongoose.Schema({
  title:     { type: String, required: true },
  desc:      { type: String, default: "" },
  imageUrl:  { type: String, default: "" },
  watermark: { type: String, default: "" },
  bg:        { type: String, default: "#d9caea" },
  btnColor:  { type: String, default: "#9b6dff" },
  order:     { type: Number, default: 0 },
});

export default mongoose.model("HomeSlide", HomeSlideSchema);
