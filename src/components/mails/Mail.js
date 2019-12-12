import React from 'react';
import Inbox from './Inbox';
import Message from './Message';
import './Mail.css';

/**
 * Dette komponent er et parent-komponent, som indeholder
 * to child komponenter kaldet "Inbox" og "Message".
 * Inbox er det komponent, som indeholder alle mails.
 * Message indeholder beskeden fra den specifikke mail.
 **/

// Importér Reactstrap komponenter
import { Container, Col, Row } from 'reactstrap';

function Mail() {
  return (
    <Container className="mailContainer">
      <Row>
        <Col className="tableScrollView" xs="4">
          <Inbox />
        </Col>
        <Col>
          <Message />
        </Col>
      </Row>
    </Container>
  );
}

export default Mail;
