import mongoose from 'mongoose';
const { Schema } = mongoose;

const workoutSchema = new Schema({
    exerciseName: {
        type: String,
        required: true
    },
    equipment: {
        type: String,
        required: true
    },
    gifURL: {
        type: String,
        // required: true
    },
    target: {
        type: String,
        // required: true
    },
    sets: {
        type: Number,
        // required: true
    },
    reps: {
        type: Number,
        // required: true
    },
    weight: {
        type: Number,
        // required: true
    },
    date: {
        type: Number,
        default: Date.now
    },
    notes: {
        type: String
    }
})

export default mongoose.model('Workout', workoutSchema);