import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import s3 from '../../config/spacesConfig';
import { GetCategoriesNotRequired } from './GetCategories.js';
import GetCategoryName from './GetCategoryName.js';

// Importér Reactstrap komponenter
import {
  Form,
  Button,
  Alert,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Collapse
} from 'reactstrap';

function EditSubCategory() {
  // States med React Hooks
  const [inputId, setInputId] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputCategoryId, setInputCategoryId] = useState('');
  const [inputImagePath, setInputImagePath] = useState('');
  const [imageFile, setImageFile] = useState('');
  const [alertStatus, setAlertStatus] = useState(false);
  const [categorySwitchOpen, setCategorySwitchOpen] = useState(false);

  // Defineret query
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

  // Defineret mutation
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

  // Anvend query og mutation
  const { loading, error, data } = useQuery(GET_SUB_CATEGORIES);
  const [updateSubCategoryById] = useMutation(UPDATE_SUB_CATEGORY_BY_ID);

  // Håndter fejl ifm. billede
  const handleImageError = () => {
    console.log('Fejl!');
  };

  // Håndtér indsendelse af data
  const handleSubmit = event => {
    event.preventDefault();
    if (inputName === '') {
      alert('Du skal som minimum udfylde/ændre navnet på splittegningen!');
    } else {
      // Håndtér ændring af billede
      if (imageFile && imageFile[0]) {
        const blob = imageFile[0];
        const params = {
          Body: blob,
          Bucket: 'tukka',
          Key: blob.name
        };
        // Uploader filen til DO Space
        s3.putObject(params)
          .on('build', request => {
            request.httpRequest.headers.Host =
              'https://tukka.fra1.digitaloceanspaces.com/';
            request.httpRequest.headers['Content-Length'] = blob.size;
            request.httpRequest.headers['Content-Type'] = blob.type;
            request.httpRequest.headers['x-amz-acl'] = 'public-read';
          })
          .send(err => {
            if (err) handleImageError();
            else {
              const imageUrl =
                'https://tukka.fra1.digitaloceanspaces.com/' + blob.name;
              setInputImagePath(imageUrl);
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
          });
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return data.getSubCategories.map(subCategory => {
    const { _id, name, categoryId, imagePath } = subCategory; // Destructoring

    // Håndtér statens "_id"
    const handleId = event => {
      event.preventDefault();
      setInputId(_id);
    };

    // Håndtér statens "name"
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

    // Håndtér statens "categoryId"
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

    // Håndtér statens "imagePath"
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
      if (event.target.files && event.target.files[0]) {
        setImageFile(event.target.files);
        const imageUrl =
          'https://tukka.fra1.digitaloceanspaces.com/' +
          event.target.files[0].name;
        setInputImagePath(imageUrl);
        console.log(inputImagePath);
      }
      if (inputName === '' || inputId !== _id) {
        setInputName(name);
      }
      if (inputCategoryId === '' || inputId !== _id) {
        setInputCategoryId(categoryId);
      }
    };

    // Toggle-funktion til at vise/skjule dropdown med kategorier
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
        <InputGroup>
          <InputGroupAddon className="mb-3" addonType="prepend">
            <InputGroupText className="inputGroupTextStyles">
              Navn
            </InputGroupText>
          </InputGroupAddon>
          <Input
            className="inputStylesSubCategory mb-3"
            defaultValue={name}
            placeholder="Navn på splittegning..."
            onChange={handleName}
          />
        </InputGroup>
        <GetCategoryName categoryId={categoryId}></GetCategoryName>
        <span className="mx-2">•</span>
        <Link
          to="#"
          className="showHideTextStyles linkStyles"
          onClick={toggleCategory}
        >
          Skift kategori
        </Link>
        <Collapse isOpen={categorySwitchOpen}>
          {inputId === _id && (
            <div className="mb-2">
              <GetCategoriesNotRequired
                parentCallback={handleCategoryId}
              ></GetCategoriesNotRequired>
            </div>
          )}
        </Collapse>
        <InputGroup>
          <Input
            className="inputStylesSubCategory mt-2 mb-3"
            type="file"
            accept="images/*"
            onChange={handleImagePath}
          />
        </InputGroup>
        <img
          style={{ display: 'block' }}
          className="img-fluid"
          src={imagePath}
          alt={imagePath && imagePath.slice(42)}
        />
        {/* Vis alert, hvis splittegningen opdateres korrekt */}
        {alertStatus === true && inputId === _id && (
          <Alert color="success" id={inputId}>
            Splittegningen blev opdateret.
          </Alert>
        )}
        {/* Knap til at indsende indtastede data */}
        <Button type="submit" className="btnStyles mb-4">
          Gem
        </Button>
      </Form>
    );
  });
}

export default EditSubCategory;
