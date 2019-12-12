import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

// Importér Reactstrap komponenter
import { Input } from 'reactstrap';

// Komponent, der renderer alle kategorier i databasen
function GetCategories() {
  // Definér query til at hente alle kategorier
  const GET_CATEGORIES = gql`
    {
      getCategories {
        _id
        name
      }
    }
  `;

  // Anvend query
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) return <p className="text-center m-3">Loading...</p>;
  if (error) return <p className="text-center m-3">Error!</p>;

  // Returnerer et select-input med kategorierne som options
  return (
    <Input
      required
      className="inputStyles"
      type="select"
      name="selectCategory"
      id="chosenCategoryId"
    >
      <option value="" disabled selected>
        Vælg kategori...
      </option>
      {data.getCategories.map((category, index) => {
        const { _id, name } = category; // Destructuring
        return (
          <option key={_id} value={_id}>
            {name}
          </option>
        );
      })}
    </Input>
  );
}

export default GetCategories;
