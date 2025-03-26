import { useState, useEffect } from "react";
import Card from "./Card";
import Input from "./Input";
import Button from "./Button";
import { fetchExercises } from "../src/api/exerciseDB";

function WorkoutCard({ onSave }) {
    const [exercises, setExercises] = useState([]);
    const [filteredExercises, setFilteredExercises] = useState([]);
    const [selectedExercise, setSelectedExercise] = useState("");
    const [bodyParts, setBodyParts] = useState([]);
    const [selectedBodyPart, setSelectedBodyPart] = useState("");
    const [equipmentOptions, setEquipmentOptions] = useState([]);
    const [equipment, setEquipment] = useState("");
    const [selectedEquipment, setSelectedEquipment] = useState("");
    const [sets, setSets] = useState("");
    const [reps, setReps] = useState("");
    const [weight, setWeight] = useState("");
    const [unit, setUnit] = useState("lbs");

    // Fetch exercises
    useEffect(() => {
        async function loadExercises() {
            try {
                const data = await fetchExercises();
                setExercises(data);

                const uniqueBodyParts = [...new Set(data.map(ex => ex.bodyPart))];
                const uniqueEquipment = [...new Set(data.map(ex => ex.equipment))];
                setBodyParts(uniqueBodyParts);
                setEquipmentOptions(uniqueEquipment);
            } catch (error) {
                console.error("Failed to fetch exercises:", error);
            }
        }

        loadExercises();
    }, []);

    // Filtering logic
    useEffect(() => {
        const filtered = exercises.filter((ex) => {
            return (
                (!selectedBodyPart || ex.bodyPart === selectedBodyPart) &&
                (!selectedEquipment || ex.equipment === selectedEquipment)
            );
        });

        setFilteredExercises(filtered);
        if (filtered.length > 0) setSelectedExercise(filtered[0].name); // default
    }, [selectedBodyPart, selectedEquipment, exercises]);

    const handleExerciseChange = (e) => {
        const name = e.target.value;
        setSelectedExercise(name);
        const match = exercises.find((ex) => ex.name === name);
        if (match) setEquipment(match.equipment || "");
    };

    const toggleUnit = () => {
        setUnit((prev) => (prev === "lbs" ? "kg" : "lbs"));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const workoutData = {
            exerciseName: selectedExercise,
            equipment,
            sets,
            reps,
            weight,
            unit,
        };
        if (onSave) onSave(workoutData);
    }

    return (
        <>
            <h2>Workout Entries</h2>
            <Card>
                <h2>{selectedExercise || "Choose an exercise"}</h2>
                <form onSubmit={handleSubmit}>
                    {/* Equipment Dropdown */}
                    <label>
                        Equipment:
                        <select value={selectedEquipment} onChange={(e) => setSelectedEquipment(e.target.value)}>
                            <option value="">-- All --</option>
                            {equipmentOptions.map((eq) => (
                                <option key={eq} value={eq}>{eq}</option>
                            ))}
                        </select>
                    </label>

                    {/* Filtered Exercise Dropdown */}
                    <label>
                        Exercise:
                        <select value={selectedExercise} onChange={handleExerciseChange}>
                            <option value="">-- Select --</option>
                            {filteredExercises.map((ex) => (
                                <option key={ex.id} value={ex.name}>{ex.name}</option>
                            ))}
                        </select>
                    </label>

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
