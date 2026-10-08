import mongoose from 'mongoose';

const sponsorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Sponsor name is required'],
    trim: true
  },
  logo: {
    type: String,
    default: '',
    trim: true
  },
  website: {
    type: String,
    default: '',
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  sortOrder: {
    type: Number,
    default: 0,
    index: true
  }
}, {
  timestamps: true,
  collection: 'sponsors',
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

sponsorSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

export default mongoose.model('Sponsor', sponsorSchema, 'sponsors');
