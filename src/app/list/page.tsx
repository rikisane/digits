
import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';
import ContactCard from '@/components/ContactCard';

/** Render a list of contacts for the logged in user. */
const ListPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await auth();
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );

  // gets the email of the logged-in user
  const owner = (session && session.user && session.user.email) || '';

  // gets only the contacts that belong to this user
  const contacts = await prisma.contact.findMany({
    where: {
      owner,
    },
  });

  // added this to get all notes belonging to the logged-in user
  const notes = await prisma.note.findMany({
    where: {
      owner,
      Contact: {
        owner,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h1 className="text-center">List Contacts</h1>
          </Col>
        </Row>

        {/* shows the logged-in user's contacts in a grid */}
        <Row xs={1} md={2} lg={3} className="g-4">
          {contacts.map((contact) => (
            <Col key={`Contact-${contact.id}`}>
              {/* only passes notes that belong to this contact */}
              <ContactCard
                contact={contact}
                notes={notes.filter((note) => note.contactId === contact.id)}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default ListPage;
