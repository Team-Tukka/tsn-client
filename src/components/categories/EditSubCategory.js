import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import GetCategories from './GetCategories.js';
import GetCategoryName from './GetCategoryName.js';

// Importér Reactstrap komponenter
import { Form, Button, Alert, Input, Collapse } from 'reactstrap';

function EditSubCategory() {
  const [inputId, setInputId] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputCategoryId, setInputCategoryId] = useState('');
  const [inputImagePath, setInputImagePath] = useState('');
  const [alertStatus, setAlertStatus] = useState(false);
  const [categorySwitchOpen, setCategorySwitchOpen] = useState(false);

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

  // Håndter indsendelse af data
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
    setCategorySwitchOpen(false);
    // Sæt 'alertStatus' til at være true (så den vises)
    setAlertStatus(true);
    // Sæt 'alertStatus' til at være false efter 3 sekunder (så den forsvinder)
    setTimeout(function() {
      setAlertStatus(false);
    }, 3000);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return data.getSubCategories.map(subCategory => {
    const { _id, name, categoryId, imagePath } = subCategory; // Destructoring
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
    const handleCategoryId = childData => {
      if (
        inputId !== '' &&
        inputName !== '' &&
        inputCategoryId !== '' &&
        inputImagePath !== '' &&
        inputId !== _id
      ) {
        document.getElementById(inputId).reset();
      }
      setInputCategoryId(childData);

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
    // Toggle til "skift kategori" - knap
    const toggleCategory = () => {
      setInputId(_id);
      if (inputId === '' || inputId !== _id) {
        setCategorySwitchOpen(true);
      } else {
        setCategorySwitchOpen(!categorySwitchOpen);
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
        <Input
          className="inputStylesSubCategory"
          defaultValue={name}
          id="subCategoryName"
          placeholder="Navn..."
          onChange={handleName}
        />
        <GetCategoryName categoryId={categoryId}></GetCategoryName>{' '}
        <Button className="btnStylesCategory" onClick={toggleCategory}>
          Skift kategori
        </Button>
        <Collapse isOpen={categorySwitchOpen}>
          {inputId === _id && (
            <GetCategories parentCallback={handleCategoryId}></GetCategories>
          )}
        </Collapse>
        <Input
          className="my-2 inputStylesSubCategory "
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
      </Form>
    );
  });
}

export default EditSubCategory;
