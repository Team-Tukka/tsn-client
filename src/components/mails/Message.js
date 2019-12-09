import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import './Mail.css';

// Importér Reactstrap komponenter
import { Col } from 'reactstrap';

// Komponent til indbakken med mails.
function Message() {
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
  const { loading, error, data } = useQuery(GET_MAILS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  // Returnér nu alle props for hvert enkel scooter som en tabel-række
  return data.getMails.map((mail, index) => {
    const { _id, message } = mail; // Destructuring
    return <Col key={_id}>{message}</Col>;
  });
}
export default Message;
