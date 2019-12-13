import React from 'react';
import Inbox from './Inbox';

// Importér Reactstrap komponenter
import { Container, Col, Row } from 'reactstrap';

// Komponent der renderer det view, man ser, før der klikkes på en specifik mail
function MailLandingPage() {
  return (
    <Container className="mailContainer">
      <Row>
        <Col className="tableScrollView" xs="4">
          <Inbox />
        </Col>
        <Col className="tableScrollView">
          <p className="mt-2">Klik på en mail for at læse indholdet.</p>
        </Col>
      </Row>
    </Container>
  );
}

export default MailLandingPage;
