import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  eventId: {
    type: String,
    required: [true, 'Event ID is required'],
    unique: true,
    trim: true,
    index: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  venue: {
    type: String,
    required: [true, 'Venue is required'],
    trim: true
  },
  dateTime: {
    type: String,
    required: [true, 'Date and time is required'],
    trim: true,
    index: true
  },
  prize: {
    type: String,
    default: '',
    trim: true
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
  description: {
    type: String,
    default: '',
    trim: true
  },
  status: {
    type: String,
    enum: {
      values: ['UPCOMING', 'LIVE', 'COMPLETED'],
      message: '{VALUE} is not a valid event status'
    },
    default: 'UPCOMING',
    index: true
  },
  published: {
    type: Boolean,
    default: true,
    index: true
  }
}, {
  timestamps: true,
  collection: 'events',
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual alias
eventSchema.virtual('id').get(function () { return this.eventId; });

export default mongoose.model('Event', eventSchema, 'events');
