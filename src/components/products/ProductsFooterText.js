import React from 'react';
import './ProductsFooterText.css';

// Komponent, der indeholder teksten under listen med produkter
function ProductsFooterText() {
  return (
    <React.Fragment>
      <p className="footerTextStyles">
        Listen viser samtlige elscootere og reservedele i databasen. Mere info
        findes ved at klikke på det enkelte produkt.
      </p>
    </React.Fragment>
  );
}

export default ProductsFooterText;
