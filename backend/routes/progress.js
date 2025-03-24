import express from 'express';
import Progress from '../models/Progress.js';

const progressRouter = express.Router();

// GET - All progress entries
progressRouter.get('/', async (req, res) => {
    try {
        const progress = await Progress.find();
        res.json(progress);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET - One entry by ID
progressRouter.get('/:id', async (req, res) => {
    try {
        const progress = await Progress.findById(req.params.id);
        if (!progress) return res.status(404).send('Journal entry not found');
        res.json(progress);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// POST - Create new entry
progressRouter.post("/", async (req, res) => {

    try {
        const newProgress = new Progress(req.body);
        const savedProgress = await newProgress.save();
        res.status(201).json(savedProgress);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

// PUT /api/progress/:id – Update a workout by ID
progressRouter.put("/:id", async (req, res) => {
    try {
      const updatedProgress = await Progress.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
  
      if (!updatedProgress) {
        return res.status(404).send("Journal not found");
      }
  
      res.json(updatedProgress);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  });
  
  // DELETE /api/progress/:id – Delete a workout by ID
progressRouter.delete("/:id", async (req, res) => {
    try {
      const deletedProgress = await Progress.findByIdAndDelete(req.params.id);
  
      if (!deletedProgress) {
        return res.status(404).send("Journal entry not found");
      }
  
      res.json({ message: "Journal entry deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  });

export default progressRouter;