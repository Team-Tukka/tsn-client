import React from 'react';
import { Link } from 'react-router-dom';
import ScooterRows from './ScooterRows';
import SparepartRows from './SparepartRows';
import ProductsFooterText from './ProductsFooterText';
import './Products.css';

// Importér Reactstrap komponenter
import { Table, Input } from 'reactstrap';

// Importér Font Awesome komponenter
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

// Komponent, der renderer alle produkter i et table-view
function Products() {
  // Mulighed for at filtrere i listen med produkter
  const filterProducts = () => {
    // Variabler deklareres og initialiseres
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById('filterInput');
    filter = input.value.toUpperCase(); // Værdien i inputfeltet
    table = document.getElementById('productList');
    tr = table.getElementsByTagName('tr'); // Hver række i tabellen

    // Loop gennem alle tabelrækkerne og skjul dem, der ikke matcher med indtastningen
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName('td')[0]; // Søger blandt værdierne i index 0 (række 0)
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = '';
        } else {
          tr[i].style.display = 'none';
        }
      }
    }
  };

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
      {/* Mulighed for at søge i listen af produkter */}
      <Input
        type="text"
        id="filterInput"
        className="inputStyles mb-3"
        onKeyUp={filterProducts}
        placeholder="Søg efter enhedsnummer..."
      />
      <div className="tableScrollView fadeIn">
        <Table id="productList" responsive borderless>
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
