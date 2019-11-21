import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

function ProductRows() {
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

  // Returnér nu alle props for hvert enkelt produkt som en tabel-række
  return data.getProducts.map((product, index) => {
    const {
      _id,
      name,
      price,
      sku,
      brand,
      description,
      itemNo,
      categoryId
    } = product; // Destructuring
    return (
      <tr key={_id} className="tableRowStyles">
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
            {sku}
          </Link>
        </td>
        <td>
          <Link to="#" className="linkStyles">
            {brand}
          </Link>
        </td>
        <td>
          <Link to="#" className="linkStyles">
            {description.slice(0, 20)}...
          </Link>
        </td>
        <td>
          <Link to="#" className="linkStyles">
            {itemNo}
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

export default ProductRows;
