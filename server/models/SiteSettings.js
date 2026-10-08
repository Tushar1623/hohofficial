import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema({
  key: {
    type: String,
    default: 'site_settings',
    unique: true,
    index: true
  },
  siteName: {
    type: String,
    default: 'House of Humour',
    trim: true
  },
  tagline: {
    type: String,
    default: "India's Biggest Stand-Up Comedy Talent Hunt",
    trim: true
  },
  contactNumber: {
    type: String,
    default: '',
    trim: true
  },
  email: {
    type: String,
    default: '',
    trim: true
  },
  instagram: {
    type: String,
    default: '',
    trim: true
  },
  youtube: {
    type: String,
    default: '',
    trim: true
  }
}, {
  timestamps: true,
  collection: 'site_settings'
});

export default mongoose.model('SiteSettings', siteSettingsSchema, 'site_settings');
