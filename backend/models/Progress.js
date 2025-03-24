import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  weight: {
    type: Number
  },
  bodyFatPercentage: {
    type: Number
  },
  notes: {
    type: String
  }
});

export default mongoose.model('Progress', progressSchema);
