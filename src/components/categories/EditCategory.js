import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

// Importér Reactstrap komponenter
import { Form, Button, Alert } from 'reactstrap';
import { access } from 'fs';

function EditCategory() {
  const [inputId, setInputId] = useState('');
  const [inputName, setInputName] = useState('');
  const [alertStatus, setAlertStatus] = useState(false);

  const GET_CATEGORIES = gql`
    {
      getCategories {
        _id
        name
      }
    }
  `;
  const UPDATE_CATEGORY_BY_ID = gql`
  mutation {
    updateCategoryById(
      _id: "${inputId}"
      input: {
        name: "${inputName}"
      }
    ){
      name
    }
  }
  `;

  const { loading, error, data } = useQuery(GET_CATEGORIES);
  const [updateCategoryById] = useMutation(UPDATE_CATEGORY_BY_ID);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const handleSubmit = event => {
    console.log(inputName, inputId);
    event.preventDefault();
    if (inputName === '') {
      alert('Du skal som minimum udfylde et navn på elscooteren!');
    } else {
      updateCategoryById({
        variables: {
          name: inputName
        }
      });
      // Sæt 'alertStatus' til at være true (så den vises)
      setAlertStatus(true);
    }
  };
  return data.getCategories.map(category => {
    const { _id, name } = category;
    return (
      <Form
        className="form"
        onSubmit={handleSubmit}
        key={_id}
        onChange={event => setInputId(_id)}
      >
        <div>
          <input
            className="inputStyles"
            defaultValue={name}
            onChange={event => setInputName(event.target.value)}
          />

          {/* Knap til at indsende indtastede data */}
          <Button type="submit" className="btnStyles">
            Gem
          </Button>
        </div>
      </Form>
    );
  });
}

export default EditCategory;
