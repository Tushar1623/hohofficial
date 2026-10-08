import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  key: { type: String, default: 'site_settings', unique: true },
  siteName: { type: String, default: 'House of Humour' },
  tagline: { type: String, default: "India's Biggest Stand-Up Comedy Talent Hunt" },
  contactNumber: { type: String, default: '' },
  email: { type: String, default: '' },
  instagram: { type: String, default: '' },
  youtube: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Settings', settingsSchema);
