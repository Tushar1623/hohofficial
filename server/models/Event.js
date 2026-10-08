import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  date: { type: String, default: '' },
  time: { type: String, default: '' },
  venue: { type: String, default: '' },
  city: { type: String, default: '' },
  prize: { type: String, default: '₹15,000' },
  prizeLabel: { type: String, default: 'WINNER SPOT PURSE' },
  genCost: { type: Number, default: 399 },
  vipCost: { type: Number, default: 699 },
  seatsLeft: { type: Number, default: 50 },
  totalCapacity: { type: Number, default: 100 },
  targetEpoch: { type: Number, default: 0 },
  published: { type: Boolean, default: true },
  urgencyTag: { type: String, default: 'REGISTRATIONS OPEN' },
  circuitCities: { type: String, default: '' },
  description: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
