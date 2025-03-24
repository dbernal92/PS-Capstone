import express from 'express';
import Workout from '../models/Workouts.js';
import Progress from '../models/Progress.js';
import Note from '../models/Notes.js';
import Theme from '../models/Theme.js';

const dashboardRouter = express.Router();

// GET /api/dashboard – Combined overview
dashboardRouter.get('/', async (req, res) => {
  try {
    // Latest workout
    const recentWorkout = await Workout.findOne().sort({ _id: -1 });

    // Latest note
    const latestNote = await Note.findOne().sort({ _id: -1 });

    // Current streak
    const entries = await Progress.find().sort({ date: -1 });
    let streak = 0;
    if (entries.length > 0) {
      streak = 1;
      for (let i = 1; i < entries.length; i++) {
        const diffInDays = Math.floor((entries[i - 1].date - entries[i].date) / (1000 * 60 * 60 * 24));
        if (diffInDays === 1) {
          streak++;
        } else if (diffInDays > 1) {
          break;
        }
      }
    }

    // This week's entries
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Monday
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const weeklyProgress = await Progress.find({
      date: { $gte: startOfWeek, $lte: endOfWeek }
    });

    // Theme (optional)
    const theme = await Theme.findOne();

    res.json({
      streak,
      recentWorkout,
      latestNote,
      weeklyProgress: {
        count: weeklyProgress.length,
        entries: weeklyProgress
      },
      theme: theme || null
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong loading the dashboard.');
  }
});

export default dashboardRouter;
