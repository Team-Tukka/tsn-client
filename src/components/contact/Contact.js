import React from 'react';
import useForm from 'react-hook-form';
// Importér Reactstrap komponenter
import {
  Col,
  Button,
  Input,
  Container,
  Row,
  FormGroup,
  Form
} from 'reactstrap';

// Komponent som indeholder kontaktform
function Contact() {
  const {
    handleSubmit, // Submit handler wrapper
    register, // Register form fields
    errors // Errors object including error messages
  } = useForm();

  const onSubmit = data => {
    console.log(data); // email & password input's values in an object.
  };
  console.log(errors);

  return (
    <Container className="contentWrapper">
      <h3 className="mb-3">Kontakt os</h3>
      <Form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Row form>
          <Col md={6}>
            <FormGroup>
              {/* <Label for="exampleName">Fornavn</Label> */}
              <Input
                className="inputStyles"
                type="text"
                placeholder="Indtast dit fornavn..."
                name="Fornavn"
                ref={register({ required: true })}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              {/* <Label for="exampleLastName">Efternavn</Label> */}
              <Input
                className="inputStyles"
                type="text"
                placeholder="Indtast dit efternavn..."
                name="Efternavn"
                ref={register({ required: true, maxLength: 80 })}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              {/* <Label for="exampleMail">Email</Label> */}
              <Input
                className="inputStyles"
                type="email"
                placeholder="Indast din email adresse..."
                name="Email"
                ref={register({ required: true, pattern: /^\S+@\S+$/i })}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              {/* <Label for="exampleLastName">Efternavn</Label> */}
              <Input
                className="inputStyles"
                type="tel"
                placeholder="Indtast dit mobil nummer..."
                name="Mobile number"
                ref={register({ required: true, minLength: 6, maxLength: 12 })}
              />
            </FormGroup>
          </Col>
        </Row>

        <FormGroup row>
          <Col sm={12}>
            <Input
              className="inputStyles"
              type="textarea"
              placeholder="Skriv din besked her..."
              name="Besked"
              ref={register({ required: true })}
            />
          </Col>
        </FormGroup>

        <Button type="submit" className="btnStyles">
          Send besked
        </Button>
      </Form>
    </Container>
  );
}

export default Contact;
