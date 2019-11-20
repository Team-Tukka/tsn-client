import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import './AddNewUser.css';

// Importér Reactstrap komponenter
import {
  Form,
  InputGroup,
  FormGroup,
  Input,
  Button,
  Alert,
  CustomInput
} from 'reactstrap';

// Komponent, der håndterer oprettelse af ny bruger
function AddNewUser() {
  // States med React Hooks
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

  // Anvend mutation
  const [addUser, { error }] = useMutation(ADD_USER);

  // Håndtér indsendelse af brugeroplysninger
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
    <React.Fragment>
      <h3 className="mb-3">Opret ny bruger</h3>
      <Form className="form" onSubmit={handleSubmit}>
        <FormGroup>
          <InputGroup>
            <Input
              required
              className="inputStyles"
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
          <InputGroup>
            <Input
              required
              className="inputStyles"
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
          <InputGroup>
            <Input
              required
              className="inputStyles"
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
          <InputGroup>
            <Input
              required
              className="inputStyles"
              type="text"
              name="password"
              minLength="8"
              maxLength="32"
              value={password}
              placeholder="Midlertidig adgangskode..."
              onChange={event => setPassword(event.target.value)}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <Input
              required
              className="inputStyles"
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
          <InputGroup>
            <Input
              required
              className="inputStyles"
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
          <InputGroup>
            <Input
              className="inputStyles"
              type="number"
              name="phone"
              minLength="2"
              maxLength="50"
              value={phone}
              placeholder="Telefonnummer..."
              onChange={event => setPhone(parseInt(event.target.value))}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <span style={{ marginRight: '0.4rem' }}>Administrator</span>
            <CustomInput
              type="checkbox"
              id="customCheckbox"
              name="adminRole"
              checked={adminRole}
              onChange={event => setAdminRole(event.target.checked)}
            />
          </InputGroup>
        </FormGroup>
        {/* Vis alert, hvis brugeren oprettes korrekt */}
        {!error && alert === true && (
          <Alert color="success">Brugeren blev oprettet!</Alert>
        )}
        {/* Vis anden alert, hvis der er fejl, og hent fejlen som er beskrevet i mutation fra serveren */}
        {error &&
          error.graphQLErrors.map(({ message }, i) => (
            <Alert color="danger" key={i}>
              {message}
            </Alert>
          ))}
        {/* Knap til at indsende indtastede data */}
        <Button type="submit" className="btnStyles">
          Opret bruger
        </Button>
      </Form>
    </React.Fragment>
  );
}

export default AddNewUser;
