import React from 'react';
import './Contact.css';

// Importér Reactstrap komponenter
import { Container } from 'reactstrap';

// Komponent som indeholder kontaktform
function Contact() {
  return (
    <Container className="contentWrapper">
      <h3>Kontakt side</h3>
      <p>Her kommer der en kontakt form</p>
    </Container>
  );
}

export default Contact;
