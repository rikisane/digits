
import { Col, Container, Row } from 'react-bootstrap';
import { PeopleFill, FileEarmarkTextFill, Calendar2CheckFill } from 'react-bootstrap-icons';

/** The Home page. */
const Home = () => (
  <main>
    <Container id="landing-page" className="py-5">
      {/* added three columns for the landing page */}
      <Row className="text-center">
        <Col>
          {/* added the multiple users section */}
          <PeopleFill size={100} />
          <h1>Multiple Users</h1>
          <h5>
            This address book enables any number of users to register and save
            their business contacts. You can only see the contacts you have created.
          </h5>
        </Col>

        <Col>
          {/* added the contact details section */}
          <FileEarmarkTextFill size={100} />
          <h1>Contact Details</h1>
          <h5>
            For each contact, you can save their name, address, and phone number.
          </h5>
        </Col>

        <Col>
          {/* added the timestamped notes section */}
          <Calendar2CheckFill size={100} />
          <h1>Timestamped Notes</h1>
          <h5>
            Each time you make contact with a contact, you can write a note that
            summarizes the conversation. This note is saved along with a timestamp
            with the contact.
          </h5>
        </Col>
      </Row>
    </Container>
  </main>
);

export default Home;
