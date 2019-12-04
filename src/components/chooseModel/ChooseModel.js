import React from 'react';
import { Link } from 'react-router-dom';
import HS855 from '../../assets/images/HS855.png';
import HS895 from '../../assets/images/HS895.png';
import './ChooseModel.css';

// Importér Reactstrap komponenter
import {
  Container,
  Row,
  Col,
  CardDeck,
  Card,
  CardHeader,
  CardImg,
  CardBody,
  CardText,
  Button
} from 'reactstrap';

// Komponent der renderer modelvælger ifm. reservedele
function ChooseModel() {
  return (
    <Container className="contentWrapper">
      <h3 className="mb-3">Vælg model</h3>
      <Row>
        <CardDeck className="fadeIn">
          <Col className="col-sm-6 col-md-4 col-lg-4 d-flex align-items-stretch">
            <Card className="mb-4 cardHover">
              <CardHeader className="veryLightGreenBg">HS-855</CardHeader>
              <Link to="#">
                <CardImg
                  width="100%"
                  className="p-2"
                  src={HS855}
                  alt="HS-855"
                />
              </Link>
              <CardBody>
                <CardText>
                  Hvis du leder efter reservedele til vores model HS-855, så
                  klik på knappen herunder.
                </CardText>
                <Link to="#">
                  <Button className="btnStyles">Se reservedele</Button>
                </Link>
              </CardBody>
            </Card>
          </Col>
          <Col className="col-sm-6 col-md-4 col-lg-4 d-flex align-items-stretch">
            <Card className="mb-4 cardHover">
              <CardHeader className="veryLightGreenBg">HS-895</CardHeader>
              <Link to="#">
                <CardImg
                  width="100%"
                  className="p-2"
                  src={HS895}
                  alt="HS-895"
                />
              </Link>
              <CardBody>
                <CardText>
                  Hvis du leder efter reservedele til vores model HS-895, så
                  klik på knappen herunder.
                </CardText>
                <Link to="#">
                  <Button className="btnStyles">Se reservedele</Button>
                </Link>
              </CardBody>
            </Card>
          </Col>
        </CardDeck>
      </Row>
    </Container>
  );
}

export default ChooseModel;
