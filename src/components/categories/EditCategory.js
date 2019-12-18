import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

// Importér Reactstrap komponenter
import {
  Form,
  Button,
  Alert,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from 'reactstrap';

function EditCategory() {
  // States med React Hooks
  const [inputId, setInputId] = useState('');
  const [inputName, setInputName] = useState('');
  const [alertStatus, setAlertStatus] = useState(false);

  // Defineret query
  const GET_CATEGORIES = gql`
    {
      getCategories {
        _id
        name
      }
    }
  `;

  // Defineret mutation
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

  // Anvend query og mutation
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  const [updateCategoryById] = useMutation(UPDATE_CATEGORY_BY_ID);

  // Håndtér indsendelse af data
  const handleSubmit = event => {
    event.preventDefault();
    if (inputName === '') {
      alert('Du skal udfylde/ændre navnet før du kan gemme!');
    } else {
      updateCategoryById({
        variables: {
          name: inputName
        }
      });
      setInputName('');
      // Sæt 'alertStatus' til at være true (så den vises)
      setAlertStatus(true);
      // Sæt 'alertStatus' til at være false efter 3 sekunder (så den forsvinder)
      setTimeout(function() {
        setAlertStatus(false);
      }, 3000);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return data.getCategories.map(category => {
    const { _id, name } = category; // Destructoring

    // Håndtér statens "_id"
    const handleId = event => {
      event.preventDefault();
      setInputId(_id);
    };

    // Håndtér statens "name"
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
        <InputGroup>
          <InputGroupAddon className="mb-3" addonType="prepend">
            <InputGroupText className="inputGroupTextStyles">
              Navn
            </InputGroupText>
          </InputGroupAddon>
          <Input
            className="inputStylesCategory mb-3"
            defaultValue={name}
            placeholder="Navn på kategori..."
            onChange={handleName}
          />
          <InputGroupAddon addonType="append">
            {/* Knap til at indsende indtastede data */}
            <Button type="submit" className="btnStylesCategory mb-3">
              Gem
            </Button>
          </InputGroupAddon>
        </InputGroup>
        {/* Vis alert, hvis kategorien opdateres korrekt */}
        {alertStatus === true && inputId === _id && (
          <Alert color="success" id={inputId}>
            Kategorien blev opdateret.
          </Alert>
        )}
      </Form>
    );
  });
}

export default EditCategory;
