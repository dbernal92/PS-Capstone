import { useState, useEffect } from "react";
import { getWorkouts } from "../src/api";
import Card from "./Card";
import Input from "./Input";
import Button from "./Button";

function WorkoutCard() {
    const [sets, setSets] = useState("");
    const [reps, setReps] = useState("");
    const [weight, setWeight] = useState("");
    const [unit, setUnit] = useState("lbs");
    const [workouts, setWorkouts] = useState([]);
    const [exercise, setExercise] = useState("Squat");

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getWorkouts();
                console.log("Fetched workouts:", data);
                setWorkouts(data);
            } catch (error) {
                console.error("Error fetching workouts:", error);
            }
        }

        fetchData();
    }, []);

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
        <>
            <h2>Workout Entries</h2>
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
        </>
    );
}

export default WorkoutCard;
