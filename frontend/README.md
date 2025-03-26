# Fitness Tracker App

A full-stack MERN (MongoDB, Express.js, React, Node.js) fitness tracking application built for users to log their workouts with detailed metadata. It includes data fetching from the ExerciseDB API to dynamically populate dropdowns based on body part and equipment.

---

## Features

- **Workout Logging**
  - Add workouts with sets, reps, and weight used.
  - Track exercise name, body part, and equipment used.
- **ExerciseDB API Integration**
  - Dynamically fetches exercise data.
  - Dropdowns filter exercises by selected body part and equipment.
- **Frontend**
  - Built using React with modular components.
  - Responsive layout.
- **Backend**
  - Node.js and Express server.
  - MongoDB stores workout entries.
- **Environment Variables**
  - API keys and sensitive info stored in `.env` file.

---

## Current Pages

- **Workout Log**
  - Add new workouts.
  - View a list of saved workouts.

- **Other Pages (Scaffolded)**
  - Dashboard
  - Notes
  - Progress Tracker
  - Settings

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
```bash
npm install
```

### 2. Create a `.env` file
```env
VITE_EXERCISEDB_API_KEY=your_rapidapi_key_here
```

### 3. Start Backend (PORT 4000 assumed)
```bash
npm run server
```

### 4. Start Frontend
```bash
npm run dev
```

---

## To Do Next

- Add authentication
- Enable workout editing & deletion
- Build full dashboard with analytics
- Add notes and progress tracking views

---

## Credits

- **Exercise API**: [ExerciseDB on RapidAPI](https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb)
- **Built With**: Vite + React + Express + MongoDB

---

## Author

Darien B.

