import mongoose from "mongoose";

const WorkHourSchema = new mongoose.Schema({
  day:       { type: String, required: true },
  openTime:  { type: String, required: true },
  closeTime: { type: String, required: true },
  order:     { type: Number, default: 0 },
});

export default mongoose.model("WorkHour", WorkHourSchema);
