
import { Col, Container } from 'react-bootstrap';

/** The footer for the Digits application. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-light">
    <Container>
      <Col className="text-center">
        Digits - Contact Management Application
        <br />
        ICS 314 - University of Hawaii at Manoa
        <br />
        <a
          href="https://github.com/rikisane/digits"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Repository
        </a>
      </Col>
    </Container>
  </footer>
);

export default Footer;
