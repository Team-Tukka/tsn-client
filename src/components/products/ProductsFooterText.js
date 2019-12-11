import React from 'react';
import './ProductsFooterText.css';

// Komponent, der indeholder teksten under listen med produkter
function ProductsFooterText() {
  return (
    <React.Fragment>
      <p className="footerTextStyles">
        Listen viser samtlige elscootere og reservedele i databasen. Klik på det
        enkelte produkt for at se mere info, redigere eller slette.
      </p>
    </React.Fragment>
  );
}

export default ProductsFooterText;
