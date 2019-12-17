import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddNewCategory from './AddNewCategory';
import AddNewSubCategory from './AddNewSubCategory';
import EditCategory from './EditCategory';
import EditSubCategory from './EditSubCategory';
import './Categories.css';

// Importér Reactstrap komponenter
import { Col, Row, Collapse } from 'reactstrap';

/*
  Parent Component, der indeholder Sub Components, som giver
  mulighed for at tilføje og ændre kategorier samt tilføje og
  ændre splittegninger (underkategorier)
*/
function Categories() {
  // States med React Hooks, der håndterer toggle-status
  const [catToggleIsOpen, setCatToggleIsOpen] = useState(false);
  const [subCatToggleIsOpen, setSubCatToggleIsOpen] = useState(false);

  // Toggle-funktioner
  const categoriesToggle = () => setCatToggleIsOpen(!catToggleIsOpen);
  const subCategoriesToggle = () => setSubCatToggleIsOpen(!subCatToggleIsOpen);

  return (
    <Row>
      <Col>
        <Row>
          <Col>
            <h4 className="mb-3">Tilføj kategori</h4>
            <AddNewCategory />
          </Col>
        </Row>
        <Row>
          <Col>
            <h4 className="my-3">Tilføj splittegning</h4>
            <AddNewSubCategory />
          </Col>
        </Row>
      </Col>
      <Col>
        <Row>
          <Col className="mb-2">
            <div className="flexElements">
              <h4 className="mb-3">Kategorier</h4>
              <Link
                onClick={categoriesToggle}
                className="showHideTextStyles linkStyles mb-3"
              >
                Vis/skjul
              </Link>
            </div>
            {catToggleIsOpen === false && (
              <span>
                Tryk på "Vis/skjul" for at vise og skjule listen med kategorier.
              </span>
            )}
            <Collapse isOpen={catToggleIsOpen} className="fadeIn">
              <EditCategory />
            </Collapse>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="flexElements">
              <h4 className="my-3">Splittegninger</h4>
              <Link
                onClick={subCategoriesToggle}
                className="showHideTextStyles linkStyles my-3"
              >
                Vis/skjul
              </Link>
            </div>
            {subCatToggleIsOpen === false && (
              <span>
                Tryk på "Vis/skjul" for at vise og skjule listen med
                splittegninger.
              </span>
            )}
            <Collapse isOpen={subCatToggleIsOpen} className="fadeIn">
              <EditSubCategory />
            </Collapse>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Categories;
