import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import './ShowSubCategory.css';
import dummyImgSparepart from '../../assets/images/dummyImgSparepart.png';

// Importér Reactstrap komponenter
import {
  Row,
  Col,
  Button,
  CardDeck,
  Card,
  CardHeader,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle
} from 'reactstrap';

function ShowSpareparts() {
  const { id } = useParams();

  // Definér query og mutation til at tilføje ny elscooter
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p> Error! </p>;
  return data.getSparepartsBySubCategory.map((sparepart, index) => {
    const {
      _id,
      itemNo,
      name,
      price,
      priceVAT,
      categoryId,
      subCategoryId
    } = sparepart;
    return (
      <Col
        key={_id}
        className="col-sm-6 col-md-4 col-lg-4 d-flex align-items-stretch"
      >
        <Card className="mb-4 cardHover">
          <CardHeader className="veryLightGreenBg">{name}</CardHeader>
          <Link to={`/showSparepart/${_id}`}>
            <CardImg
              width="100%"
              className="p-2"
              src={dummyImgSparepart}
              alt="Splittening"
            />
          </Link>
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
}
export default ShowSpareparts;
