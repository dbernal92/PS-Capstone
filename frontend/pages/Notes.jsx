import { useState } from 'react';
import NoteCard from '../components/NoteCard';
import Input from '../components/Input';
import Button from '../components/Button';

function Notes() {
  const [noteInput, setNoteInput] = useState('');
  const [notes, setNotes] = useState([
    { text: "Felt strong today!", date: "2025-03-20" },
    { text: "Skipped gym — needed rest.", date: "2025-03-21" }
  ]);

  const handleAddNote = (e) => {
    e.preventDefault();
    const newNote = {
      text: noteInput,
      date: new Date().toISOString().split("T")[0],
    };
    setNotes([newNote, ...notes]);
    setNoteInput('');
  };

  return (
    <div>
      <h2>Journal / Notes</h2>

      <form onSubmit={handleAddNote}>
        <Input
          label="Add a Note"
          name="note"
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
          placeholder="Write your thoughts..."
        />
        <Button type="submit" name="Add Note" />
      </form>

      <div>
        {notes.map((note, index) => (
          <NoteCard key={index} note={note} />
        ))}
      </div>
    </div>
  );
}

export default Notes;