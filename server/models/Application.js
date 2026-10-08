import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  city: { type: String, required: true },
  tape: { type: String, required: true }, // Performance video URL
  bio: { type: String, required: true },  // Short introduction
  instagram: { type: String, default: '' },
  youtube: { type: String, default: '' },
  exp: { type: String, default: '' },
  status: {
    type: String,
    enum: ['PENDING', 'SHORTLISTED', 'APPROVED', 'REJECTED'],
    default: 'PENDING'
  },
  timestamp: { type: String, default: () => new Date().toISOString() }
}, { timestamps: true });

export default mongoose.model('Application', applicationSchema);
