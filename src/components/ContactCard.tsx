
'use client';

import { Card, Image, ListGroup } from 'react-bootstrap';
import Link from 'next/link';
import type { Contact, Note } from '@prisma/client';
import NoteItem from '@/components/NoteItem';
import AddNoteForm from '@/components/AddNoteForm'; // added the note form

// updated this to accept the contact and its notes
const ContactCard = ({ contact, notes }: { contact: Contact; notes: Note[] }) => (
  <Card className="h-100">
    {/* showing the contact's picture and name */}
    <Card.Header>
      <Image
        src={contact.image}
        width={75}
        alt={`${contact.firstName} ${contact.lastName}`}
      />
      <Card.Title>
        {contact.firstName}
        {' '}
        {contact.lastName}
      </Card.Title>
      <Card.Subtitle className="text-muted">
        {contact.address}
      </Card.Subtitle>
    </Card.Header>

    {/* showing the contact's description */}
    <Card.Body>
      <Card.Text>{contact.description}</Card.Text>
    </Card.Body>

    {/* shows all the saved notes for this contact */}
    <ListGroup variant="flush">
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </ListGroup>

    {/* keeping the edit link for saved contacts */}
    <Card.Footer>
      <Link href={`/edit/${contact.id}`}>Edit</Link>
    </Card.Footer>

    {/* added the form so users can add timestamped notes */}
    <AddNoteForm contactId={contact.id} />
  </Card>
);

export default ContactCard;
