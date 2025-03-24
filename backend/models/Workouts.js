import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
  exerciseName: {
    type: String,
    required: true
  },
  equipment: {
    type: String,
    required: true
  },
  sets: {
    type: Number,
    required: true
  },
  reps: {
    type: Number,
    required: true
  }
});

export default mongoose.model('Workout', workoutSchema);
