import React from 'react';
import './EditTextarea.css';

// Komponent, der indeholder teksten under WYSIWYG-boksen.
function EditTextareaFooterText() {
  return (
    <p className="footerTextStyles">
      Såfremt at der ændres i teksten, vil den ændrede tekst automatisk blive
      gemt og vist på forsiden.
    </p>
  );
}

export default EditTextareaFooterText;
