import mongoose from 'mongoose';

const themeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  mode: {
    type: String,
    enum: ['light', 'dark'],
    required: true
  },
  accentColor: {
    type: String
  }
});

export default mongoose.model('Theme', themeSchema);
