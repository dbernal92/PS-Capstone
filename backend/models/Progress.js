import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
    index: true
  },
  weight: {
    type: Number
  },
  bodyFatPercentage: {
    type: Number
  },
  notes: {
    type: String,
    required: true
  }
});

export default mongoose.model('Progress', progressSchema);

