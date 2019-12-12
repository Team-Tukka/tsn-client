import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

// Importér Reactstrap komponenter
import { Form, Button, Alert, Input } from 'reactstrap';

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

  return data.getCategories.map(category => {
    const { _id, name } = category;

    const handleSubmit = event => {
      event.preventDefault();
      if (inputName === '') {
        alert('Du har ikke lavet nogle ændringer!');
      } else {
        updateCategoryById({
          variables: {
            name: inputName
          }
        });
        setInputName('');
        // Sæt 'alertStatus' til at være true (så den vises)
        setAlertStatus(true);
      }
    };

    const handleId = event => {
      event.preventDefault();
      setInputId(_id);
    };

    const handleName = event => {
      event.preventDefault();
      if (inputId !== '' && inputName !== '' && inputId !== _id) {
        document.getElementById(inputId).reset();
      }

      setInputName(event.target.value);
    };

    return (
      <Form
        id={_id}
        className="form"
        onSubmit={handleSubmit}
        key={_id}
        onChange={handleId}
      >
        <div>
          <Input
            className="inputStylesCategory"
            defaultValue={name}
            id="categoryName"
            placeholder="Navn..."
            onChange={handleName}
          />

          {/* Knap til at indsende indtastede data */}
          <Button type="submit" className="btnStylesCategory">
            Gem
          </Button>
        </div>
      </Form>
    );
  });
}

export default EditCategory;
