import mongoose from "mongoose";

const HeroSchema = new mongoose.Schema({
  _id:        { type: String, default: "hero" },
  title:      { type: String, default: "Where Beauty Meets Elegance" },
  subtitle:   { type: String, default: "Experience refined beauty services crafted for confidence, elegance, and individuality." },
  buttonText: { type: String, default: "Book Now" },
  buttonUrl:  { type: String, default: "sms:+13476127994" },
  videoUrl:   { type: String, default: "/home1.mp4" },
});

export default mongoose.model("HeroSection", HeroSchema);
