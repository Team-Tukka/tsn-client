import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import logo from '../../assets/images/logo.png';
import { gql } from 'apollo-boost';
import './LoginForm.css';

// Importér Reactstrap komponenter
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  FormGroup,
  Input,
  Button,
  Alert
} from 'reactstrap';

// Importér Font Awesome komponenter
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { faAt } from '@fortawesome/free-solid-svg-icons';

// ME query defineres
export const ME = gql`
  {
    me {
      _id
      firstName
      lastName
      mail
    }
  }
`;

// Login mutation defineres
export const LOGIN = gql`
  mutation login($mail: String!, $password: String!) {
    login(mail: $mail, password: $password) {
      _id
      firstName
      lastName
      mail
      token
    }
  }
`;

// LoginForm komponent
function LoginForm() {
  // States med React Hooks
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Håndtér fejl der kan opstå, når der logges ind
  const handleError = error => {
    setErrorMessage(error.graphQLErrors[0].message);
  };

  // Anvend Login mutation
  const [login] = useMutation(LOGIN, {
    onError: handleError,
    variables: { mail, password },
    update: (cache, { data }) => {
      cache.reset();
      cache.writeQuery({
        query: ME,
        data: { me: data.login }
      });
      setErrorMessage(null);
      setLoginSuccess(true);
      const timer = setTimeout(() => {
        window.location = '/welcome';
      }, 700);
      return () => clearTimeout(timer);
    },
    onCompleted({ login }) {
      localStorage.setItem('token', JSON.stringify(login.token));
    }
  });

  // Håndtér ændringer i mail input
  const handleMailChange = event => {
    setMail(event.target.value);
  };

  // Håndtér ændringer i password input
  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  // Vis alert box med fejlbesked, når login mislykkes
  const errorNotification = () =>
    errorMessage && <Alert color="danger">{errorMessage}</Alert>;

  // Bestem hvad der skal ske, når der submittes
  const handleSubmit = event => {
    event.preventDefault();
    if (mail && password) {
      login();
    }
  };

  return (
    <Container className="containerStyles">
      <div className="text-center">
        <img src={logo} className="logoStyles" alt="TSN Logo" />
      </div>
      <Form className="form" onSubmit={handleSubmit}>
        <Row>
          <Col>
            <FormGroup>
              <InputGroup>
                <FontAwesomeIcon
                  icon={faAt}
                  className="fontAwesomeStyles"
                ></FontAwesomeIcon>
                <Input
                  required
                  type="email"
                  name="email"
                  id="mail"
                  placeholder="din@mail.dk"
                  className="inputStyles"
                  value={mail}
                  onChange={handleMailChange}
                />
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <InputGroup>
                <FontAwesomeIcon
                  icon={faKey}
                  className="fontAwesomeStyles"
                ></FontAwesomeIcon>
                <Input
                  required
                  type="password"
                  name="password"
                  id="password"
                  placeholder="**********"
                  className="inputStyles"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            {/* Hvis login lykkes */}
            {loginSuccess === true && (
              <Alert color="success">Logger ind...</Alert>
            )}
            {/* Hvis login mislykkes */}
            {errorNotification()}
          </Col>
        </Row>
        <Row>
          <Col>
            <Button className="btnStyles" style={{ float: 'right' }}>
              Log ind
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default LoginForm;
