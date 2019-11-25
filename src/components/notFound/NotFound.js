import React from 'react';
import './NotFound.css';

// Importér Reactstrap komponenter
import { Container } from 'reactstrap';

// Komponent der vises, når routen ikke findes
function NotFound() {
  return (
    <Container className="contentWrapper">
      <h3>Siden findes ikke</h3>
      <p>Den side, du forsøger at tilgå, findes desværre ikke.</p>
    </Container>
  );
}

export default NotFound;
