import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import GetSubCategoryById from '../categories/GetSubCategoryById';

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
        subCategoryId
      }
    }
  `;

  // Anvend query
  const { loading, error, data } = useQuery(GET_SPAREPARTS);

  // Tjekker feljbeskeden og fjerner 'GraphQL error' fra strengen.
  const errorHandler = () => {
    if (error.message === 'GraphQL error: Ingen reservedele fundet!') {
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

  // Returnér nu alle props for hvert enkel reservedel som en tabel-række
  return data.getSpareparts.map((sparepart, index) => {
    const { _id, itemNo, name, price, priceVAT, subCategoryId } = sparepart; // Destructuring
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
            {price} DKK
          </Link>
        </td>
        <td>
          <Link to={`/editSparepart/${_id}`} className="linkStyles">
            {priceVAT} DKK
          </Link>
        </td>
        <td>
          <Link to={`/editSparepart/${_id}`} className="linkStyles">
            <GetSubCategoryById subCategoryId={subCategoryId} />
          </Link>
        </td>
      </tr>
    );
  });
}

export default SparepartRows;
