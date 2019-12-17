import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import client from '../../config/apolloClient';
import GetCategories from './GetCategories';

// Importér Reactstrap komponenter
import {
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormGroup,
  Input,
  Button,
  Alert
} from 'reactstrap';

function AddNewSubCategory() {
  /* Klientens cache ryddes, så vi er sikkre på, at den nye
  underkategori tilføjes, uden man behøver rerendere hele DOM'en */
  client.cache.reset();

  // States med React Hooks
  const [name, setName] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [alertStatus, setAlertStatus] = useState(false);

  // Defineret mutation
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
          categoryId: document.getElementById('chosenCategoryId').value,
          imagePath: imagePath
        }
      });
      // Sæt 'alertStatus' til at være true (så den vises)
      setAlertStatus(true);
      // Clear feltet, så der kan indtastes nye oplysninger
      setName('');
      document.getElementById('chosenCategoryId').value = '';
      setImagePath('');
    }
  };

  return (
    <React.Fragment>
      <Form className="form" onSubmit={handleSubmit}>
        <FormGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText className="inputGroupTextStyles">
                Navn
              </InputGroupText>
            </InputGroupAddon>
            <Input
              required
              className="inputStylesCategory"
              type="text"
              name="name"
              id="categoryName"
              minLength="1"
              maxLength="50"
              value={name}
              placeholder="Navn på splittegning..."
              onChange={event => setName(event.target.value)}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <GetCategories />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText className="inputGroupTextStyles">
                Billedsti
              </InputGroupText>
            </InputGroupAddon>
            <Input
              className="inputStylesCategory"
              type="text"
              name="imagePath"
              id="subCategoryImagePath"
              minLength="1"
              maxLength="50"
              value={imagePath}
              placeholder="Stien til billedet..."
              onChange={event => setImagePath(event.target.value)}
            />
          </InputGroup>
        </FormGroup>
        {/* Vis alert, hvis underkategorien oprettes korrekt */}
        {alertStatus === true && (
          <Alert color="success">Splittegningen blev oprettet.</Alert>
        )}
        {/* Knap til at indsende indtastede data */}
        <Button type="submit" className="btnStyles">
          Tilføj splittegning
        </Button>
      </Form>
    </React.Fragment>
  );
}

export default AddNewSubCategory;
