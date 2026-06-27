import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema({
  _id:         { type: String, default: "about" },
  description: { type: String, default: "" },
  stat1Value:  { type: String, default: "5+" },
  stat1Label:  { type: String, default: "Years of Experience" },
  stat2Value:  { type: String, default: "95%" },
  stat2Label:  { type: String, default: "Client Satisfaction" },
  stat3Value:  { type: String, default: "250+" },
  stat3Label:  { type: String, default: "Appointments" },
  photo1Url:   { type: String, default: "" },
  photo2Url:   { type: String, default: "" },
  photo3Url:   { type: String, default: "" },
});

export default mongoose.model("AboutSection", AboutSchema);
