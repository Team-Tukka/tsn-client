import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import './AddNewUser.css';

// Importér Reactstrap komponenter
import {
  Container,
  Form,
  InputGroup,
  FormGroup,
  Input,
  Label,
  Button,
  Alert,
  CustomInput
} from 'reactstrap';

function AddNewUser() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [adminRole, setAdminRole] = useState(false);
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phone, setPhone] = useState('');
  const [alert, setAlert] = useState(false);

  const ADD_USER = gql`
    mutation addUser(
      $firstName: String!
      $lastName: String!
      $mail: String!
      $password: String!
      $adminRole: Boolean
      $address: String!
      $zipCode: Int!
      $phone: Int
    ) {
      addUser(
        firstName: $firstName
        lastName: $lastName
        mail: $mail
        password: $password
        adminRole: $adminRole
        address: $address
        zipCode: $zipCode
        phone: $phone
      ) {
        _id
        firstName
        lastName
        mail
        password
        adminRole
        address
        zipCode
        phone
        created
        lastLogin
      }
    }
  `;
  const [addUser, { error: mutatuionError }] = useMutation(ADD_USER);

  const handleSubmit = event => {
    event.preventDefault();
    addUser({
      variables: {
        firstName: firstName,
        lastName: lastName,
        mail: mail,
        password: password,
        adminRole: adminRole,
        address: address,
        zipCode: zipCode,
        phone: phone
      }
    });
    setAlert(true);
    setFirstName('');
    setLastName('');
    setMail('');
    setPassword('');
    setAddress('');
    setZipCode('');
    setPhone('');
  };

  return (
    <Container className="contentWrapper">
      <h1>Opret nyt bruger:</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Fornavn</Label>
          <InputGroup>
            <Input
              required
              type="text"
              name="firstName"
              minLength="2"
              maxLength="50"
              value={firstName}
              placeholder="Fornavn..."
              onChange={event => setFirstName(event.target.value)}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label>Efternavn</Label>
          <InputGroup>
            <Input
              required
              type="text"
              name="lastName"
              minLength="2"
              maxLength="50"
              value={lastName}
              placeholder="Efternavn..."
              onChange={event => setLastName(event.target.value)}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label>Mail</Label>
          <InputGroup>
            <Input
              required
              type="email"
              name="mail"
              minLength="2"
              maxLength="50"
              value={mail}
              placeholder="Mail..."
              onChange={event => setMail(event.target.value)}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <InputGroup>
            <Input
              required
              type="text"
              name="password"
              minLength="8"
              maxLength="32"
              value={password}
              placeholder="Midlertidigt password..."
              onChange={event => setPassword(event.target.value)}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label>Adresse</Label>
          <InputGroup>
            <Input
              required
              type="text"
              name="address"
              minLength="2"
              maxLength="50"
              value={address}
              placeholder="Adresse..."
              onChange={event => setAddress(event.target.value)}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label>Postnummer</Label>
          <InputGroup>
            <Input
              required
              type="number"
              name="zipCode"
              minLength="2"
              maxLength="50"
              value={zipCode}
              placeholder="Postnummer..."
              onChange={event => setZipCode(parseInt(event.target.value))}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label>Telefon</Label>
          <InputGroup>
            <Input
              type="number"
              name="phone"
              minLength="2"
              maxLength="50"
              value={phone}
              placeholder="Telefon..."
              onChange={event => setPhone(parseInt(event.target.value))}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label>Adminstrator</Label>
          <InputGroup>
            <CustomInput
              type="checkbox"
              id="exampleCustomCheckbox"
              name="adminRole"
              checked={adminRole}
              onChange={event => setAdminRole(event.target.checked)}
            />
          </InputGroup>
        </FormGroup>
        {alert === true && <Alert>Brugeren blev oprettet!</Alert>}
        <Button type="submit">Opret</Button>
      </Form>
      {mutatuionError && <p>Fejl, prøv igen</p>}
    </Container>
  );
}

export default AddNewUser;
