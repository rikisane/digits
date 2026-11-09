
import { Button, Col, Container, Row } from 'react-bootstrap';

/** The Digits home page. */
const Home = () => (
  <main>
    <Container id="landing-page" fluid className="py-5">
      <Row className="justify-content-center text-center">
        <Col md={8} lg={7}>
          <h1 className="display-4 fw-bold mb-4">Welcome to Digits</h1>

          <p className="lead mb-4">
            Digits is a simple contact management application that helps
            you keep track of your contacts and important information
            all in one place.
          </p>

          <h3 className="mb-3">Manage Your Contacts Easily</h3>

          <p className="mb-4">
            Add new contacts, update their information, and view your
            personal contact list. You can also create notes for each
            contact to keep track of important details.
          </p>

          <Button variant="primary" size="lg" href="/auth/signin">
            Get Started
          </Button>
        </Col>
      </Row>

      <Row className="justify-content-center text-center mt-5">
        <Col md={4} className="mb-4">
          <h4>Add Contacts</h4>
          <p>
            Save names, addresses, photos, and descriptions
            for your contacts.
          </p>
        </Col>

        <Col md={4} className="mb-4">
          <h4>Organize Contacts</h4>
          <p>
            View and edit your contacts in one convenient place.
          </p>
        </Col>

        <Col md={4} className="mb-4">
          <h4>Contact Notes</h4>
          <p>
            Add notes to your contacts to remember important
            information and conversations.
          </p>
        </Col>
      </Row>
    </Container>
  </main>
);

export default Home;
