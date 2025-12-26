import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: String,
  email: { type: String, required: true },
  projectType: { type: String, required: true },
  message: { type: String, required: true },
  privacyAccepted: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Contact", contactSchema);
