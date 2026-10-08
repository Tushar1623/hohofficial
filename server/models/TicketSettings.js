import mongoose from 'mongoose';

const ticketSettingsSchema = new mongoose.Schema({
  key: {
    type: String,
    default: 'ticket_settings',
    unique: true,
    index: true
  },
  generalPrice: {
    type: Number,
    default: 0
  },
  vipPrice: {
    type: Number,
    default: 0
  },
  bookingUrl: {
    type: String,
    default: '',
    trim: true
  },
  availability: {
    type: String,
    enum: ['OPEN', 'SOLD_OUT', 'COMING_SOON'],
    default: 'OPEN'
  }
}, {
  timestamps: true,
  collection: 'ticket_settings'
});

export default mongoose.model('TicketSettings', ticketSettingsSchema, 'ticket_settings');
