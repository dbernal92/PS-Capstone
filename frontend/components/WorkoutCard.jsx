import { useState } from "react";
import Card from "./Card";
import Input from "./Input";
import Button from "./Button";

function WorkoutCard() {
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("lbs");

  // Placeholder — this will be replaced later with API-fetched options
  const [exercise, setExercise] = useState("Squat");

  const toggleUnit = () => {
    setUnit((prev) => (prev === "lbs" ? "kg" : "lbs"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const workoutData = {
      exercise,
      sets,
      reps,
      weight,
      unit,
    };
    console.log("Workout Data:", workoutData);
    // Later you’ll send this to your backend
  };

  return (
    <Card>
      <h2>{exercise}</h2>

      <form onSubmit={handleSubmit}>
        <Input
          label="Sets"
          type="number"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
        />

        <Input
          label="Reps"
          type="number"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />

        <Input
          label={`Weight (${unit})`}
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />

        <Button name={`Switch to ${unit === "lbs" ? "kg" : "lbs"}`} onClick={toggleUnit} />

        <Button type="submit" name="Save Workout" />
      </form>
    </Card>
  );
}

export default WorkoutCard;
