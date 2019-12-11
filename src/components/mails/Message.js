import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router';
import { gql } from 'apollo-boost';
import './Mail.css';

// Importér Reactstrap komponenter
import { Col } from 'reactstrap';

// // Komponent til indbakken med mails.
// export function GetMessageById() {
// Deklarér konstanter som initialiseres til at være elscooterens data
// const mailId = data.getMailById._id;
// const mailFirstName = data.getMailById.firstName;
// const mailLastName = data.getMailById.lastName;
// const mailTitle = data.getMailById.title;
// const mailEmail = data.getMailById.email;
// const mailPhone = data.getMailById.phone;
// const mailMessage = data.getMailById.message;

//   // Returnér 'EditScooter' komponentet med konstanterne som props
//   return (
//     <Message
//       mailId={mailId}
//       mailFirstName={mailFirstName}
//       mailLastName={mailLastName}
//       mailTitle={mailTitle}
//       mailEmail={mailEmail}
//       mailPhone={mailPhone}
//       mailMessage={mailMessage}
//     />
//   );
// }

function Message() {
  // // Deklarér konstanter, som initialiseres til at være de medsendte props
  // const mailId = props.mailId;
  // const mailFirstName = props.mailFirstName;
  // const mailLastName = props.mailLastName;
  // const mailTitle = props.mailTitle;
  // const mailEmail = props.mailEmail;
  // const mailPhone = props.mailPhone;
  // const mailMessage = props.mailMessage;

  // // States med React Hooks
  // const [firstName, setFirstName] = useState(mailFirstName);
  // const [lastName, setLastName] = useState(mailLastName);
  // const [title, setTitle] = useState(mailTitle);
  // const [email, setEmail] = useState(mailEmail);
  // const [phone, setPhone] = useState(mailPhone);
  // const [message, setMessage] = useState(mailMessage);

  const { id } = useParams();
  console.log({ id });
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
  if (error) return <p>Error!</p>;

  const mailId = data.getMailById._id;
  const mailFirstName = data.getMailById.firstName;
  const mailLastName = data.getMailById.lastName;
  const mailTitle = data.getMailById.title;
  const mailEmail = data.getMailById.email;
  const mailPhone = data.getMailById.phone;
  const mailMessage = data.getMailById.message;

  // Returnér nu alle props for hvert enkel scooter som en tabel-række
  return <p>{mailMessage}</p>;
}

export default Message;
