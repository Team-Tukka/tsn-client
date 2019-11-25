import React from 'react';
import { Link } from 'react-router-dom';
import ScooterRows from './ScooterRows';
import SparepartRows from './SparepartRows';
import ProductsFooterText from './ProductsFooterText';
import './Products.css';

// Importér Reactstrap komponenter
import { Table } from 'reactstrap';

// Importér Font Awesome komponenter
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

// Komponent, der renderer alle produkter i et table-view
function Products() {
  return (
    <React.Fragment>
      <div className="flexElements">
        <h3 className="mb-3">Produktliste</h3>
        <div>
          {/* Mulighed for at tilføje ny elscooter */}
          <Link to="/addNewScooter" className="linkStyles">
            <FontAwesomeIcon
              icon={faPlusCircle}
              className="fontAwesomeIconNavStyles"
            ></FontAwesomeIcon>
            Tilføj elscooter
          </Link>
          {/* Mulighed for at tilføje ny reservedel */}
          <Link to="/addNewSparepart" className="linkStyles">
            <FontAwesomeIcon
              icon={faPlusCircle}
              className="fontAwesomeIconNavStyles"
            ></FontAwesomeIcon>
            Tilføj reservedel
          </Link>
        </div>
      </div>
      <div className="tableScrollView fadeIn">
        <Table responsive borderless>
          {/* Tabeloverskrifter der er fælles for både elscootere og reservedele */}
          <thead className="lightGreenBg tableHeaderStyles">
            <tr>
              <th className="font-weight-normal">Enhedsnummer</th>
              <th className="font-weight-normal">Enhedsnavn</th>
              <th className="font-weight-normal">Pris u. moms</th>
              <th className="font-weight-normal">Pris m. moms</th>
              <th className="font-weight-normal">Kategori</th>
            </tr>
          </thead>
          <tbody>
            <ScooterRows />
            <SparepartRows />
          </tbody>
        </Table>
      </div>
      <ProductsFooterText />
    </React.Fragment>
  );
}

export default Products;
