import mongoose from "mongoose";

const cookieConsentSchema = new mongoose.Schema({
  type: { type: String, enum: ['all', 'essential', 'revoked'], required: true },
  ip: { type: String },
  userAgent: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('CookieConsent', cookieConsentSchema);
