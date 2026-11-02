'use client';

import { Card, Image } from 'react-bootstrap';
import type { Contact } from '@/lib/validationSchemas';

// added a card to show each contact's info
const ContactCard = ({ contact }: { contact: Contact }) => (
  <Card className="h-100">
    {/* showing the contact's picture and name */}
    <Card.Header>
      <Image
        src={contact.image}
        width={75}
        alt={`${contact.firstName} ${contact.lastName}`}
      />
      <Card.Title>
        {contact.firstName} {contact.lastName}
      </Card.Title>
      <Card.Subtitle className="text-muted">
        {contact.address}
      </Card.Subtitle>
    </Card.Header>

    {/* showing the contact's description */}
    <Card.Body>
      <Card.Text>{contact.description}</Card.Text>
    </Card.Body>
  </Card>
);

export default ContactCard;
