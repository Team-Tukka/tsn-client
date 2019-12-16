import React from 'react';
import imgPlaceholder from '../../assets/images/sparepartImgPlaceholder.png';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

// Importér Reactstrap komponenter
import {
  Col,
  Button,
  Card,
  CardHeader,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle
} from 'reactstrap';

function Spareparts() {
  const { id } = useParams();

  // Definér query til at hente reservedele ud fra en underkategoris ID
  const GET_SPAREPARTS_BY_SUB_CATEGORY = gql`
    {
      getSparepartsBySubCategory(subCategoryId: "${id}") {
       _id
       itemNo
       name
       price
       priceVAT
       categoryId
       subCategoryId
      }
    }
  `;

  // Anvend query
  const { loading, error, data } = useQuery(GET_SPAREPARTS_BY_SUB_CATEGORY);

  if (loading)
    return (
      <Col>
        <p className="text-center m-3">Loading...</p>
      </Col>
    );
  if (error)
    return (
      <Col>
        <p className="text-center m-3">Error!</p>
      </Col>
    );

  // Returnér alle reservedele, hvis der findes nogen
  if (data.getSparepartsBySubCategory.length > 0) {
    return data.getSparepartsBySubCategory.map((sparepart, index) => {
      const { _id, itemNo, name, price, priceVAT } = sparepart;
      return (
        <Col
          key={_id}
          className="col-sm-6 col-md-4 col-lg-4 d-flex align-items-stretch"
        >
          <Card className="mb-4 cardHover" style={{ minWidth: '21.5vw' }}>
            <CardHeader className="veryLightGreenBg">{name}</CardHeader>
            <CardImg width="100%" src={imgPlaceholder} alt="" />
            <CardBody>
              <CardTitle>
                <small className="text-muted">{itemNo}</small>
              </CardTitle>
              <CardSubtitle>
                <span className="priceGlow">{price} DKK</span>
              </CardSubtitle>
              <CardSubtitle className="priceVAT mb-4">
                {priceVAT} DKK inkl. moms
              </CardSubtitle>
              <Link to={`/showSparepart/${_id}`}>
                <Button className="btnStyles">Læs mere</Button>
              </Link>
            </CardBody>
          </Card>
        </Col>
      );
    });
  } else {
    return (
      <Col>
        <span className="text-center m-3 pb-4">
          Der findes i øjeblikket ingen reservedele for denne splittegning.
        </span>
      </Col>
    );
  }
}

export default Spareparts;
