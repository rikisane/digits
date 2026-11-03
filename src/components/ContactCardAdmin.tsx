
'use client';

import { Card, Image } from 'react-bootstrap';
import type { Contact } from '@/lib/validationSchemas';

// added an admin card that also shows who owns each contact
const ContactCardAdmin = ({ contact }: { contact: Contact & { owner: string } }) => (
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

    {/* showing the contact's description and owner */}
    <Card.Body>
      <Card.Text>{contact.description}</Card.Text>

      {/* added the owner's email for admins */}
      <p className="blockquote-footer">{contact.owner}</p>
    </Card.Body>
  </Card>
);

export default ContactCardAdmin;
