import React from 'react';
import AddNewCategory from './AddNewCategory';
import AddNewSubCategory from './AddNewSubCategory';
import EditCategory from './EditCategory';
import EditSubCategory from './EditSubCategory';
import './Categories.css';

// Importér Reactstrap komponenter
import { Col, Row } from 'reactstrap';

/*
  Parent Component, der indeholder Sub Components, som giver
  mulighed for at tilføje og ændre kategorier samt tilføje og
  ændre splittegninger (underkategorier)
*/
function Categories() {
  return (
    <Row>
      <Col>
        <Row>
          <Col>
            <h3 className="mb-3">Kategorier</h3>
            <EditCategory />
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className="mb-3">Splittegninger</h3>
            <EditSubCategory />
          </Col>
        </Row>
      </Col>
      <Col>
        <Row>
          <Col>
            <h3 className="mb-3">Tilføj kategori</h3>
            <AddNewCategory />
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className="mb-3">Tilføj splittegning</h3>
            <AddNewSubCategory />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Categories;
