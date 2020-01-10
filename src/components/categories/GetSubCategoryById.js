import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

function GetSubCategoryById(props) {
  const GET_SUB_CATEGORY_BY_ID = gql`
    {
     getSubCategoryById(_id: "${props.subCategoryId}") {
        name
        } 
    }
  `;

  // Anvend query
  const { loading, error, data } = useQuery(GET_SUB_CATEGORY_BY_ID);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return data.getSubCategoryById.name;
}

export default GetSubCategoryById;
