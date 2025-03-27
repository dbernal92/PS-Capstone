import { useState, useEffect } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import ProgressCard from '../components/ProgressCard';
import ProgressChart from '../components/ProgressChart';

function ProgressTracker() {
  const [weight, setWeight] = useState('');
  const [bodyFat, setBodyFat] = useState('');
  const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState("all"); // "all", "week", or "month"
  const [entryDate, setEntryDate] = useState(new Date().toISOString().split("T")[0]);

  // Load saved entries from backend
  useEffect(() => {
    fetch('http://localhost:4000/api/progress')
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
        setEntries(sorted);
      })
      .catch((err) => console.error('Error loading progress:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEntry = {
      weight: parseFloat(weight),
      bodyFatPercentage: parseFloat(bodyFat),
      date: new Date(entryDate),
      notes: "Added via frontend"
    };


    try {
      const res = await fetch('http://localhost:4000/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry),
      });

      if (!res.ok) throw new Error('Failed to save entry');

      const saved = await res.json();
      setEntries([saved, ...entries]);
      setWeight('');
      setBodyFat('');
    } catch (err) {
      console.error('Error submitting entry:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4000/api/progress/${id}`, { method: 'DELETE' });
      setEntries(entries.filter(e => e._id !== id));
    } catch (err) {
      console.error('Error deleting entry:', err);
    }
  };

  const handleEdit = async (id, updatedData) => {
    try {
      const res = await fetch(`http://localhost:4000/api/progress/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error('Failed to update entry');

      const updatedEntry = await res.json();
      setEntries(entries.map(e => (e._id === id ? updatedEntry : e)));
    } catch (err) {
      console.error('Error updating entry:', err);
    }
  };


  console.log("Entries:", entries);

  const now = new Date();
  let filteredEntries = entries;

  if (filter === "week") {
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    filteredEntries = entries.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= startOfWeek && entryDate <= now;
    });
  }

  if (filter === "month") {
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    filteredEntries = entries.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= startOfMonth && entryDate <= now;
    });
  }

  const groupEntriesByDate = (entries) => {
    return entries.reduce((acc, entry) => {
      const dateKey = new Date(entry.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }

      acc[dateKey].push(entry);
      return acc;
    }, {});
  };

  const grouped = groupEntriesByDate(filteredEntries);

  return (
    <div>
      <h2>Track Your Progress</h2>

      <form onSubmit={handleSubmit}>
        <Input
          label="Date"
          name="entryDate"
          type="date"
          value={entryDate}
          onChange={(e) => setEntryDate(e.target.value)}
        />

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

      <label htmlFor="filter">Filter Entries:</label>
      <select
        id="filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ marginLeft: "0.5rem", marginBottom: "1rem" }}
      >
        <option value="all">All</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
      </select>

      {/* Chart */}
      {filteredEntries.length > 1 && (
        <>
          <h3>Progress Over Time</h3>
          <ProgressChart entries={filteredEntries} />
        </>
      )}

      {/* Grouped Entries */}
      {Object.entries(grouped).map(([date, entries]) => (
        <div key={date}>
          <h4 style={{ marginTop: "1.5rem" }}>{date}</h4>
          {entries.map((entry) => (
            <ProgressCard
              key={entry._id}
              entry={entry}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default ProgressTracker;