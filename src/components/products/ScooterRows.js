import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

function ScooterRows() {
  // Definér først query til at hente array med alle elscootere
  const GET_SCOOTERS = gql`
    {
      getScooters {
        _id
        itemNo
        name
        price
        priceVAT
        categoryId
      }
    }
  `;

  // Anvend query
  const { loading, error, data } = useQuery(GET_SCOOTERS);

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

  // Returnér nu alle props for hvert enkel scooter som en tabel-række
  return data.getScooters.map((scooter, index) => {
    const { _id, itemNo, name, price, priceVAT, categoryId } = scooter; // Destructuring
    return (
      <tr key={_id} className="tableRowStyles">
        <td>
          <Link to={`/showScooter/${_id}`} className="linkStyles">
            {itemNo}
          </Link>
        </td>
        <td>
          <Link to="#" className="linkStyles">
            {name}
          </Link>
        </td>
        <td>
          <Link to="#" className="linkStyles">
            {price}
          </Link>
        </td>
        <td>
          <Link to="#" className="linkStyles">
            {priceVAT}
          </Link>
        </td>
        <td>
          <Link to="#" className="linkStyles">
            {categoryId}
          </Link>
        </td>
      </tr>
    );
  });
}

export default ScooterRows;
