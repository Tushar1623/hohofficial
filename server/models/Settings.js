import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  key: { type: String, default: 'site_settings', unique: true },
  siteName: { type: String, default: 'House of Humour' },
  tagline: { type: String, default: "India's Biggest Stand-Up Comedy Talent Hunt" },
  contactEmail: { type: String, default: 'auditions@houseofhumour.in' },
  supportPhone: { type: String, default: '+91 98301 22345' },
  circuitCities: { type: String, default: 'Kolkata, Mumbai, Delhi NCR, Bengaluru, Pune' },
  auditionStatus: { type: String, default: 'OPEN' },
  adminPasscode: { type: String, default: 'hoh2026' }
}, { timestamps: true });

export default mongoose.model('Settings', settingsSchema);
