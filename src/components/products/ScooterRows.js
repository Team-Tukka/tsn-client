import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import GetCategoryById from '../categories/GetCategoryById';

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

  // Tjekker feljbeskeden og fjerner 'GraphQL error' fra strengen.
  const errorHandler = () => {
    if (error.message === 'GraphQL error: Ingen elscootere fundet!') {
      return error.message.slice(15);
    } else {
      return 'Error!';
    }
  };

  if (loading)
    return (
      <tr>
        <td>Loading...</td>
      </tr>
    );
  if (error)
    return (
      <tr>
        <td>{errorHandler()}</td>
      </tr>
    );

  // Returnér nu alle props for hvert enkel scooter som en tabel-række
  return data.getScooters.map((scooter, index) => {
    const { _id, itemNo, name, price, priceVAT, categoryId } = scooter; // Destructuring
    return (
      <tr key={_id} className="tableRowStyles">
        <td>
          <Link to={`/editScooter/${_id}`} className="linkStyles">
            {itemNo}
          </Link>
        </td>
        <td>
          <Link to={`/editScooter/${_id}`} className="linkStyles">
            {name}
          </Link>
        </td>
        <td>
          <Link to={`/editScooter/${_id}`} className="linkStyles">
            {price} DKK
          </Link>
        </td>
        <td>
          <Link to={`/editScooter/${_id}`} className="linkStyles">
            {priceVAT} DKK
          </Link>
        </td>
        <td>
          <Link to={`/editScooter/${_id}`} className="linkStyles">
            <GetCategoryById categoryId={categoryId} />
          </Link>
        </td>
      </tr>
    );
  });
}

export default ScooterRows;
