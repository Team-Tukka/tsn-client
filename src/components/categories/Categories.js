import React from 'react';
import AddNewCategory from './AddNewCategory';
import AddNewSubCategory from './AddNewSubCategory';
import EditCategory from './EditCategory';
import EditSubCategory from './EditSubCategory';
import './Categories.css';

// Importér Reactstrap komponenter
import { Table, Col, Row } from 'reactstrap';

// Komponent, der renderer alle kategorier i et table-view
function Categories() {
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Row>
            <Col>
              <div className="flexElements">
                <h3 className="mb-3">Kategorier</h3>
              </div>
              <EditCategory />
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="flexElements">
                <h3 className="mb-3">Underkategorier</h3>
              </div>
              <EditSubCategory />
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col>
              <div className="flexElements">
                <h3 className="mb-3">Tilføj kategori</h3>
              </div>
              <AddNewCategory />
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="flexElements">
                <h3 className="mb-3">Tilføj underkategori</h3>
              </div>
              <AddNewSubCategory />
            </Col>
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default Categories;
