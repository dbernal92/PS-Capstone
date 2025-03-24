import express from 'express';
import Workout from '../models/Workouts.js'

export const workoutRouter = express.Router();

// GET - Get all workouts
workoutRouter.get('/', async (req, res) => {
    try {
        const workout = await Workout.find();
        res.json(workout);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// GET /api/workout/:id return workout by id
workoutRouter.get("/:id", async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);

        if (!workout) {
            return res.status(404).send("Workout not found");
        }
        res.json(workout)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});

// POST /api/workout create a new workout
workoutRouter.post("/", async (req, res) => {

    try {
        const newWorkout = new Workout(req.body);
        await newWorkout.save();
        res.status(201).json(newWorkout);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});


// POST - Add a new workout
// PUT - Update a workout
// DELETE - Delete a workout