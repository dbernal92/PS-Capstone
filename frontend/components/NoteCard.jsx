import Card from './Card';

function NoteCard({ note }) {
  return (
    <Card>
      <p>{note.text}</p>
      <small>{note.date}</small>
    </Card>
  );
}

export default NoteCard;