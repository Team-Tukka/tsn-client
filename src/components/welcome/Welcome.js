import React from 'react';
import './Welcome.css';

// Komponent der renderes, når brugeren er logget ind
function Welcome() {
  return (
    <React.Fragment>
      <h3 className="mb-2">Velkommen</h3>
      <p>
        Du er nu logget ind i systemet. I navigationsbaren herover har du nu
        fået en række administrative muligheder baseret på din rolle.
      </p>
    </React.Fragment>
  );
}

export default Welcome;
