import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { Label } from 'reactstrap';

function GetCategoryName(props) {
  const GET_CATEGORY_NAME = gql`
    {
     getCategoryById(_id: "${props.categoryId}") {
        name
        } 
    }
`;
  // Anvend Query
  const { loading, error, data } = useQuery(GET_CATEGORY_NAME);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return <Label>{data.getCategoryById.name}</Label>;
}

export default GetCategoryName;
