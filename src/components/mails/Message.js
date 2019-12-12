import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useParams } from 'react-router';
import { gql } from 'apollo-boost';
import './Mail.css';

// Importér Reactstrap komponenter
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// Importér Font Awesome komponenter
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';

function Message() {
  const { id } = useParams();
  
  // States med React Hooks
  const [modal, setModal] = useState(false);

  // Query til at hente en specifik mail ud fra ID
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

  // Mutation til at slette en mail
  const DELETE_MAIL_BY_ID = gql`
    mutation {
      deleteMailById(_id: "${id}") {
        _id
      }
    }
  `;
  
  // Anvend query & mutations
  const { loading, error, data } = useQuery(GET_MAIL_BY_ID);
  const [deleteMailById] = useMutation(DELETE_MAIL_BY_ID);

  if (loading) return <p>Loading...</p>;
  if (error) return <p></p>;

  const mailFirstName = data.getMailById.firstName;
  const mailLastName = data.getMailById.lastName;
  const mailTitle = data.getMailById.title;
  const mailEmail = data.getMailById.email;
  const mailPhone = data.getMailById.phone;
  const mailMessage = data.getMailById.message;

  // Slet mailen for evigt
  const handleDelete = () => {
    setModal(!modal);
    deleteMailById();
    window.location.replace('/welcome');
  };

  // Toggle modal vinduet til sletning
  const toggleModal = () => setModal(!modal);

  return (
    <div className="messageCon">
      <h4 className="name">
        {mailFirstName} {mailLastName}
      </h4>
      <p>
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
        {mailPhone}
      </p>
      <Button onClick={toggleModal} className="dangerBtnStylesMail">
        Slet mailen
      </Button>
      {/* Modal vindue med mulighed for endegyldig sletning */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          Du er ved at slette mailen!
        </ModalHeader>
        <ModalBody>
          Det er ikke muligt at genskabe en slettet mail.
          <br />
          Er du sikker på, at du vil fortsætte?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDelete}>
            Ja!
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Nej!
          </Button>
        </ModalFooter>
      </Modal>
      <hr></hr>
      <p className="subject">
        <strong>{mailTitle}</strong>
      </p>
      <p>{mailMessage}</p>
    </div>
  );
}

export default Message;
