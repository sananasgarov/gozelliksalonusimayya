import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  _id:       { type: String, default: "contact" },
  phone:     { type: String, default: "347-612-7994" },
  phoneHref: { type: String, default: "tel:+13476127994" },
  email:     { type: String, default: "samiyya@gmail.com" },
  address:   { type: String, default: "4624 Chatsworth Ave zip 15207, Pennsylvania, Pittsburgh" },
  mapUrl:    { type: String, default: "https://maps.google.com/?q=4624+Chatsworth+Ave+Pittsburgh+PA+15207" },
  instagram: { type: String, default: "https://www.instagram.com/samiyya.studio" },
  tiktok:    { type: String, default: "https://www.tiktok.com/@samiyya.studio" },
  facebook:  { type: String, default: "https://www.facebook.com/samiyya.studio" },
});

export default mongoose.model("ContactInfo", ContactSchema);
