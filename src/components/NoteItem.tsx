
import { Note } from '@prisma/client';
import { ListGroup } from 'react-bootstrap';

// added this to show each saved note with its date
const NoteItem = ({ note }: { note: Note }) => (
  <ListGroup.Item>
    {/* shows the date the note was created */}
    <p className="fw-lighter">
      {new Date(note.createdAt).toLocaleDateString('en-US')}
    </p>

    {/* shows what was written in the note */}
    <p>{note.note}</p>
  </ListGroup.Item>
);

export default NoteItem;
