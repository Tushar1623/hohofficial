import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: String, default: '' },
  city: { type: String, default: '' },
  tape: { type: String, default: '' },
  bio: { type: String, default: '' },
  instagram: { type: String, default: '' },
  youtube: { type: String, default: '' },
  exp: { type: String, default: 'Audition' },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  timestamp: { type: String, default: () => new Date().toISOString() }
}, { timestamps: true });

export default mongoose.model('Application', applicationSchema);
