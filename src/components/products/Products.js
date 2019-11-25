import React from 'react';
import { Link } from 'react-router-dom';
import ProductRows from './ProductRows';
import ProductsFooterText from './ProductsFooterText';
import './Products.css';

// Importér Reactstrap komponenter
import { Table } from 'reactstrap';

// Importér Font Awesome komponenter
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

// Komponent, der renderer alle produkter i et table view
function Products() {
  return (
    <React.Fragment>
      <div className="flexElements">
        <h3 className="mb-3">Produktliste</h3>
        {/* Mulighed for at tilføje ny elscooter */}
        <Link to="/addNewScooter" className="linkStyles">
          <FontAwesomeIcon
            icon={faPlusCircle}
            className="fontAwesomeIconNavStyles"
          ></FontAwesomeIcon>
          Tilføj elscooter
        </Link>
      </div>
      <div className="tableScrollView fadeIn">
        <Table responsive borderless>
          <thead className="lightGreenBg tableHeaderStyles">
            <tr>
              <th className="font-weight-normal">Navn</th>
              <th className="font-weight-normal">Pris</th>
              <th className="font-weight-normal">SKU</th>
              <th className="font-weight-normal">Mærke</th>
              <th className="font-weight-normal">Beskrivelse</th>
              <th className="font-weight-normal">Enhedsnummer</th>
              <th className="font-weight-normal">Kategori</th>
            </tr>
          </thead>
          <tbody>
            <ProductRows />
          </tbody>
        </Table>
      </div>
      <ProductsFooterText />
    </React.Fragment>
  );
}

export default Products;
