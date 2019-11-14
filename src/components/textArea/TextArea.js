import React, { useState } from 'react';
import './Textarea.css';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

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
    <Container>
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
  // return (
  //   <Container className="containerStyles">
  //     <Form>
  //       <Row>
  //         <Col>
  //           <div>
  //             <p>{data.getTextareaById.text}</p>
  //           </div>
  //           <div>
  //             <TinyMCE
  //               content={data.getTextareaById.text}
  //               config={{
  //                 plugins: 'autolink link image lists print preview',
  //                 toolbar:
  //                   'undo redo | bold italic | alignleft aligncenter alignright'
  //               }}
  //               onChange={handleEditorChange}
  //             />
  //           </div>
  //         </Col>
  //       </Row>
  //     </Form>
  //   </Container>
  // );
}

export default Textarea;
