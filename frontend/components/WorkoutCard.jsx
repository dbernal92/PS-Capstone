import { useState, useEffect } from "react";
import Card from "./Card";
import Input from "./Input";
import Button from "./Button";
import Dropdown from "./Dropdown";
import { fetchBodyParts, fetchExercisesByBodyPart } from "../src/api/exerciseDB";

function WorkoutCard({ onSave, editingWorkout }) {
  const [bodyParts, setBodyParts] = useState([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState("");
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [equipmentOptions, setEquipmentOptions] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [selectedExercise, setSelectedExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("lbs");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [currentSession, setCurrentSession] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // Load body parts
  useEffect(() => {
    async function loadBodyParts() {
      const parts = await fetchBodyParts();
      setBodyParts(parts);
    }
    loadBodyParts();
  }, []);

  // Load exercises
  useEffect(() => {
    async function loadExercises() {
      if (!selectedBodyPart) return;
      const data = await fetchExercisesByBodyPart(selectedBodyPart);
      setExercises(data);
      setEquipmentOptions([...new Set(data.map((ex) => ex.equipment))]);
      setSelectedEquipment("");
      setFilteredExercises([]);
      setSelectedExercise("");
    }
    loadExercises();
  }, [selectedBodyPart]);

  // Filter by equipment
  useEffect(() => {
    if (!selectedEquipment) return setFilteredExercises([]);
    const filtered = exercises.filter((ex) => ex.equipment === selectedEquipment);
    setFilteredExercises(filtered);
    setSelectedExercise(filtered[0]?.name || "");
  }, [selectedEquipment]);

  // Load data if editing a full workout
  useEffect(() => {
    if (editingWorkout) {
      setDate(new Date(editingWorkout.date).toISOString().split("T")[0]);
      setCurrentSession(editingWorkout.exercises || []);
    }
  }, [editingWorkout]);

  const toggleUnit = () => {
    setUnit((prev) => (prev === "lbs" ? "kg" : "lbs"));
  };

  const resetForm = () => {
    setSelectedExercise("");
    setSelectedEquipment("");
    setSets("");
    setReps("");
    setWeight("");
    setUnit("lbs");
    setSelectedBodyPart("");
    setEditingIndex(null);
  };

  const handleAddOrEditExercise = (e) => {
    e.preventDefault();

    const newExercise = {
      exerciseName: selectedExercise,
      equipment: selectedEquipment,
      sets,
      reps,
      weight,
      unit,
    };

    if (editingIndex !== null) {
      const updated = [...currentSession];
      updated[editingIndex] = newExercise;
      setCurrentSession(updated);
    } else {
      setCurrentSession((prev) => [...prev, newExercise]);
    }

    resetForm();
  };

  const handleEditExercise = async (index) => {
    const exercise = currentSession[index];
  
    // Find the body part based on exercise name (reverse lookup)
    let inferredBodyPart = "";
    for (let part of bodyParts) {
      const partExercises = await fetchExercisesByBodyPart(part);
      const match = partExercises.find((ex) => ex.name === exercise.exerciseName);
      if (match) {
        inferredBodyPart = part;
        setExercises(partExercises);
        setEquipmentOptions([...new Set(partExercises.map((ex) => ex.equipment))]);
        setFilteredExercises(partExercises.filter((ex) => ex.equipment === exercise.equipment));
        break;
      }
    }
  
    setSelectedBodyPart(inferredBodyPart);
    setSelectedEquipment(exercise.equipment);
    setSelectedExercise(exercise.exerciseName);
    setSets(exercise.sets);
    setReps(exercise.reps);
    setWeight(exercise.weight);
    setUnit(exercise.unit || "lbs");
    setEditingIndex(index);
  };
  

  const handleDeleteExercise = (index) => {
    const confirm = window.confirm("Delete this exercise?");
    if (!confirm) return;
    setCurrentSession((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmitWorkout = async (e) => {
    e.preventDefault();

    if (currentSession.length === 0) {
      alert("Add at least one exercise.");
      return;
    }

    const workoutData = {
        date: new Date(date + "T00:00:00"), // This forces local date w/ no offset
        exercises: currentSession,
      };

    try {
      const url = editingWorkout
        ? `http://localhost:4000/api/workouts/${editingWorkout._id}`
        : "http://localhost:4000/api/workouts";

      const method = editingWorkout ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workoutData),
      });

      if (!response.ok) throw new Error("Failed to save workout");

      const saved = await response.json();
      onSave(saved);
      setCurrentSession([]);
      resetForm();
    } catch (err) {
      console.error("Error saving workout:", err);
    }
  };

  return (
    <>
      <h2>Workout Entries</h2>
      <Card>
      <form onSubmit={handleSubmitWorkout}>

{/* Date Selector */}
<div className="form-row">
  <Input label="Workout Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
</div>

{/* Row 1: Dropdowns */}
<div className="form-row">
  <Dropdown
    label="Body Part"
    value={selectedBodyPart}
    onChange={setSelectedBodyPart}
    options={bodyParts}
  />
  <Dropdown
    label="Equipment"
    value={selectedEquipment}
    onChange={setSelectedEquipment}
    options={equipmentOptions}
    disabled={equipmentOptions.length === 0}
  />
  <Dropdown
    label="Exercise"
    value={selectedExercise}
    onChange={setSelectedExercise}
    options={filteredExercises.map((e) => e.name)}
    disabled={filteredExercises.length === 0}
  />
</div>

{/* Row 2: Input fields */}
<div className="form-row">
  <Input label="Sets" type="number" value={sets} onChange={(e) => setSets(e.target.value)} />
  <Input label="Reps" type="number" value={reps} onChange={(e) => setReps(e.target.value)} />
  <Input label={`Weight (${unit})`} type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
</div>

{/* Row 3: Buttons */}
<div className="form-row">
  <Button name={`Switch to ${unit === "lbs" ? "kg" : "lbs"}`} onClick={toggleUnit} />
  <Button
    name={editingIndex !== null ? "Update Exercise" : "Add Exercise to Session"}
    onClick={handleAddOrEditExercise}
  />
  <Button type="submit" name="Save Workout" />
</div>
</form>

        {currentSession.length > 0 && (
          <>
            <h3>Exercises in Session</h3>
            <ul>
              {currentSession.map((ex, i) => (
                <li key={i}>
                  <strong>{ex.exerciseName}</strong><br />
                  Equipment: {ex.equipment}<br />
                  Sets: {ex.sets}, Reps: {ex.reps}, Weight: {ex.weight} {ex.unit}<br />
                  <button type="button" onClick={() => handleEditExercise(i)}>Edit</button>
                  <button type="button" onClick={() => handleDeleteExercise(i)}>Delete</button>
                </li>
              ))}
            </ul>
          </>
        )}
      </Card>
    </>
  );
}

export default WorkoutCard;
