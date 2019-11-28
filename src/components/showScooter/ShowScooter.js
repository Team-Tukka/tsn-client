import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import './ShowScooter.css';

// Importér Reactstrap komponenter
import {
  Container
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

  // Definér query og mutation til at tilføje ny elscooter
  const GET_SCOOTER_BY_ID = gql`
    {
      getScooterById(_id: "${id}") {
        _id
        name
        price
        priceVAT
        sku
        tags
        brand
        description
        itemNo
        categoryId
        subCategoryId
      }
    }
  `;

  // Anvend query
  const { loading, error, data } = useQuery(GET_SCOOTER_BY_ID);

  if (loading) return <p>Loading...</p>;
  if (error) return <p> Error! </p>;

  const scoId = data.getScooterById._id;
  const scoName = data.getScooterById.name;
  const scoPrice = data.getScooterById.price;
  const scoSku = data.getScooterById.sku;
  const scoTags = data.getScooterById.tags;
  const scoBrand = data.getScooterById.brand;
  const scoDescription = data.getScooterById.description;
  const scoItemNo = data.getScooterById.itemNo;
  const scoCategoryId = data.getScooterById.categoryId;
  const scoSubCategoryId = data.getScooterById.subCategoryId;

  return (
    <Container>
      <p>{scoId}</p>
      <p>{scoName}</p>
      <p>{scoPrice}</p>
      <p>{scoSku}</p>
      <p>{scoTags}</p>
      <p>{scoBrand}</p>
      <p>{scoDescription}</p>
      <p>{scoItemNo}</p>
      <p>{scoCategoryId}</p>
      <p>{scoSubCategoryId}</p>
    </Container>
  );
}
export default ShowScooter;
