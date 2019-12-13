import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { gql } from 'apollo-boost';
import './Mail.css';

// Komponent der renderer indbakken med mails
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
        created
      }
    }
  `;

  // Anvend query
  const { loading, error, data } = useQuery(GET_MAILS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return data.getMails
    .slice(0)
    .reverse()
    .map((mail, index) => {
      const { _id, firstName, lastName, title, message, created } = mail; // Destructuring
      return (
        <Link to={`/mail/${_id}`} className="mailLinks" key={_id}>
          <div className="mailCol">
            <h4 className="name">
              {firstName} {lastName}
              <small className="date">{created.slice(0, 5)}</small>
            </h4>
            <p className="subject">
              <strong>{title.slice(0, 38)}</strong>
            </p>
            <span className="description">{message.slice(0, 30) + '...'}</span>
          </div>
        </Link>
      );
    });
}

export default Inbox;
