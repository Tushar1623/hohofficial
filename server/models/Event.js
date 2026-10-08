import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  city: { type: String, required: true },
  venue: { type: String, required: true },
  dateTime: { type: String, required: true },
  prize: { type: String, default: '₹20,000' },
  generalPrice: { type: Number, default: 399 },
  vipPrice: { type: Number, default: 699 },
  bookingUrl: { type: String, default: '' },
  published: { type: Boolean, default: true },
  status: {
    type: String,
    enum: ['UPCOMING', 'LIVE', 'COMPLETED'],
    default: 'UPCOMING'
  },
  description: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
