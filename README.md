
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

### Notes
- Add entries with a date and a 280-character limit.
- Edit or delete any entry.
- Notes are sorted by date and editable inline.

### Progress Tracker
- Visualize and track metrics (weight, body fat %, etc.) over time.
- Filter entries by week or month.

### Theming System
- Retro Pink 80s Theme
- Light / Dark Mode toggle
- Theme selection persists using localStorage

### Settings
- Set your preferred unit (lbs/kg).
- Switch themes via dropdown.

---

## Current Pages

- **Dashboard** – Overview and summaries (placeholder)
- **Workout Log** – Core functionality to log, edit, and view workouts
- **Notes** – Journal system with editing and delete
- **Progress Tracker** – Visual progress tracking (in progress)
- **Settings** – Choose theme and units

---

## API Endpoints & Technologies Used

### 🛠️ Technologies
- **Node.js** & **Express.js** – For building the RESTful API.
- **MongoDB** & **Mongoose** – For schema modeling and data storage.
- **Fetch API** – Used on the frontend to handle requests to the backend.
- **ExerciseDB API** – For fetching real exercise data based on body part and equipment.

---

### 🏋️ Workout Endpoints

| Method | Endpoint            | Description                       |
|--------|---------------------|-----------------------------------|
| GET    | `/api/workouts`     | Get all saved workouts            |
| POST   | `/api/workouts`     | Save a new workout session        |
| PUT    | `/api/workouts/:id` | Edit an existing workout by ID    |
| DELETE | `/api/workouts/:id` | Delete a workout by ID            |

---

### 📈 Progress Tracker Endpoints

| Method | Endpoint              | Description                          |
|--------|-----------------------|--------------------------------------|
| GET    | `/api/progress`       | Get all progress entries             |
| POST   | `/api/progress`       | Add a new progress entry             |
| PUT    | `/api/progress/:id`   | Update a specific progress entry     |
| DELETE | `/api/progress/:id`   | Delete a progress entry by ID        |

#### Custom Progress Endpoints

| Method | Endpoint                    | Description                          |
|--------|-----------------------------|--------------------------------------|
| GET    | `/api/progress/streak`      | Get current workout streak           |
| GET    | `/api/progress/weekly`      | Get weekly progress breakdown        |
| GET    | `/api/progress/summary`     | Get a summary of recent progress     |

---

### 📝 Notes (Journal) Endpoints

| Method | Endpoint        | Description               |
|--------|------------------|---------------------------|
| GET    | `/api/notes`     | Fetch all notes           |
| POST   | `/api/notes`     | Create a new journal note |
| DELETE | `/api/notes/:id` | Delete a note by ID       |

---

### ⚙️ Frontend Routes

| Path           | Page             | Description                        |
|----------------|------------------|------------------------------------|
| `/`            | Dashboard        | Homepage or summary page           |
| `/workout-log` | Workout Log      | Log and view workout sessions      |
| `/progress`    | Progress Tracker | Visualize body changes over time   |
| `/notes`       | Notes            | Journal entries and reflection     |
| `/settings`    | Settings         | Choose theme and unit preferences  |


---


## Resources Used

1. **React Documentation**
   React is a JavaScript library for building user interfaces.  
   [React Docs](https://reactjs.org/docs/getting-started.html)  

2. **React Router Documentation**
   React Router is used to manage routing in React applications. It helps in navigating between different views or components in the application.
   [React Router Docs](https://reactrouter.com/en/main/start/tutorial)  

4. **Fetch API Documentation**  
   Fetch API used throughout this project to interact with both local and external APIs.
   [Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

6. **Chart.js Documentation**  
   For rendering progress charts in the Progress Tracker.  
   [Chart.js Docs](https://www.chartjs.org/docs/latest/)

7. **ExerciseDB API**  
   Used to fetch exercises dynamically based on selected body part and equipment.
   [ExerciseDB on RapidAPI](https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb)  

---

## Future Features

- Add authentication
- Build full dashboard with analytics
- Add notes and progress tracking views
- Create Quick Log pop-up for workouts
- Additional theming (PlayStation styling, anime character themes}
- Music player connected to streaming services

---

## Author

Darien B.
