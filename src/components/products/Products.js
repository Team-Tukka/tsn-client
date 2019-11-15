import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

// Komponent, der renderer alle produkter
function Products() {
  // Definér query til at hente alle produkter
  const GET_CUSTOMERS = gql`
    {
      getCustomers {
        _id
        name
        vatNo
      }
    }
  `;

  // Anvend query
  const { loading, error, data } = useQuery(GET_CUSTOMERS);

  if (loading)
    return (
      <tr>
        <td>Loading...</td>
      </tr>
    );
  if (error)
    return (
      <tr>
        <td>Error!</td>
      </tr>
    );
  return data.getCustomers.map(({ _id, name, vatNo }) => (
    <tr key={_id}>
      <td>
        <Link to={`/dashboard/customers/${_id}`}>{name}</Link>
      </td>
      <td>
        <Link to={`/dashboard/customers/${_id}`}>{vatNo}</Link>
      </td>
    </tr>
  ));
}

export default Products;
