// Handles calls to the backend

const BASE_URL = "http://localhost:4000/api";

// Workouts
export async function getWorkouts() {
    const res = await fetch(`${BASE_URL}/workouts`);
    return res.json();
}

export async function postWorkout(workoutData) {
    const res = await fetch('/api/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workoutData)
    });
    return res.json();
}

// Notes


// Progress


// Theme

