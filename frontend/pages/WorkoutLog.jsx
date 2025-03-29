import { useState, useEffect } from 'react';
import { format } from 'date-fns'; // Make sure this is installed: npm install date-fns
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
        const confirmDelete = window.confirm("Are you sure you want to delete this workout?");
        if (!confirmDelete) return;

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

    // Sort workouts by most recent date
    const sortedWorkouts = [...workouts].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    return (
        <div>
            <center><h1>Workout Log</h1></center>

            {/* Workout entry form */}
            <WorkoutCard onSave={handleAddWorkout} editingWorkout={editingWorkout} />

            <h2>Saved Workouts</h2>
            <div className="workout-grid">
                {sortedWorkouts.length === 0 ? (
                    <p>No workouts logged yet.</p>
                ) : (
                    sortedWorkouts.map((workout) => {
                        const workoutDate = new Date(workout.date);
                        const formattedDate = format(workoutDate, "EEEE, MMMM d, yyyy");

                        return (
                            <Card key={workout._id}>
                                <h3>{formattedDate}</h3>

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
                        );
                    })
                )}
            </div>
        </div>);
    }

export default WorkoutLog;