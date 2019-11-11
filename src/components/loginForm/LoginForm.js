import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import { gql } from "apollo-boost";
import "./LoginForm.css";

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
} from "reactstrap";

// Importér Font Awesome komponenter
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { faAt } from "@fortawesome/free-solid-svg-icons";

// Me query
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

// Login mutation
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
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Håndtér fejl der kan opstå, når der logges ind
  /* Meben brillierer her */

  // Anvend Login mutation
  /* Meben brillierer her */

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
      // login();
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
            <Button className="submitStyles">Log ind</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default LoginForm;
