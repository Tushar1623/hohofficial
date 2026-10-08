import mongoose from 'mongoose';

const featuredVideoSchema = new mongoose.Schema({
  key: {
    type: String,
    default: 'featured_video',
    unique: true,
    index: true
  },
  title: {
    type: String,
    required: [true, 'Video title is required'],
    trim: true
  },
  youtubeUrl: {
    type: String,
    required: [true, 'YouTube URL is required'],
    trim: true
  },
  thumbnail: {
    type: String,
    default: '',
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  collection: 'featured_videos'
});

export default mongoose.model('FeaturedVideo', featuredVideoSchema, 'featured_videos');
