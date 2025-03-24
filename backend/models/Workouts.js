import mongoose from 'mongoose';
const { Schema } = mongoose;

const workoutSchema = new Schema({
    exerciseId: {
        type: String,
        required: true
    },
    exerciseName: {
        type: String,
        required: true
    },
    equipment
})