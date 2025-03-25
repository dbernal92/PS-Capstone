import { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import ProgressCard from '../components/ProgressCard';

function ProgressTracker() {
  const [weight, setWeight] = useState('');
  const [bodyFat, setBodyFat] = useState('');
  const [entries, setEntries] = useState([
    { id: 1, date: '2025-03-20', weight: 145, bodyFatPercentage: 18 },
    { id: 2, date: '2025-03-22', weight: 144.5, bodyFatPercentage: 17.8 }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      weight,
      bodyFatPercentage: bodyFat
    };
    setEntries([newEntry, ...entries]);
    setWeight('');
    setBodyFat('');
  };

  return (
    <div>
      <h2>Track Your Progress</h2>

      <form onSubmit={handleSubmit}>
        <Input
          label="Weight (lbs)"
          name="weight"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          step={0.1}
        />
        <Input
          label="Body Fat %"
          name="bodyFat"
          type="number"
          value={bodyFat}
          onChange={(e) => setBodyFat(e.target.value)}
          step={0.1}
        />
        <Button type="submit" name="Add Entry" />
      </form>

      <div>
        {entries.map((entry) => (
          <ProgressCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}

export default ProgressTracker;