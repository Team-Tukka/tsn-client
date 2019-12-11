import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router';
import { gql } from 'apollo-boost';
import Inbox from './Inbox';
import Message from './Message';
import './Mail.css';

// Importér Reactstrap komponenter
import { Container, Col, Row } from 'reactstrap';

// Komponent til indbakken med mails.
function Mail() {
  const GET_MAILS = gql`
    {
      getMails {
        _id
        firstName
        lastName
        title
        email
        phone
        message
      }
    }
  `;

  // Anvend query
  const { loading, error } = useQuery(GET_MAILS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  // Returnér nu alle props for hvert enkel scooter som en tabel-række
  return (
    <React.Fragment>
      <h3>Mails her</h3>
      <p> Denne side indeholder indbakken </p>
      <Container className="mailContainer">
        <Row>
          <Col xs="4">
            <Inbox />
          </Col>
          <Col>
            <Message />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
export default Mail;
