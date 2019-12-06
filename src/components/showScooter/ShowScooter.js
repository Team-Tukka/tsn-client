import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import './ShowScooter.css';

// Importér Reactstrap komponenter
import {
  Container,
  Row,
  Col
  //   Form,
  //   InputGroup,
  //   FormGroup,
  //   Input,
  //   Button,
  //   Alert,
  //   Tooltip
} from 'reactstrap';

function ShowScooter() {
  const { id } = useParams();

  // Definér query til at hente data for specifik elscooter
  const GET_SCOOTER_BY_ID = gql`
    {
      getScooterById(_id: "${id}") {
        _id
        name
        price
        priceVAT
        sku
        tagsArray
        brand
        description
        itemNo
        categoryId
      }
    }
  `;

  // Anvend query
  const { loading, error, data } = useQuery(GET_SCOOTER_BY_ID);

  if (loading) return <p className="text-center m-3">Loading...</p>;
  if (error) return <p className="text-center m-3">Error!</p>;

  // Initialiserer alle data til konstanter
  const scoName = data.getScooterById.name;
  const scoPrice = data.getScooterById.price;
  const scoSku = data.getScooterById.sku;
  const scoTagsArray = data.getScooterById.tagsArray;
  const scoBrand = data.getScooterById.brand;
  const scoDescription = data.getScooterById.description;
  const scoItemNo = data.getScooterById.itemNo;
  const scoCategoryId = data.getScooterById.categoryId;

  // Løber gennem alle tags og udskriver hvert enkelt som et list item
  const tagCloudItems = scoTagsArray.map(tag => (
    <div>
      <li key={tag} className="tagCloudItemStyles">
        {tag}
      </li>
      <br />
    </div>
  ));
  console.log(scoTagsArray);

  return (
    <Container className="contentWrapper">
      <h3 className="mb-3">{scoName}</h3>
      <Row className="fadeIn">
        <Col>img</Col>
        <Col>
          <ul>
            <li>Enhedsnummer: {scoItemNo}</li>
            <li>Mærke: {scoBrand}</li>
            <li>SKU: {scoSku}</li>
            <li>Kategori: {scoCategoryId}</li>
            <li>Beskrivelse: {scoDescription}</li>
            <li className="priceGlow">{scoPrice}</li>
          </ul>
          <ul>{tagCloudItems}</ul>
        </Col>
      </Row>
    </Container>
  );
}

export default ShowScooter;
