
import { Col, Container, Row } from 'react-bootstrap';
import ContactCardAdmin from '@/components/ContactCardAdmin'; // added the admin contact card
import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';

const AdminPage = async () => {
  const session = await auth();
  adminProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );

  // gets all contacts from the database
  const contacts = await prisma.contact.findMany({});

  // added this to get all notes for the admin page
  const notes = await prisma.note.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h1 className="text-center">List Contacts (Admin)</h1>
          </Col>
        </Row>

        {/* shows all contacts and their owners */}
        <Row xs={1} md={2} lg={3} className="g-4">
          {contacts.map((contact) => (
            <Col key={`Contact-${contact.id}`}>
              {/* added this to pass each contact its own notes */}
              <ContactCardAdmin
                contact={contact}
                notes={notes.filter((note) => (
                  note.contactId === contact.id && note.owner === contact.owner
                ))}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default AdminPage;
