import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router';
import { gql } from 'apollo-boost';
import './ChooseSubCategory.css';

// Importér Reactstrap komponenter
import { Container, Row, Col, Card, CardHeader } from 'reactstrap';

function SubCategories() {
  const { id } = useParams();
  const GET_SUB_CATEGORIES_BY_CATEGORY_ID = gql`
    {
        getSubCategoriesByCategoryId(_id: "${id}") {
        _id
        name
    
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_SUB_CATEGORIES_BY_CATEGORY_ID);

  if (loading) return <p className="text-center m-3">Loading...</p>;
  if (error) return <p className="text-center m-3">Error!</p>;

  return data.getSubCategoriesByCategoryId.map(subCategory => {
    const { _id, name } = subCategory; // Destructuring

    return (
      <Col
        key={_id}
        className="col-sm-6 col-md-4 my-3 col-lg-4 d-flex align-items-stretch "
      >
        <Card>
          <Link to="#" className="linkStyles">
            <CardHeader className="veryLightGreenBg">{name}</CardHeader>
          </Link>
        </Card>
      </Col>
    );
  });
}

export default SubCategories;
