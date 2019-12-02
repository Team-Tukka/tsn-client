import React from 'react';
import ScooterCards from './ScooterCards';
import './Scooters.css';

// Importér Reactstrap komponenter
import { Container, Row, CardDeck } from 'reactstrap';

// Komponent der via sub-komponent renderer alle elscootere
function Scooters() {
  return (
    <Container className="contentWrapper">
      <h3 className="mb-3">Elscootere</h3>
      <Row>
        <CardDeck>
          <ScooterCards />
        </CardDeck>
      </Row>
    </Container>
  );
}

export default Scooters;
