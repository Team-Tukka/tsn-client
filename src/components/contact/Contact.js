import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import './Contact.css';

// Importér Reactstrap komponenter
import {
  Col,
  Button,
  Input,
  Container,
  Row,
  FormGroup,
  Form,
  Alert
} from 'reactstrap';

// Komponent som indeholder kontaktform
function Contact() {
  // States med React Hooks
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [alertStatus, setAlertStatus] = useState(false);

  // Definér mutation til at komponere mail
  const ADD_MAIL = gql`
    mutation addMail(
      $firstName: String!
      $lastName: String!
      $email: String!
      $phone: Int
      $title: String!
      $message: String!
    ) {
      addMail(
        firstName: $firstName
        lastName: $lastName
        email: $email
        phone: $phone
        title: $title
        message: $message
      ) {
        firstName
        lastName
        email
        phone
        title
        message
        created
      }
    }
  `;

  // Anvend mutation
  const [addMail] = useMutation(ADD_MAIL);

  // Bestem hvad der skal ske, når der submittes
  const handleSubmit = event => {
    event.preventDefault();
    addMail({
      variables: {
        firstName: firstName,
        lastName: lastName,
        email: mail,
        phone: phone,
        title: title,
        message: message
      }
    });
    // Sæt 'alertStatus' til at være true (så den vises)
    setAlertStatus(true);
    // Clear felter, så der kan indtastes nye oplysninger
    setFirstName('');
    setLastName('');
    setMail('');
    setPhone('');
    setTitle('');
    setMessage('');
    document.getElementById('contactPhone').value = '';
  };

  return (
    <Container className="contentWrapper">
      <h3 className="mb-3">Kontakt os</h3>
      <Form className="form" onSubmit={handleSubmit}>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Input
                required
                className="inputStyles"
                type="text"
                placeholder="Indtast dit fornavn..."
                name="firstName"
                value={firstName}
                onChange={event => setFirstName(event.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Input
                required
                className="inputStyles"
                type="text"
                placeholder="Indtast dit efternavn..."
                name="lastName"
                value={lastName}
                onChange={event => setLastName(event.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Input
                required
                className="inputStyles"
                type="email"
                placeholder="Indast din emailadresse..."
                name="mail"
                value={mail}
                onChange={event => setMail(event.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Input
                className="inputStyles"
                id="contactPhone"
                type="tel"
                pattern="^[0-9]*$"
                maxLength="8"
                minLength="8"
                placeholder="Indtast dit mobilnummer..."
                name="phone"
                onChange={event => setPhone(parseInt(event.target.value))}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <FormGroup>
              <Input
                required
                className="inputStyles"
                type="text"
                placeholder="Indtast en titel her..."
                name="title"
                value={title}
                onChange={event => setTitle(event.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup row>
          <Col sm={12}>
            <Input
              required
              className="inputStyles"
              type="textarea"
              placeholder="Skriv din besked her..."
              name="message"
              value={message}
              onChange={event => setMessage(event.target.value)}
            />
          </Col>
        </FormGroup>
        {alertStatus === true && (
          <Alert color="success">Beskeden er blevet sendt.</Alert>
        )}
        <Button type="submit" className="btnStyles">
          Send besked
        </Button>
      </Form>
    </Container>
  );
}

export default Contact;
