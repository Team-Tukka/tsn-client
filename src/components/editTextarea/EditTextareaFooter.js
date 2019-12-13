import React from 'react';
import './EditTextarea.css';

// Komponent, der indeholder teksten under WYSIWYG boksen.
function EditTextareaFooterText() {
  return (
    <React.Fragment>
      <p className="footerTextStyles">
        Såfremt at der ændres i teksten, vil den ændrede tekst automatisk blive
        gemt og vist på forsiden.
      </p>
    </React.Fragment>
  );
}

export default EditTextareaFooterText;
