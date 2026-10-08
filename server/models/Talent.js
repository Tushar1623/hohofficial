import mongoose from 'mongoose';

const talentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  rank: { type: String, default: '' },
  name: { type: String, required: true },
  city: { type: String, default: '' },
  zone: { type: String, default: '' },
  category: { type: String, default: '' },
  score: { type: String, default: '' },
  statusLabel: { type: String, default: 'ACTIVE' },
  quote: { type: String, default: '' },
  instagram: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Talent', talentSchema);
