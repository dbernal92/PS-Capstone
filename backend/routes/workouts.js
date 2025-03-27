import express from 'express';
import Workout from '../models/Workouts.js'

const workoutRouter = express.Router();

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
        const savedWorkout = await newWorkout.save();
        res.status(201).json(savedWorkout);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

// PUT /api/workouts/:id – Update a workout by ID
workoutRouter.put("/:id", async (req, res) => {
    try {
      const updatedWorkout = await Workout.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
  
      if (!updatedWorkout) {
        return res.status(404).send("Workout not found");
      }
  
      res.json(updatedWorkout);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  });
  
  // DELETE /api/workouts/:id – Delete a workout by ID
workoutRouter.delete("/:id", async (req, res) => {
  try {
    const deletedWorkout = await Workout.findByIdAndDelete(req.params.id);
    if (!deletedWorkout) {
      return res.status(404).send("Workout not found");
    }
    res.json({ message: "Workout deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

  

  workoutRouter.get('/test', (req, res) => {
    res.send("Workout route is working");
  });
  


export default workoutRouter;