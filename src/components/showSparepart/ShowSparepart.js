import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import './ShowSparepart.css';

// Importér Reactstrap komponenter
import { Container, Row, Col } from 'reactstrap';

function ShowSparepart() {
  const { id } = useParams();

  // Definér query til at hente en specifik reservedel
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

  if (loading) return <p className="text-center m-3">Loading...</p>;
  if (error) return <p className="text-center m-3">Error!</p>;

  // Initialiserer alle data til konstanter
  const spaName = data.getSparepartById.name;
  const spaPrice = data.getSparepartById.price;
  const spaPriceVAT = data.getSparepartById.priceVAT;
  const spaItemNo = data.getSparepartById.itemNo;
  const spaCategoryId = data.getSparepartById.categoryId;
  const spaSubCategoryId = data.getSparepartById.subCategoryId;

  return (
    <Container className="contentWrapper">
      <h3 className="mb-3">{spaName}</h3>
      <Row className="fadeIn">
        <Col>
          <ul className="list-unstyled textStyles">
            <li>
              <b>Enhedsnummer:</b> {spaItemNo}
            </li>
            <li>
              <b>Kategori:</b> {spaCategoryId}
            </li>
            <li className="mb-4">
              <b>Underkategori:</b> {spaSubCategoryId}
            </li>
            <li className="priceGlow">{spaPrice} DKK</li>
            <li className="priceVAT">{spaPriceVAT} DKK inkl. moms</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default ShowSparepart;
