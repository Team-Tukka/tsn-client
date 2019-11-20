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
  // Gør brug af useState til at sætte værdierne, der skal sendes til DB.
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [adminRole, setAdminRole] = useState(false);
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phone, setPhone] = useState('');
  const [alert, setAlert] = useState(false);

  // Opsætter addUser mutation
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
  // Konstanter, som gør det muligt at bruge mutation og hente errors
  const [addUser, { error }] = useMutation(ADD_USER);

  // Funktion til at håndtere submit
  const handleSubmit = event => {
    event.preventDefault();
    // setErrorAlert(false);
    // setAlert(false);

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

    // if (!error) {
    setAlert(true);

    //   setFirstName('');
    //   setLastName('');
    //   setMail('');
    //   setPassword('');
    //   setAddress('');
    //   setZipCode('');
    //   setPhone('');
    // }

    // if ({ error }) {
    //   setErrorAlert(true);
    //   console.log({ error });
    //   console.log('fejl?');
    // } else {
    // setAlert(true);
    //   setFirstName('');
    //   setLastName('');
    //   setMail('');
    //   setPassword('');
    //   setAddress('');
    //   setZipCode('');
    //   setPhone('');
    // }

    // console.log(error.graphQLErrors.map(({ message }) == "Mailen er allerede i brug"));
  };

  return (
    <Container className="contentWrapper">
      <h1 className="mb-4">Opret nyt bruger:</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Fornavn</Label>
          <InputGroup>
            <Input
              className="inputStyles"
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
              className="inputStyles"
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
              className="inputStyles"
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
              className="inputStyles"
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
              className="inputStyles"
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
              className="inputStyles"
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
              className="inputStyles"
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
        {/* Opsætter alert hvis der ikke er nogen fejl */}
        {!error && alert === true && (
          <Alert color="success">Brugeren blev oprettet!</Alert>
        )}

        {/* Opsætter alert hvis der er fejl, samt henter fejlen som er beskrevet i mutation fra serveren */}
        {error &&
          error.graphQLErrors.map(({ message }, i) => (
            <Alert color="danger" key={i}>
              {message}
            </Alert>
          ))}
        <Button type="submit" className="btnStyles">
          Opret
        </Button>
      </Form>
    </Container>
  );
}

export default AddNewUser;
