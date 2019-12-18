import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

function GetCategoryById(props) {
  // Definér query til at hente en specifik underkategoris navn
  const GET_SUB_CATEGORY_BY_ID = gql`
    {
     getCategoryById(_id: "${props.categoryId}") {
        name
        } 
    }
  `;

  // Anvend query
  const { loading, error, data } = useQuery(GET_SUB_CATEGORY_BY_ID);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return data.getCategoryById.name;
}

export default GetCategoryById;
