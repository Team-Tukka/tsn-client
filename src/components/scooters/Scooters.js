import React from 'react';
import './Scooters.css';

// Importér Reactstrap komponenter
import { Container } from 'reactstrap';

// Komponent der renderer alle elscootere
function Scooters() {
  return (
    <Container className="contentWrapper">
      <h3>Elscootere</h3>
      <p>Siden er på vej.</p>
    </Container>
  );
}

export default Scooters;
