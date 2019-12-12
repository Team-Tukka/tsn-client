import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

// Importér Reactstrap komponenter
import { Form, Button, Alert, Input } from 'reactstrap';

function EditSubCategory() {
  const [inputId, setInputId] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputCategoryId, setInputCategoryId] = useState('');
  const [inputImagePath, setInputImagePath] = useState('');
  const [alertStatus, setAlertStatus] = useState(false);

  const GET_SUB_CATEGORIES = gql`
    {
      getSubCategories {
        _id
        name
        categoryId
        imagePath
      }
    }
  `;
  const UPDATE_SUB_CATEGORY_BY_ID = gql`
  mutation {
    updateSubCategoryById(
      _id: "${inputId}"
      input: {
        name: "${inputName}"
        categoryId: "${inputCategoryId}"
        imagePath: "${inputImagePath}"
      }
    ){
      name
      categoryId
      imagePath
    }
  }
  `;

  const { loading, error, data } = useQuery(GET_SUB_CATEGORIES);
  const [updateSubCategoryById] = useMutation(UPDATE_SUB_CATEGORY_BY_ID);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const handleSubmit = event => {
    event.preventDefault();
    if (inputName === '') {
      alert('Du skal som minimum udfylde et navn på underkategorien!');
    } else {
      updateSubCategoryById({
        variables: {
          name: inputName,
          categoryId: inputCategoryId,
          imagePath: inputImagePath
        }
      });
    }

    setInputName('');
    setInputCategoryId('');
    setInputImagePath('');
    // Sæt 'alertStatus' til at være true (så den vises)
    setAlertStatus(true);
    // Sæt 'alertStatus' til at være false efter 3 sekunder
    setTimeout(function() {
      setAlertStatus(false);
    }, 3000);
  };

  return data.getSubCategories.map(subCategory => {
    const { _id, name, categoryId, imagePath } = subCategory; //Destructoring

    // Håndterer statens _id
    const handleId = event => {
      event.preventDefault();
      setInputId(_id);
    };

    // Håndterer statens name
    const handleName = event => {
      event.preventDefault();
      if (
        inputId !== '' &&
        inputName !== '' &&
        inputCategoryId !== '' &&
        inputImagePath !== '' &&
        inputId !== _id
      ) {
        document.getElementById(inputId).reset();
      }
      setInputName(event.target.value);
      if (inputCategoryId !== '' || inputId !== _id) {
        setInputCategoryId(categoryId);
      }
      if (inputImagePath === '' || inputId !== _id) {
        setInputImagePath(imagePath);
      }
    };

    // Håndterer statens categoryId
    const handleCategoryId = event => {
      event.preventDefault();
      if (
        inputId !== '' &&
        inputName !== '' &&
        inputCategoryId !== '' &&
        inputImagePath !== '' &&
        inputId !== _id
      ) {
        document.getElementById(inputId).reset();
      }
      setInputCategoryId(event.target.value);
      if (inputName === '' || inputId !== _id) {
        setInputName(name);
      }
      if (inputImagePath === '' || inputId !== _id) {
        setInputImagePath(imagePath);
      }
    };

    // Håndterer statens imagePath
    const handleImagePath = event => {
      event.preventDefault();
      if (
        inputId !== '' &&
        inputName !== '' &&
        inputCategoryId !== '' &&
        inputImagePath !== '' &&
        inputId !== _id
      ) {
        document.getElementById(inputId).reset();
      }
      setInputImagePath(event.target.value);
      if (inputName === '' || inputId !== _id) {
        setInputName(name);
      }
      if (inputCategoryId === '' || inputId !== _id) {
        setInputCategoryId(categoryId);
      }
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
            className="inputStylesSubCategory"
            defaultValue={name}
            id="subCategoryName"
            placeholder="Navn..."
            onChange={handleName}
          />
          <Input
            className="inputStylesSubCategory"
            defaultValue={categoryId}
            id="subCategoryCategoryId"
            placeholder="Kategori ID..."
            onChange={handleCategoryId}
          />
          <Input
            className="inputStylesSubCategory"
            defaultValue={imagePath}
            id="subCategoryImagePath"
            placeholder="Billedesti..."
            onChange={handleImagePath}
          />
          {/* Vis alert, hvis underkategorien opdateres korrekt */}
          {alertStatus === true && inputId === _id && (
            <Alert color="success" id={inputId}>
              Underkategorien blev opdateret.
            </Alert>
          )}
          {/* Knap til at indsende indtastede data */}
          <Button type="submit" className="btnStylesSubCategory">
            Gem
          </Button>
        </div>
      </Form>
    );
  });
}

export default EditSubCategory;
