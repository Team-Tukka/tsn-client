import React from 'react';
import SubCategories from './SubCategories';
import './ChooseSubCategory.css';

// Importér Reactstrap komponenter
import { Container, ListGroup } from 'reactstrap';

// Komponent hvori SubCategories-komponentet renderes
function ChooseSubCategory() {
  return (
    <Container className="contentWrapper">
      <h3 className="mb-3">Vælg splittegning</h3>
      <ListGroup className="fadeIn mb-3">
        <SubCategories />
      </ListGroup>
    </Container>
  );
}

export default ChooseSubCategory;
