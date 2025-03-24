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

  // GET /api/progress/summary – Summary of all progress
progressRouter.get('/summary', async (req, res) => {
    try {
      const entries = await Progress.find();
  
      if (!entries.length) return res.status(404).json({ message: 'No progress entries found' });
  
      const totalEntries = entries.length;
      const avgWeight = entries.reduce((sum, e) => sum + (e.weight || 0), 0) / totalEntries;
      const avgBodyFat = entries.reduce((sum, e) => sum + (e.bodyFatPercentage || 0), 0) / totalEntries;
  
      res.json({
        totalEntries,
        averageWeight: Number(avgWeight.toFixed(1)),
        averageBodyFatPercentage: Number(avgBodyFat.toFixed(1))
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  
  // GET /api/progress/streak – Count of consecutive days with entries
  progressRouter.get('/streak', async (req, res) => {
    try {
      const entries = await Progress.find().sort({ date: -1 });
  
      if (!entries.length) return res.json({ streak: 0 });
  
      let streak = 1;
      for (let i = 1; i < entries.length; i++) {
        const diffInDays = Math.floor((entries[i - 1].date - entries[i].date) / (1000 * 60 * 60 * 24));
        if (diffInDays === 1) {
          streak++;
        } else if (diffInDays > 1) {
          break;
        }
      }
  
      res.json({ streak });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  
  // GET /api/progress/weekly – Entries from current week (Mon–Sun)
  progressRouter.get('/weekly', async (req, res) => {
    try {
      const now = new Date();
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Monday
      startOfWeek.setHours(0, 0, 0, 0);
  
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);
  
      const weeklyEntries = await Progress.find({
        date: { $gte: startOfWeek, $lte: endOfWeek }
      });
  
      res.json({ count: weeklyEntries.length, entries: weeklyEntries });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  

export default progressRouter;