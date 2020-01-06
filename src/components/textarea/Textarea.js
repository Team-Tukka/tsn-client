import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import cityElf from '../../assets/images/cityElf.png';
import cityElf2 from '../../assets/images/cityElf2.png';
import { gql } from 'apollo-boost';
import './Textarea.css';

// Importér Reactstrap komponenter
import { Container, Row, Col } from 'reactstrap';

// Textarea komponent
function Textarea() {
  // Definér mutation til at hente textarea
  const GET_TEXTAREA_BY_ID = gql`
    {
      getTextareaById(_id: "5dcbd28e8d50cf53c4f97a58") {
        _id
        text
      }
    }
  `;

  // Anvend mutation
  const { loading, error, data } = useQuery(GET_TEXTAREA_BY_ID);

  if (loading) return <p className="text-center m-3">Loading...</p>;
  if (error) return <p className="text-center m-3">Error!</p>;

  return (
    <Container className="contentWrapper">
      <Row>
        <Col md={10}>
          <pre
            className="frontpageText"
            dangerouslySetInnerHTML={{ __html: data.getTextareaById.text }}
          />
        </Col>
        <Col md={2}>
          <img src={cityElf} className="img-fluid my-5" alt="City Elf" />
          <img src={cityElf2} className="img-fluid" alt="City Elf" />
        </Col>
      </Row>
    </Container>
  );
}

export default Textarea;
