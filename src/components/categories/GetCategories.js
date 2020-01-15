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

// Komponent, der renderer alle kategorier i databasen
export function GetCategoriesNotRequired(props) {
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

  // Funktion til at sende data til parent-komponent vha. props
  const sendDate = event => {
    if (props.parentCallback) {
      props.parentCallback(event.target.value);
    }
  };

  // Returnerer et select-input med kategorierne som options
  return (
    <Input
      className="inputStyles"
      type="select"
      name="selectCategory"
      id="chosenCategoryId"
      onChange={sendDate}
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

// Komponent, der renderer to udvalgte kategorier i databasen
export function GetCategoriesById(props) {
  // Definér query til at hente kategorier ud fra ID'er
  const GET_CATEGORIES_BY_IDS = gql`
    {
      getCategoriesByIds(
        input: [
          { _id: "5dea20b6452dd0511c74b87e" }
          { _id: "5df34ec47d346542bc0d34db" }
        ]
      ) {
        _id
        name
      }
    }
  `;

  // Anvend query
  const { loading, error, data } = useQuery(GET_CATEGORIES_BY_IDS);

  if (loading) return <p className="text-center m-3">Loading...</p>;
  if (error) return <p className="text-center m-3">Error!</p>;

  // Funktion til at sende data til parent-komponent vha. props
  const sendDate = event => {
    if (props.parentCallback) {
      props.parentCallback(event.target.value);
    }
  };

  // Returnerer et select-input med kategorierne som options
  return (
    <Input
      required
      className="inputStyles"
      type="select"
      name="selectCategory"
      id="chosenCategoryId"
      onChange={sendDate}
    >
      <option value="" disabled selected>
        Vælg model...
      </option>
      {data.getCategoriesByIds.map((category, index) => {
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

// Komponent, der renderer to udvalgte kategorier i databasen
export function GetCategoriesByIdNotRequired(props) {
  // Definér query til at hente kategorier ud fra ID'er
  const GET_CATEGORIES_BY_IDS = gql`
    {
      getCategoriesByIds(
        input: [
          { _id: "5dea20b6452dd0511c74b87e" }
          { _id: "5df34ec47d346542bc0d34db" }
        ]
      ) {
        _id
        name
      }
    }
  `;

  // Anvend query
  const { loading, error, data } = useQuery(GET_CATEGORIES_BY_IDS);

  if (loading) return <p className="text-center m-3">Loading...</p>;
  if (error) return <p className="text-center m-3">Error!</p>;

  // Funktion til at sende data til parent-komponent vha. props
  const sendDate = event => {
    if (props.parentCallback) {
      props.parentCallback(event.target.value);
    }
  };

  // Returnerer et select-input med kategorierne som options
  return (
    <Input
      className="inputStyles"
      type="select"
      name="selectCategory"
      id="chosenCategoryId"
      onChange={sendDate}
    >
      <option value="" disabled selected>
        Vælg model...
      </option>
      {data.getCategoriesByIds.map((category, index) => {
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
