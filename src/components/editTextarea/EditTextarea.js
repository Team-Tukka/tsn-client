import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import './EditTextarea.css';

// Importér Reactstrap komponenter
import {
  Container,
  Form,
  InputGroup,
  FormGroup,
  Input,
  Button,
  Alert
} from 'reactstrap';

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  // Bestem hvad der skal ske, når der submittes
  const handleSubmit = event => {
    event.preventDefault();
    updateTextareaById({
      variables: { text: text }
    });
    setAlertStatus('2');
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
    <Container className="contentWrapper">
      <h1>Tekst på forsiden:</h1>
      <Form onSubmit={handleSubmit} className="mb-5">
        <FormGroup>
          <InputGroup>
            <Input
              type="textarea"
              style={{ minHeight: '200px' }}
              // Henter teksten fra databasen og erstatter <br /> med viselige linjeskift med brug af regex
              defaultValue={data.getTextareaById.text.replace(
                /<br\s*\/?>/gi,
                '\r\n'
              )}
              onChange={event =>
                // Det indskrevede tekst bliver sat på "text"-staten og linjeskift vil blive erstattet med <br /> i databasen vha. regex
                setText(event.target.value.replace(/\r?\n/g, '<br />'))
              }
            />
          </InputGroup>
        </FormGroup>
        {alertStatus === '2' && <Alert color="success">Teksten er gemt.</Alert>}
        <Button className="mr-2" type="submit">
          Gem
        </Button>
        <Button onClick={handlePreview}>Preview</Button>
      </Form>
      <div>
        <h1 className={content}>Preview:</h1> <br />
        {/* Henter teksten fra databasen og erstatter <br /> med viselige linjeskift med brug af regex  */}
        <pre className={content}>{text.replace(/<br\s*\/?>/gi, '\r\n')}</pre>
      </div>
    </Container>
  );
}
export default EditTextarea;
