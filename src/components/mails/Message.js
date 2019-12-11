import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router';
import { gql } from 'apollo-boost';

import './Mail.css';

// Importér Font Awesome komponenter
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';

function Message() {
  const { id } = useParams();
  const GET_MAIL_BY_ID = gql`
    {
      getMailById(_id: "${id}") {
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
  const { loading, error, data } = useQuery(GET_MAIL_BY_ID);

  if (loading) return <p>Loading...</p>;

  if (error) return <p></p>;

  // const mailId = data.getMailById._id;
  const mailFirstName = data.getMailById.firstName;
  const mailLastName = data.getMailById.lastName;
  const mailTitle = data.getMailById.title;
  const mailEmail = data.getMailById.email;
  const mailPhone = data.getMailById.phone;
  const mailMessage = data.getMailById.message;

  // Returnér nu alle props for hvert enkel scooter som en tabel-række

  return (
    <div className="messageCon">
      <h4 className="name">
        {mailFirstName} {mailLastName}
      </h4>
      <p>
        {' '}
        <FontAwesomeIcon
          icon={faAt}
          className="fontAwesomeAtStyle"
        ></FontAwesomeIcon>
        {mailEmail}
      </p>
      <p>
        <FontAwesomeIcon
          icon={faPhoneAlt}
          className="fontAwesomeAtStyle"
        ></FontAwesomeIcon>
        {mailPhone}{' '}
      </p>
      <hr></hr>
      <p className="subject">
        <strong>{mailTitle}</strong>
      </p>

      <p>{mailMessage}</p>
    </div>
  );
}

export default Message;
