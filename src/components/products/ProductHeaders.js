/*
Dette komponent kan rendere alle overskrifter (keys) dynamisk.
Da det ikke viste sig at være hensigtsmæssigt i første omgang,
bliver det ikke brugt nogle steder, men jeg har valgt at lade
det blive, idét det rent faktisk virker ret godt, og måske vi
kan anvende det andetsteds.
*/

import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

function ProductHeaders() {
  // Definér først query til at hente array med alle produkter
  const GET_PRODUCTS = gql`
    {
      getProducts {
        _id
        name
        price
        sku
        tags
        brand
        description
        itemNo
        categoryId
        subCategoryId
      }
    }
  `;

  // Anvend query
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <p className="text-center m-3">Loading...</p>;
  if (error) return <p className="text-center m-3">Error!</p>;

  // Initialiser 'header' til at være et objekt med alle keys fra 'getProducts'
  let header = Object.keys(data.getProducts[0]);

  // Returnér nu overskriften (key) for produkternes værdier (values)
  return header.map((key, index) => {
    return <th key={index}>{key}</th>;
  });
}

export default ProductHeaders;
