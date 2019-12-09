import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import './ShowSubCategory.css';
import Spareparts from './Spareparts.js';
import dummyImgDrawing from '../../assets/images/dummyImgDrawing.jpg';

// Importér Reactstrap komponenter
import { Container, Row, CardDeck } from 'reactstrap';

function ShowSubCategory() {
  const { id } = useParams();

  // Definér query til at hente en specifik underkategori
  const GET_SUB_CATEGORY_BY_ID = gql`
    {
      getSubCategoryById(_id: "${id}") {
        _id
        name
        categoryId
        imagePath
      }
    }
  `;

  // Anvend query
  const { loading, error, data } = useQuery(GET_SUB_CATEGORY_BY_ID);

  if (loading) return <p>Loading...</p>;
  if (error) return <p> Error! </p>;

  return (
    <Container className="contentWrapper">
      <h3>{data.getSubCategoryById.name}</h3>
      <img src={dummyImgDrawing} width="100%" alt="Splittegning" />
      <h3>Reservedele</h3>
      <Row>
        <CardDeck className="fadeIn">
          <Spareparts />
        </CardDeck>
      </Row>
    </Container>
  );
}
export default ShowSubCategory;
