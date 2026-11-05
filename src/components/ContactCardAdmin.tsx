
'use client';

import { Card, Image, ListGroup } from 'react-bootstrap';
import type { Contact, Note } from '@prisma/client';
import NoteItem from '@/components/NoteItem';

// updated the admin card to accept notes too
const ContactCardAdmin = ({ contact, notes }: { contact: Contact; notes: Note[] }) => (
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

    {/* showing the contact's description and owner */}
    <Card.Body>
      <Card.Text>{contact.description}</Card.Text>

      {/* keeping the owner's email for admins */}
      <p className="blockquote-footer">{contact.owner}</p>
    </Card.Body>

    {/* added this to show notes belonging to this contact */}
    <ListGroup variant="flush">
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </ListGroup>
  </Card>
);

export default ContactCardAdmin;
