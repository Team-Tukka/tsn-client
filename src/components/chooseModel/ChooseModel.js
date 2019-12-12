import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
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

// Komponent der renderer kategorier (modelvælger) ifm. reservedele
function ChooseModel() {
  // Definér query til at hente kategorier ud fra ID'er
  const GET_CATEGORIES_BY_IDS = gql`
    {
      getCategoriesByIds(
        input: [
          { _id: "5dea20b6452dd0511c74b87e" }
          { _id: "5df2477a78d789095038b548" }
        ]
      ) {
        _id
        name
      }
    }
  `;

  // Anvend query
  const { loading, error, data } = useQuery(GET_CATEGORIES_BY_IDS);

  if (loading) return <p className="text-center m-3">Loading...</p>;
  if (error) return <p className="text-center m-3">Error!</p>;

  return (
    <Container className="contentWrapper">
      <h3 className="mb-3">Vælg model</h3>
      <Row>
        <CardDeck className="fadeIn">
          <Col className="col-sm-6 col-md-4 col-lg-4 d-flex align-items-stretch">
            <Card className="mb-4 cardHover">
              <CardHeader className="veryLightGreenBg">
                {data.getCategoriesByIds[0].name}
              </CardHeader>
              <Link to={`/chooseSubCategory/${data.getCategoriesByIds[0]._id}`}>
                <CardImg
                  width="100%"
                  className="p-2"
                  src={HS855}
                  alt={data.getCategoriesByIds[0].name}
                />
              </Link>
              <CardBody>
                <CardText>
                  Hvis du leder efter reservedele til vores model{' '}
                  {data.getCategoriesByIds[0].name}, så klik på knappen
                  herunder.
                </CardText>
                <Link
                  to={`/chooseSubCategory/${data.getCategoriesByIds[0]._id}`}
                >
                  <Button className="btnStyles">Se reservedele</Button>
                </Link>
              </CardBody>
            </Card>
          </Col>
          <Col className="col-sm-6 col-md-4 col-lg-4 d-flex align-items-stretch">
            <Card className="mb-4 cardHover">
              <CardHeader className="veryLightGreenBg">
                {data.getCategoriesByIds[1].name}
              </CardHeader>
              <Link to={`/chooseSubCategory/${data.getCategoriesByIds[1]._id}`}>
                <CardImg
                  width="100%"
                  className="p-2"
                  src={HS895}
                  alt={data.getCategoriesByIds[1].name}
                />
              </Link>
              <CardBody>
                <CardText>
                  Hvis du leder efter reservedele til vores model{' '}
                  {data.getCategoriesByIds[1].name}, så klik på knappen
                  herunder.
                </CardText>
                <Link
                  to={`/chooseSubCategory/${data.getCategoriesByIds[1]._id}`}
                >
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
