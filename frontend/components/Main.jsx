import React from 'react';
import WorkoutCard from './WorkoutCard';

const sampleWorkout = {
  date: '2025-03-25',
  exercises: [
    {
      exerciseName: 'Bench Press',
      equipment: 'Barbell',
      sets: 3,
      reps: 10,
      weight: 135
    },
    {
      exerciseName: 'Pull-ups',
      equipment: 'Bodyweight',
      sets: 3,
      reps: 8
    }
  ]
};

const Main = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>WorkoutCard Test</h1>
      <WorkoutCard workout={sampleWorkout} unit="lbs" />
    </div>
  );
};

export default Main;