import { useState } from 'react';
import Card from './Card';
import Input from './Input';
import Button from './Button';

function NoteCard({ note, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(note.text);

    const handleSave = () => {
        onUpdate(note.id, editedText);
        setIsEditing(false);
    }

    return (
        <Card>
            {isEditing ?
                (
                    <>
                        <Input value={editedText}
                            onChange={(error) => setEditedText(error.target.value)}
                        />
                        <Button name="Save" onClick={handleSave} />
                        <Button name="Cancel" onClick={(() => setIsEditing(false))} />
                    </>
                ) : (
                    <>
                        <p>{note.text}</p>
                        <small>{note.date}</small>
                        <div>
                            <Button name="Edit" onClick={() => setIsEditing(true)} />
                            <Button name="Delete" onClick={() => onDelete(note.id)} />
                        </div>
                    </>
                )}
        </Card>
    );
}

export default NoteCard;