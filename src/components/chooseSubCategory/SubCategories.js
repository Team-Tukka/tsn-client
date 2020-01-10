import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router';
import { gql } from 'apollo-boost';

// Importér Reactstrap komponenter
import { ListGroupItem } from 'reactstrap';

function SubCategories() {
  const { id } = useParams();

  // Definér query til at hente underkategorier ud fra kategoriens ID
  const GET_SUB_CATEGORIES_BY_CATEGORY_ID = gql`
    {
        getSubCategoriesByCategoryId(categoryId: "${id}") {
        _id
        name
    
      }
    }
  `;

  // Anvend query
  const { loading, error, data } = useQuery(GET_SUB_CATEGORIES_BY_CATEGORY_ID);

  if (loading) return <p className="text-center m-3">Loading...</p>;
  if (error) return <p className="text-center m-3">Error!</p>;

  // Returnér alle underkategorier, hvis der findes nogen
  if (data.getSubCategoriesByCategoryId.length > 0) {
    return data.getSubCategoriesByCategoryId.map(subCategory => {
      const { _id, name } = subCategory; // Destructuring
      return (
        <ListGroupItem key={_id} className="listGroupItem">
          <Link to={`/showSubCategory/${_id}`} className="linkStyles">
            {name}
          </Link>
        </ListGroupItem>
      );
    });
  } else {
    return (
      <p>Der findes i øjeblikket ingen splittegninger for den valgte model.</p>
    );
  }
}

export default SubCategories;
