  export async function fetchExercises() {
    const url = 'https://exercisedb.p.rapidapi.com/exercises';
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
  