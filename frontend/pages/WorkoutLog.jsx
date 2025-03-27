import { useState, useEffect } from 'react';
import WorkoutCard from '../components/WorkoutCard';
import Card from '../components/Card';
import { getWorkouts } from '../src/api';


function WorkoutLog() {
    const [workouts, setWorkouts] = useState([]);
    const [editingWorkout, setEditingWorkout] = useState(null);

    useEffect(() => {
        async function fetchWorkouts() {
            try {
                const data = await getWorkouts();
                setWorkouts(data);
            } catch (err) {
                console.error("Failed to fetch workouts:", err);
            }
        }
        fetchWorkouts();
    }, []);

    const handleAddWorkout = (newWorkout) => {
        if (editingWorkout && editingWorkout._id) {
            setWorkouts((prev) =>
                prev.map((w) => (w._id === newWorkout._id ? newWorkout : w))
            );
            setEditingWorkout(null);
        } else {
            setWorkouts([newWorkout, ...workouts]);
        }
    };

    const handleDeleteWorkout = async (id) => {
        try {
            await fetch(`http://localhost:4000/api/workouts/${id}`, {
                method: "DELETE",
            });
            setWorkouts((prev) => prev.filter((w) => w._id !== id));
        } catch (err) {
            console.error("Failed to delete workout:", err);
        }
    };


    const handleEditClick = (workout) => {
        setEditingWorkout(workout);
    };

    return (
        <div>
            <h1>Workout Log</h1>

            {/* Workout entry form */}
            <WorkoutCard onSave={handleAddWorkout} editingWorkout={editingWorkout} />

            <h2>Saved Workouts</h2>
            {workouts.length === 0 ? (
                <p>No workouts logged yet.</p>
            ) : (
                workouts.map((workout, index) => (
                    <Card key={workout._id || index}>
                        <h3>Workout {index + 1} – {new Date(workout.date).toLocaleDateString()}</h3>

                        {workout.exercises.map((ex, i) => (
                            <div key={i} style={{ marginBottom: '1rem' }}>
                                <strong>{ex.exerciseName}</strong>
                                <p>Equipment: {ex.equipment}</p>
                                <p>Sets: {ex.sets}</p>
                                <p>Reps: {ex.reps}</p>
                            </div>
                        ))}

                        <button onClick={() => handleEditClick(workout)}>Edit</button>
                        <button onClick={() => handleDeleteWorkout(workout._id)} style={{ marginLeft: '0.5rem' }}>
                            Delete
                        </button>
                    </Card>
                ))
            )}
        </div>
    );
}

export default WorkoutLog;