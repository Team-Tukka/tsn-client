import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

function SparepartRows() {
  // Definér først query til at hente array med alle reservedele
  const GET_SPAREPARTS = gql`
    {
      getSpareparts {
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
  const { loading, error, data } = useQuery(GET_SPAREPARTS);

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

  // Returnér nu alle props for hvert enkel reservedel som en tabel-række
  return data.getSpareparts.map((sparepart, index) => {
    const { _id, itemNo, name, price, priceVAT, categoryId } = sparepart; // Destructuring
    return (
      <tr key={_id} className="tableRowStyles">
        <td>
          <Link to={`/editSparepart/${_id}`} className="linkStyles">
            {itemNo}
          </Link>
        </td>
        <td>
          <Link to={`/editSparepart/${_id}`} className="linkStyles">
            {name}
          </Link>
        </td>
        <td>
          <Link to={`/editSparepart/${_id}`} className="linkStyles">
            {price}
          </Link>
        </td>
        <td>
          <Link to={`/editSparepart/${_id}`} className="linkStyles">
            {priceVAT}
          </Link>
        </td>
        <td>
          <Link to={`/editSparepart/${_id}`} className="linkStyles">
            {categoryId}
          </Link>
        </td>
      </tr>
    );
  });
}

export default SparepartRows;
