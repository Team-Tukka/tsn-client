import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import './Textarea.css';

// Importér Reactstrap komponenter
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  FormGroup,
  Input,
  Button,
  Alert
} from 'reactstrap';

function Textarea() {
  const [text, setText] = useState('');
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

  return (
    <Container className="contentWrapper">
      <h1>Ændrer tekst til forsiden</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <InputGroup>
            <Input
              type="textarea"
              style={{ minHeight: '200px' }}
              defaultValue={data.getTextareaById.text}
              onChange={event => setText(event.target.value)}
            />
          </InputGroup>
        </FormGroup>
        {alertStatus === '2' && <Alert color="success">Teksten er gemt.</Alert>}
        ´<Button type="submit">Gem</Button>
      </Form>
    </Container>
  );
}

export default Textarea;