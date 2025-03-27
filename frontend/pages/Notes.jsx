import { useEffect, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Card from "../components/Card";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState("");
  const [noteDate, setNoteDate] = useState(new Date().toISOString().split("T")[0]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [editingDate, setEditingDate] = useState("");

  // Load notes from backend
  useEffect(() => {
    fetch("http://localhost:4000/api/notes")
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
        setNotes(sorted);
      })
      .catch((err) => console.error("Error loading notes:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!noteText.trim()) return;

    const newNote = {
      text: noteText.trim(),
      date: noteDate,
    };

    try {
      const res = await fetch("http://localhost:4000/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote),
      });

      if (!res.ok) throw new Error("Failed to save note");

      const saved = await res.json();
      setNotes([saved, ...notes]);
      setNoteText("");
      setNoteDate(new Date().toISOString().split("T")[0]);
    } catch (err) {
      console.error("Error saving note:", err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this note?");
    if (!confirm) return;

    try {
      await fetch(`http://localhost:4000/api/notes/${id}`, { method: "DELETE" });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  const handleEdit = (note) => {
    setEditingId(note._id);
    setEditingText(note.text);
    setEditingDate(note.date);
  };

  const handleSaveEdit = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/notes/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: editingText, date: editingDate }),
      });

      if (!res.ok) throw new Error("Failed to update note");

      const updated = await res.json();
      const updatedList = notes.map((n) => (n._id === editingId ? updated : n));
      const sorted = [...updatedList].sort((a, b) => new Date(b.date) - new Date(a.date));
      setNotes(sorted);
      setEditingId(null);
      setEditingText("");
      setEditingDate("");
    } catch (err) {
      console.error("Error updating note:", err);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText("");
    setEditingDate("");
  };

  return (
    <div>
      <h1>Fitness Tracker</h1>
      <h2>Journal / Notes</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your thoughts..."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value.slice(0, 280))}
          rows={3}
          style={{ width: "100%", resize: "vertical" }}
        />
        <p>{noteText.length} / 280</p>

        <Input
          label="Date"
          type="date"
          value={noteDate}
          onChange={(e) => setNoteDate(e.target.value)}
        />

        <Button type="submit" name="Add Note" />
      </form>

      <br />

      {notes.map((note) => (
        <Card key={note._id}>
          {editingId === note._id ? (
            <>
              <textarea
                value={editingText}
                onChange={(e) => setEditingText(e.target.value.slice(0, 280))}
                rows={3}
                style={{ width: "100%", resize: "vertical" }}
              />
              <p>{editingText.length} / 280</p>

              <Input
                label="Date"
                type="date"
                value={editingDate}
                onChange={(e) => setEditingDate(e.target.value)}
              />

              <Button name="Save" onClick={handleSaveEdit} />
              <Button name="Cancel" onClick={handleCancelEdit} />
            </>
          ) : (
            <>
              <p>{note.text}</p>
              <p><strong>{new Date(note.date).toLocaleDateString()}</strong></p>
              <Button name="Edit" onClick={() => handleEdit(note)} />
              <Button name="Delete" onClick={() => handleDelete(note._id)} />
            </>
          )}
        </Card>
      ))}
    </div>
  );
}

export default Notes;
