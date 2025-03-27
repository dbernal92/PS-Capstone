import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  exercises: [
    {
      exerciseName: {
        type: String,
        // required: true,
        index: true
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
      },
      weight: {
        type: Number
      },
      unit: {
        type: String,
        enum: ["lbs", "kg"],
        default: "lbs"
      }
    }
  ]
});

export default mongoose.model('Workout', workoutSchema);
