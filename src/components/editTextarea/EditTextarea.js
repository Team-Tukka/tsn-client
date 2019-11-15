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

function EditTextarea(props) {
  const [text, setText] = useState('');
  const [content, setContent] = useState('hiddenContent');
  const [alertStatus, setAlertStatus] = useState('0');

  const GET_TEXTAREA_BY_ID = gql`
    {
      getTextareaById(_id: "5dcbd28e8d50cf53c4f97a58") {
        _id
        text
      }
    }
  `;

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
  const { loading, error, data } = useQuery(GET_TEXTAREA_BY_ID);
  const [updateTextareaById] = useMutation(UPDATE_TEXTAREA_BY_ID);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  const handleSubmit = event => {
    event.preventDefault();

    updateTextareaById({
      variables: { text: text }
    });
    setAlertStatus('2');
  };

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
              defaultValue={data.getTextareaById.text.replace(
                /<br\s*\/?>/gi,
                '\r\n'
              )}
              onChange={event =>
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
        <pre className={content}>{text.replace(/<br\s*\/?>/gi, '\r\n')}</pre>
      </div>
    </Container>
  );
}
export default EditTextarea;
