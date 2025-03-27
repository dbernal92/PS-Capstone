
# Fitness Tracker App

A full-stack MERN (MongoDB, Express.js, React, Node.js) fitness tracking application where users can log their workouts, track progress, and journal their fitness journey. It includes live data integration with the ExerciseDB API and a custom theming system for a retro-style interface.

---

## Features

### Workout Logging
- Add full workout sessions, each with multiple exercises.
- Record sets, reps, weight, equipment used, and workout date.
- Edit and delete individual exercises before saving a session.
- Edit or delete entire saved workouts.

### ExerciseDB API Integration
- Automatically fetches exercises by selected body part.
- Filters available exercises by equipment.
- Smart dropdowns auto-fill based on selections.

### Notes (Journal)
- Add journal entries with a date and a 280-character limit.
- Edit or delete any entry.
- Notes are sorted by date and editable inline.

### Progress Tracker
- Visualize and track metrics (weight, body fat %, etc.) over time.
- Filter entries by week or month.

### Theming System
- Retro Pink 80s Theme
- Blue PlayStation Retro Theme
- Light / Dark Mode toggle
- Theme selection persists using localStorage

### Settings
- Set your preferred unit (lbs/kg).
- Switch themes via dropdown.
- Accent color picker (coming soon or optional).

---

## Current Pages

- **Dashboard** – Overview and summaries (placeholder)
- **Workout Log** – Core functionality to log, edit, and view workouts
- **Notes** – Journal system with editing and delete
- **Progress Tracker** – Visual progress tracking (in progress)
- **Settings** – Choose theme and units

---

## Folder Structure

```
frontend/
├── components/
│   ├── Button.jsx
│   ├── Card.jsx
│   ├── Input.jsx
│   └── WorkoutCard.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── Notes.jsx
│   ├── ProgressTracker.jsx
│   ├── Settings.jsx
│   └── WorkoutLog.jsx
├── api/
│   ├── exerciseDB.js     // handles external API
│   └── api.js            // local API config
├── App.jsx
├── index.css
└── main.jsx

backend/
├── models/
├── routes/
├── controllers/
└── server.js
```

---

## Getting Started

### 1. Install Dependencies
```
npm install
```

### 2. Create a `.env` file
```env
VITE_EXERCISEDB_API_KEY=your_rapidapi_key_here
```

### 3. Start Backend (PORT 4000 assumed)
```
npm run dev
```

### 4. Start Frontend
```
npm run dev
```

---

## Resources Used

1. **React Documentation**  
   Link: [React Docs](https://reactjs.org/docs/getting-started.html)  

2. **React Router Documentation**  
   Link: [React Router Docs](https://reactrouter.com/en/main/start/tutorial)  

3. **Fetch API Documentation**  
   Link: [Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

4. **Chart.js Documentation**  
   For rendering progress charts in the Progress Tracker.  
   [Chart.js Docs](https://www.chartjs.org/docs/latest/)

5. **ExerciseDB API**  
   Link: [ExerciseDB on RapidAPI](https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb)  

---

## To Do Next

- Add authentication
- Build full dashboard with analytics
- Add notes and progress tracking views

---

## Author

Darien B.
