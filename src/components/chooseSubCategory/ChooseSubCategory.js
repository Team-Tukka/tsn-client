import React from 'react';
import SubCategories from './SubCategories';
import './ChooseSubCategory.css';

// Importér Reactstrap komponenter
import { Container, Row, CardDeck } from 'reactstrap';

// Komponent hvori SubCategories-komponentet renderes
function ChooseSubCategory() {
  return (
    <Container className="contentWrapper">
      <h3 className="mb-3">Vælg kategori</h3>
      <Row>
        <CardDeck className="fadeIn">
          <SubCategories />
        </CardDeck>
      </Row>
    </Container>
  );
}

export default ChooseSubCategory;
