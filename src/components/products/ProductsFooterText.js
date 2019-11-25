import React from 'react';
import './ProductsFooterText.css';

// Komponent, der indeholder teksten under listen med produkter
function ProductsFooterText() {
  return (
    <React.Fragment>
      <p className="footerTextStyles">
        Listen viser samtlige enheder i databasen. Enheder uden beskrivelse vil
        typisk være reservedele. Mere info findes ved at klikke på det enkelte
        produkt.
      </p>
    </React.Fragment>
  );
}

export default ProductsFooterText;
