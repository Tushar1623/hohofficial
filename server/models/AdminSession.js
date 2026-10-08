import mongoose from 'mongoose';

const adminSessionSchema = new mongoose.Schema({
  tokenHash: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: 0 } // Document expires at expiresAt
  }
}, {
  timestamps: true,
  collection: 'admin_sessions'
});

export default mongoose.model('AdminSession', adminSessionSchema, 'admin_sessions');
