import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  tag: { type: String, default: '' },
  category: { type: String, default: 'Chapter Showcase' },
  duration: { type: String, default: '' },
  youtubeUrl: { type: String, required: true },
  youtubeId: { type: String, default: '' },
  thumbnail: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Video', videoSchema);
