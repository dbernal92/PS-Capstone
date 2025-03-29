import express from 'express';
import Note from '../models/Notes.js';

const notesRouter = express.Router();

// GET - All notes
notesRouter.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST - Create a new note
notesRouter.post("/", async (req, res) => {
  try {
    const note = new Note({
      text: req.body.text,
      date: req.body.date || new Date()
    });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to save note");
  }
});

// PUT - Edit note
notesRouter.put("/:id", async (req, res) => {
  try {
    const updated = await Note.findByIdAndUpdate(
      req.params.id,
      {
        text: req.body.text,
        date: req.body.date
      },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).send("Note not found");
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update note");
  }
});

// DELETE - Remove note by ID
notesRouter.delete('/:id', async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) {
      return res.status(404).send('Note not found');
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

export default notesRouter;