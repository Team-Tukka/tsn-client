import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import client from '../../config/apolloClient';

// Importér Reactstrap komponenter
import { Form, InputGroup, FormGroup, Input, Button, Alert } from 'reactstrap';

function AddNewSubCategory() {
  /* Klientens cache ryddes, så vi er sikkre på, at den nye
  elscooter tilføjes, uden man behøver rerendere hele DOM'en */
  client.cache.reset();

  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [alertStatus, setAlertStatus] = useState(false);

  const ADD_SUB_CATEGORY = gql`
    mutation addSubCategory(
      $name: String!
      $categoryId: String!
      $imagePath: String!
    ) {
      addSubCategory(
        name: $name
        categoryId: $categoryId
        imagePath: $imagePath
      ) {
        name
        categoryId
        imagePath
      }
    }
  `;

  // Anvend mutation
  const [addSubCategory] = useMutation(ADD_SUB_CATEGORY);

  // Håndtér indsendelse af underkategoriens oplysninger
  const handleSubmit = event => {
    event.preventDefault();
    if (name === '') {
      alert('Du skal som minimum udfylde et navn på underkategorien!');
    } else {
      addSubCategory({
        variables: {
          name: name,
          categoryId: categoryId,
          imagePath: imagePath
        }
      });
      // Sæt 'alertStatus' til at være true (så den vises)
      setAlertStatus(true);
      // Clear feltet, så der kan indtastes nye oplysninger
      setName('');
      setCategoryId('');
      setImagePath('');
    }
  };

  return (
    <React.Fragment>
      <Form className="form" onSubmit={handleSubmit}>
        <FormGroup>
          <InputGroup>
            <Input
              required
              className="inputStyles"
              type="text"
              name="name"
              id="categoryName"
              minLength="1"
              maxLength="50"
              value={name}
              placeholder="Navn..."
              onChange={event => setName(event.target.value)}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <Input
              required
              className="inputStyles"
              type="text"
              name="categoryId"
              id="subCategoryCategoryId"
              minLength="1"
              maxLength="50"
              value={categoryId}
              placeholder="Kategori ID..."
              onChange={event => setCategoryId(event.target.value)}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <Input
              className="inputStyles"
              type="text"
              name="imagePath"
              id="subCategoryImagePath"
              minLength="1"
              maxLength="50"
              value={imagePath}
              placeholder="Billedesti..."
              onChange={event => setImagePath(event.target.value)}
            />
          </InputGroup>
        </FormGroup>
        {/* Vis alert, hvis underkategorien oprettes korrekt */}
        {alertStatus === true && (
          <Alert color="success">Underkategorien blev oprettet.</Alert>
        )}
        {/* Knap til at indsende indtastede data */}
        <Button type="submit" className="btnStyles">
          Tilføj underkategori
        </Button>
      </Form>
    </React.Fragment>
  );
}

export default AddNewSubCategory;
