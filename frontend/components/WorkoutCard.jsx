import { useState, useEffect } from "react";
import Card from "./Card";
import Input from "./Input";
import Button from "./Button";
import { fetchBodyParts, fetchExercisesByBodyPart } from "../src/api/exerciseDB"

function WorkoutCard({ onSave }) {
    const [exercises, setExercises] = useState([]);
    const [filteredExercises, setFilteredExercises] = useState([]);

    const [bodyParts, setBodyParts] = useState([]);
    const [selectedBodyPart, setSelectedBodyPart] = useState("");

    const [equipmentOptions, setEquipmentOptions] = useState([]);
    const [selectedEquipment, setSelectedEquipment] = useState("");

    const [selectedExercise, setSelectedExercise] = useState("");

    const [sets, setSets] = useState("");
    const [reps, setReps] = useState("");
    const [weight, setWeight] = useState("");
    const [unit, setUnit] = useState("lbs");

    // Fetch exercises
    useEffect(() => {
        async function loadBodyParts() {
            const parts = await fetchBodyParts();
            console.log("Fetched body parts:", parts);
            setBodyParts(parts);
        }
        loadBodyParts();
    }, []);

    // Filtering logic
    useEffect(() => {
        async function loadExercises() {
            if (!selectedBodyPart) return;

            const data = await fetchExercisesByBodyPart(selectedBodyPart);
            setExercises(data);

            // Extract unique equipment from the results
            const equipmentSet = [...new Set(data.map(ex => ex.equipment))];
            setEquipmentOptions(equipmentSet);
            setSelectedEquipment(""); // reset equipment
            setFilteredExercises([]); // clear filtered list
            setSelectedExercise(""); // reset exercise
        }

        loadExercises();
    }, [selectedBodyPart]);

    useEffect(() => {
        if (!selectedEquipment) {
            setFilteredExercises([]);
            return;
        }

        const filtered = exercises.filter(ex => ex.equipment === selectedEquipment);
        setFilteredExercises(filtered);
        setSelectedExercise(filtered[0]?.name || "");
    }, [selectedEquipment]);


    // const handleExerciseChange = (e) => {
    //     const name = e.target.value;
    //     setSelectedExercise(name);
    //     const match = exercises.find((ex) => ex.name === name);
    //     if (match) setEquipment(match.equipment || "");
    // };

    const toggleUnit = () => {
        setUnit((prev) => (prev === "lbs" ? "kg" : "lbs"));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const matched = filteredExercises.find((ex) => ex.name === selectedExercise);
        const finalEquipment = matched?.equipment || selectedEquipment;

        const workoutData = {
            exerciseName: selectedExercise,
            equipment: finalEquipment,
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
                <form onSubmit={handleSubmit}>
                    <label>Body Part</label>
                    <select
                        value={selectedBodyPart}
                        onChange={(e) => setSelectedBodyPart(e.target.value)}
                    >
                        <option value="">Select a body part</option>
                        {Array.isArray(bodyParts) && bodyParts.map((part) => (
                            <option key={part} value={part}>
                                {part}
                            </option>
                        ))}
                    </select>

                    {equipmentOptions.length > 0 && (
                        <>
                            <label>Equipment</label>
                            <select value={selectedEquipment} onChange={(e) => setSelectedEquipment(e.target.value)}>
                                <option value="">Select equipment</option>
                                {equipmentOptions.map((eq) => (
                                    <option key={eq} value={eq}>{eq}</option>
                                ))}
                            </select>
                        </>
                    )}

                    {filteredExercises.length > 0 && (
                        <>
                            <label>Exercise</label>
                            <select value={selectedExercise} onChange={(e) => setSelectedExercise(e.target.value)}>
                                {filteredExercises.map((exercise) => (
                                    <option key={exercise.id} value={exercise.name}>{exercise.name}</option>
                                ))}
                            </select>
                        </>
                    )}

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

                    <Button
                        name={`Switch to ${unit === "lbs" ? "kg" : "lbs"}`}
                        onClick={toggleUnit}
                    />
                    <Button type="submit" name="Save Workout" />
                </form>
            </Card>
        </>
    );
}

export default WorkoutCard;
