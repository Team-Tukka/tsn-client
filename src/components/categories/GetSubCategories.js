import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

// Importér Reactstrap komponenter
import { Input } from 'reactstrap';

// Komponent, der renderer alle underkategorier i databasen
function GetSubCategories() {
  // Definér query til at hente alle underkategorier
  const GET_SUB_CATEGORIES = gql`
    {
      getSubCategories {
        _id
        name
      }
    }
  `;

  // Anvend query
  const { loading, error, data } = useQuery(GET_SUB_CATEGORIES);

  if (loading) return <p className="text-center m-3">Loading...</p>;
  if (error) return <p className="text-center m-3">Error!</p>;

  // Returnerer et select-input med underkategorierne som options
  return (
    <Input
      required
      className="inputStyles"
      type="select"
      name="selectSubCategory"
      id="chosenSubCategoryId"
    >
      <option value="" disabled selected>
        Vælg splittegning...
      </option>
      {data.getSubCategories.map((subCategory, index) => {
        const { _id, name } = subCategory; // Destructuring
        return (
          <option key={_id} value={_id}>
            {name}
          </option>
        );
      })}
    </Input>
  );
}

export default GetSubCategories;
