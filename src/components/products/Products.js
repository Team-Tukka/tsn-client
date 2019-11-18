import React from 'react';
import ProductRows from './ProductRows';
import ProductsFooterText from './ProductsFooterText';
import './Products.css';

// Importér Reactstrap komponenter
import { Table } from 'reactstrap';

// Komponent, der renderer alle produkter i et table view
function Products() {
  return (
    <React.Fragment>
      <h3 className="mb-3">Produktliste</h3>
      <div className="tableScrollView">
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
