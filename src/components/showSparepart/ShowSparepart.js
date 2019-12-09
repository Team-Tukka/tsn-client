import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import './ShowSparepart.css';
import dummyImgSparepart from '../../assets/images/dummyImgSparepart.png';

// Importér Reactstrap komponenter
import { Container } from 'reactstrap';

function ShowSparepart() {
  const { id } = useParams();

  // Definér query til at hente en specific reservedel
  const GET_SPAREPART_BY_ID = gql`
    {
      getSparepartById(_id: "${id}") {
        _id,
      itemNo,
      name,
      price,
      priceVAT,
      categoryId,
      subCategoryId
      }
    }
  `;

  // Anvend query
  const { loading, error, data } = useQuery(GET_SPAREPART_BY_ID);

  if (loading) return <p>Loading...</p>;
  if (error) return <p> Error! </p>;

  return (
    <Container>
      <img src={dummyImgSparepart} width="50%" alt="Splitetegning" />
      <p>{data.getSparepartById.name}</p>
      <p>{data.getSparepartById.itemNo}</p>
      <p>{data.getSparepartById.price}</p>
      <p>{data.getSparepartById.priceVAT}</p>
    </Container>
  );
}
export default ShowSparepart;
