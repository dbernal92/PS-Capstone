import { useState } from 'react';
import Card from "./Card";

function ProgressCard({ entry, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [weight, setWeight] = useState(entry.weight);
  const [bodyFat, setBodyFat] = useState(entry.bodyFatPercentage);

  const handleSave = () => {
    onEdit(entry._id, {
      weight: parseFloat(weight),
      bodyFatPercentage: parseFloat(bodyFat),
    });
    setIsEditing(false);
  };

  return (
    <Card>
      {isEditing ? (
        <>
          <p><strong>Date:</strong> {entry.date}</p>
          <label>Weight (lbs):</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} step="0.1" />
          <label>Body Fat %:</label>
          <input type="number" value={bodyFat} onChange={(e) => setBodyFat(e.target.value)} step="0.1" />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <p><strong>Date:</strong> {entry.date}</p>
          <p><strong>Weight:</strong> {entry.weight} lbs</p>
          <p><strong>Body Fat %:</strong> {entry.bodyFatPercentage}%</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(entry._id)}>Delete</button>
        </>
      )}
    </Card>
  );
}

export default ProgressCard;
