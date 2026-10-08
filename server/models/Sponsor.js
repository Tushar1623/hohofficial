import mongoose from 'mongoose';

const sponsorSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  tier: { type: String, default: '' },
  website: { type: String, default: '#' }
}, { timestamps: true });

export default mongoose.model('Sponsor', sponsorSchema);
