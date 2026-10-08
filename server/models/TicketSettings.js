import mongoose from 'mongoose';

const ticketSettingsSchema = new mongoose.Schema({
  key: { type: String, default: 'ticket_settings', unique: true },
  generalPrice: { type: Number, default: 399 },
  vipPrice: { type: Number, default: 699 },
  bookingUrl: { type: String, default: '' },
  availability: { type: String, default: 'OPEN' }
}, { timestamps: true });

export default mongoose.model('TicketSettings', ticketSettingsSchema);
