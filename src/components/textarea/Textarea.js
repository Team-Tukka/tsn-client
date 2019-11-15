import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import './Textarea.css';

// Importér Reactstrap komponenter
import { Container, Row, Col } from 'reactstrap';

function Textarea() {
  const GET_TEXTAREA_BY_ID = gql`
    {
      getTextareaById(_id: "5dcbd28e8d50cf53c4f97a58") {
        _id
        text
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_TEXTAREA_BY_ID);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <Container className="contentWrapper">
      <Row>
        <Col>
          <h1>Forside tekst:</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <pre className="frontpageText">
            {data.getTextareaById.text.replace(/<br\s*\/?>/gi, '\r\n')}
          </pre>
        </Col>
      </Row>
    </Container>
  );
}

export default Textarea;
