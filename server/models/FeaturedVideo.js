import mongoose from 'mongoose';

const featuredVideoSchema = new mongoose.Schema({
  key: { type: String, default: 'featured_video', unique: true },
  title: { type: String, required: true },
  youtubeUrl: { type: String, required: true },
  thumbnail: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('FeaturedVideo', featuredVideoSchema);
