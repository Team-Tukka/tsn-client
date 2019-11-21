import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import './EditTextarea.css';

// Importér Reactstrap komponenter
import { Form, Input, InputGroup, FormGroup, Button, Alert } from 'reactstrap';

// EditTextArea komponent
function EditTextarea() {
  // States med React Hooks
  const [text, setText] = useState('');
  const [content, setContent] = useState('hiddenContent');
  const [alertStatus, setAlertStatus] = useState('0');

  // Definér query til at hente textarea
  const GET_TEXTAREA_BY_ID = gql`
    {
      getTextareaById(_id: "5dcbd28e8d50cf53c4f97a58") {
        _id
        text
      }
    }
  `;

  // Definér mutation til at ændre i textarea
  const UPDATE_TEXTAREA_BY_ID = gql`
    mutation {
      updateTextareaById(
        _id: "5dcbd28e8d50cf53c4f97a58"
        input: { text: "${text}" }
      ) {
        _id
        text
      }
    }
  `;

  // Anvend query og mutation
  const { loading, error, data } = useQuery(GET_TEXTAREA_BY_ID);
  const [updateTextareaById] = useMutation(UPDATE_TEXTAREA_BY_ID);

  if (loading) return <p className="text-center m-3">Loading...</p>;
  if (error) return <p className="text-center m-3">Error!</p>;

  // Bestem, hvad der skal ske, når data indsendes
  const handleSubmit = event => {
    event.preventDefault();
    if (text === '') {
      setAlertStatus('1');
    } else {
      updateTextareaById({
        variables: { text: text }
      });
      setAlertStatus('2');
    }
  };

  // Toggle til at vise og skjule preview
  const handlePreview = () => {
    if (content === 'hiddenContent') {
      setContent('shownContent');
    } else if (content === 'shownContent') {
      setContent('hiddenContent');
    }
  };

  return (
    <React.Fragment>
      <h3 className="mb-3">Redigér forsidetekst</h3>
      <Form className="form mb-3" onSubmit={handleSubmit}>
        <FormGroup>
          <InputGroup>
            <Input
              className="inputStyles"
              type="textarea"
              style={{ minHeight: '20rem' }}
              // Henter teksten fra databasen og erstatter <br /> med synlige linjeskift vha. regex
              defaultValue={data.getTextareaById.text.replace(
                /<br\s*\/?>/gi,
                '\r\n'
              )}
              onChange={event =>
                /* Det indskrevede tekst bliver initialiseret til staten 'text',
                og linjeskift vil blive erstattet med <br /> i databasen vha. regex */
                setText(event.target.value.replace(/\r?\n/g, '<br />'))
              }
            />
          </InputGroup>
        </FormGroup>
        {/* Vis alert, hvis der ikke var ændringer i teksten */}
        {alertStatus === '1' && (
          <Alert color="danger">
            Du har ikke foretaget nogle ændringer i teksten!
          </Alert>
        )}
        {/* Vis alert, hvis teksten blev opdateret */}
        {alertStatus === '2' && (
          <Alert color="success">Dine ændringer blev gemt.</Alert>
        )}
        {/* Knap til at opdatere teksten */}
        <Button className="btnStyles mr-2" type="submit">
          Gem
        </Button>
        {/* Knap til at se preview af ændringerne */}
        <Button onClick={handlePreview} className="btnStyles">
          Preview
        </Button>
      </Form>
      <div className={content}>
        <h3>Preview af ændringer</h3>
        {/* Henter teksten fra databasen og erstatter <br /> med synlige linjeskift vha. regex */}
        <pre>{text.replace(/<br\s*\/?>/gi, '\r\n')}</pre>
        {/* Vis alert, hvis der ingen ændringer er endnu */}
        {text === '' && (
          <Alert color="danger">
            Du skal foretage ændringer i teksten, før du kan se et preview!
          </Alert>
        )}
      </div>
    </React.Fragment>
  );
}
export default EditTextarea;
