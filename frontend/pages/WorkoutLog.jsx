import { useState } from 'react';
import WorkoutCard from '../components/WorkoutCard';
import Card from '../components/Card';

function WorkoutLog() {
    const [workouts, setWorkouts] = useState([]);

    const handleAddWorkout = (newWorkout) => {
        setWorkouts([newWorkout, ...workouts]);
    };

    return (
        <div>
            <h1>Workout Log</h1>

            {/* Workout entry form */}
            <WorkoutCard onSave={handleAddWorkout} />

            <h2>Saved Workouts</h2>
            {workouts.length === 0 ? (
                <p>No workouts logged yet.</p>
            ) : (
                workouts.map((workout, index) => (
                    <Card key={index}>
                        <h3>{workout.exerciseName}</h3>
                        <p>Equipment: {workout.equipment}</p>
                        <p>Sets: {workout.sets}</p>
                        <p>Reps: {workout.reps}</p>
                    </Card>

                ))
            )}
        </div>
    );
}

export default WorkoutLog;