// List available body parts from ExerciseDB API
export async function fetchBodyParts() {
    const url = 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': import.meta.env.VITE_EXERCISEDB_API_KEY,
            'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching exercises:", error);
        return [];
    }
}

// Get exercises by selected body part
export async function fetchExercisesByBodyPart(part) {
    const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${part}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': import.meta.env.VITE_EXERCISEDB_API_KEY,
            'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
        }
    };

    try {
        const res = await fetch(url, options);
        return await res.json();
    } catch (err) {
        console.error("Error fetching exercises by body part:", err);
        return [];
    }
}

export async function getWorkouts() {
    const response = await fetch('http://localhost:4000/api/workouts');
    if (!response.ok) throw new Error("Failed to fetch workouts");
    return await response.json();
  }