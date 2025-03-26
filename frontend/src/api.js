const BASE_URL = "http://localhost:4000/api";

export async function getWorkouts() {
    const res = await fetch(`${BASE_URL}/workouts`);
    return res.json();
  }