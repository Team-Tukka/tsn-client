import React from 'react';
import SparepartCards from './SparepartCards';
import './Spareparts.css';

// Importér Reactstrap komponenter
import { Container, Row, CardDeck } from 'reactstrap';

// Komponent der via sub-komponent renderer alle reservedele
function Spareparts() {
  return (
    <Container className="contentWrapper">
      <h3 className="mb-3">Reservedele</h3>
      <Row>
        <CardDeck>
          <SparepartCards />
        </CardDeck>
      </Row>
    </Container>
  );
}

export default Spareparts;
