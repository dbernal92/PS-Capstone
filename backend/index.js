import dotenv from 'dotenv'; // Env config
dotenv.config();
import express from 'express'; // Core imports
import mongoose from 'mongoose';
import morgan from 'morgan'; // Middleware
import helmet from 'helmet';
import cors from 'cors';

// Routers
import { healthRouter } from './routes/health.js';
import dashboardRouter from './routes/dashboard.js';
import workoutRouter from './routes/workouts.js';
import progressRouter from './routes/progress.js';
import notesRouter from './routes/notes.js';
import themeRouter from './routes/theme.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
await mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((e) => console.error(e));

// View Engine
app.set('views', './views');
app.set('view engine', 'pug');

// Middlewares
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

// Base Route
app.get('/', (req, res) => {
  res.render('index');
});

// API routes

app.options('*', cors());
app.use('/api/health', healthRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/workouts', workoutRouter);
app.use('/api/progress', progressRouter);
app.use('/api/notes', notesRouter)
app.use('/api/theme', themeRouter);

// Global Error Handling
app.use((err, _req, res, next) => {
  res.status(500).send('Seems like we messed up somewhere...');
});

// Start server
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));