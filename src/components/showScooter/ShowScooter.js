import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import dummyImgScooter from '../../assets/images/dummyImgScooter.png';
import './ShowScooter.css';
import GetCategoryById from '../categories/GetCategoryById';

// Importér Reactstrap komponenter
import { Container, Row, Col } from 'reactstrap';

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
  const scoPriceVAT = data.getScooterById.priceVAT;
  const scoSku = data.getScooterById.sku;
  const scoTagsArray = data.getScooterById.tagsArray;
  const scoBrand = data.getScooterById.brand;
  const scoDescription = data.getScooterById.description;
  const scoItemNo = data.getScooterById.itemNo;
  const scoCategoryId = data.getScooterById.categoryId;

  // Løber gennem alle tags og udskriver hvert enkelt som et list item
  const tagCloudItems = scoTagsArray.map(tag => (
    <li key={tag} className="tagCloudItemStyles my-2 mr-2">
      {tag}
    </li>
  ));

  return (
    <Container className="contentWrapper">
      <h3 className="mb-3">{scoName}</h3>
      <Row className="fadeIn">
        <Col lg="4" md="3" className="mb-4 mr-5">
          <img
            className="img-fluid"
            src={dummyImgScooter}
            alt={scoName}
            title={scoName}
          />
        </Col>
        <Col lg="7" md="8 ">
          <ul className="list-unstyled textStyles">
            <li>
              <b>Enhedsnummer:</b> {scoItemNo}
            </li>
            <li>
              <b>Mærke:</b> {scoBrand}
            </li>
            <li>
              <b>SKU:</b> {scoSku}
            </li>
            <li>
              <b>Kategori:</b> <GetCategoryById categoryId={scoCategoryId} />
            </li>
            <li className="my-4">{scoDescription}</li>
            <li className="priceGlow">{scoPrice} DKK</li>
            <li className="priceVAT">{scoPriceVAT} DKK inkl. moms</li>
          </ul>
          <ul className="list-unstyled">{tagCloudItems}</ul>
        </Col>
      </Row>
    </Container>
  );
}

export default ShowScooter;
