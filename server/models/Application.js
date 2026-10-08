import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  applicationId: {
    type: String,
    required: [true, 'Application ID is required'],
    unique: true,
    trim: true,
    index: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    index: true
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    trim: true,
    lowercase: true,
    index: true
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  performanceVideo: {
    type: String,
    required: [true, 'Performance video URL is required'],
    trim: true
  },
  shortIntroduction: {
    type: String,
    required: [true, 'Short introduction is required'],
    trim: true
  },
  instagram: {
    type: String,
    default: '',
    trim: true
  },
  youtube: {
    type: String,
    default: '',
    trim: true
  },
  experience: {
    type: String,
    default: '',
    trim: true
  },
  status: {
    type: String,
    enum: {
      values: ['PENDING', 'SHORTLISTED', 'APPROVED', 'REJECTED'],
      message: '{VALUE} is not a valid status'
    },
    default: 'PENDING',
    index: true
  }
}, {
  timestamps: true,
  collection: 'applications',
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
applicationSchema.index({ createdAt: -1 });

// Virtual aliases for clean compatibility
applicationSchema.virtual('id').get(function () { return this.applicationId; });
applicationSchema.virtual('tape').get(function () { return this.performanceVideo; });
applicationSchema.virtual('bio').get(function () { return this.shortIntroduction; });
applicationSchema.virtual('exp').get(function () { return this.experience; });

export default mongoose.model('Application', applicationSchema, 'applications');
