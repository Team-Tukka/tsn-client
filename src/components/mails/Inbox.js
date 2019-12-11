import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { gql } from 'apollo-boost';
import './Mail.css';

// Komponent til indbakken med mails.
function Inbox() {
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
    const { _id, firstName, lastName, title, message } = mail; // Destructuring
    return (
      <Link to={`/mail/${_id}`} className="mailLinks" key={_id}>
        <div className="mailCol">
          <h4 className="name">
            {firstName} {lastName} <small className="date">15:45</small>
          </h4>
          <p className="subject">
            <strong>{title}</strong>
          </p>
          <br></br>

          <span className="description">{message.slice(0, 30) + '...'}</span>
        </div>
      </Link>
    );
  });
}
export default Inbox;
