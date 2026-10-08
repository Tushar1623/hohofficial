import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  key: { type: String, default: 'site_settings', unique: true },
  siteName: { type: String, default: 'House of Humour' },
  tagline: { type: String, default: "India's Biggest Stand-Up Comedy Talent Hunt" },
  contactNumber: { type: String, default: '+91 98301 22345' },
  email: { type: String, default: 'auditions@houseofhumour.in' },
  instagram: { type: String, default: 'https://instagram.com/houseofhumourofficial' },
  youtube: { type: String, default: 'https://youtube.com/@houseofhumour' },
  adminPasscode: { type: String, default: 'hoh2026' }
}, { timestamps: true });

export default mongoose.model('Settings', settingsSchema);
