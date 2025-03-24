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

// POST - Create new note
notesRouter.post('/', async (req, res) => {
  try {
    const newNote = new Note(req.body);
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
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

// GET - Get all journal entries
// POST - Add a new journal entry
// DELETE - Delete a journal entry