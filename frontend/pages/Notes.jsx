import { useState } from 'react';
import NoteCard from '../components/NoteCard';
import Input from '../components/Input';
import Button from '../components/Button';

function Notes() {
  const [noteInput, setNoteInput] = useState('');
  const [notes, setNotes] = useState([
    { id: 1, text: "Felt strong today!", date: "2025-03-20" },
    { id: 2, text: "Skipped gym — needed rest.", date: "2025-03-21" }
  ]);

  const handleAddNote = (error) => {
    error.preventDefault();
    const newNote = {
        id: Date.now(),
      text: noteInput,
      date: new Date().toISOString().split("T")[0],
    };
    setNotes([newNote, ...notes]);
    setNoteInput('');
  };

const handleUpdate = (id, newText) => {
    setNotes(notes.map(note => note.id === id ? { ...note, text: newText } : note ))
}

const handleDelete = (id) => {
    setNotes(notes.filter(note => note.id !== id))
}

  return (
    <div>
      <h2>Journal / Notes</h2>

      <form onSubmit={handleAddNote}>
        <Input
          label="Add a Note"
          name="note"
          value={noteInput}
          onChange={(error) => setNoteInput(error.target.value)}
          placeholder="Write your thoughts..."
        />
        <Button type="submit" name="Add Note" />
      </form>

      <div>
        {notes.map((note) => (
          <NoteCard key={note.id} 
          note={note} 
          onUpdate={handleUpdate} 
          onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default Notes;