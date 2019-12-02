import React from 'react';
import dummyImgSparepart from '../../assets/images/dummyImgSparepart.png';

// Importér Reactstrap komponenter
import {
  Col,
  Card,
  CardHeader,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button
} from 'reactstrap';

// Komponent der renderer alle reservedelkortene (hvert item)
function SparepartCards() {
  return (
    <React.Fragment>
      <Col className="col-sm-6 col-md-4 col-lg-4">
        <Card className="mb-3">
          <CardHeader className="veryLightGreenBg">Enhedsnavn</CardHeader>
          <CardImg width="100%" src={dummyImgSparepart} alt="Dummy image" />
          <CardBody>
            <CardTitle>
              <small className="text-muted">Enhedsnummer</small>
            </CardTitle>
            <CardSubtitle>89,99 DKK</CardSubtitle>
            <CardText>
              Dette er en dummy tekst, som ikke mening give, men sådan er det i
              dette ganske danske land, hvor folk råber og skriger i StudentHub
              på må og få, ja hallo, vi kraner den ind over begyggelse.
            </CardText>
            <Button className="btnStyles">Køb</Button>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
}

export default SparepartCards;
