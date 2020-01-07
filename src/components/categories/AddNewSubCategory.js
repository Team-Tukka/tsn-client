import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import client from '../../config/apolloClient';
import s3 from '../../config/spacesConfig';
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
  const [imageFile, setImageFile] = useState('');
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

  // Håndter fejl ifm. billede
  const handleImageError = () => {
    console.log('Fejl!');
  };

  // Håndtér ændring af billede
  const handleImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files);
      const imageUrl =
        'https://tukka.fra1.digitaloceanspaces.com/' +
        event.target.files[0].name;
      setImagePath(imageUrl);
    }
  };

  // Håndtér indsendelse af underkategoriens oplysninger
  const handleSubmit = event => {
    event.preventDefault();
    if (name === '') {
      alert('Du skal som minimum udfylde et navn på underkategorien!');
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
              setImagePath(imageUrl);
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
              document.getElementById('subCategoryImagePath').value = '';
              setImagePath('');
            }
          });
      }
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
            <Input
              className="inputStyles p-2"
              type="file"
              id="subCategoryImagePath"
              accept="images/*"
              onChange={handleImageChange}
            />
          </InputGroup>
        </FormGroup>
        {/* Vis alert, hvis underkategorien oprettes korrekt */}
        {alertStatus === true && (
          <Alert color="success">Splittegningen blev oprettet.</Alert>
        )}
        {/* Knap til at indsende indtastede data */}
        <Button type="submit" className="btnStyles mb-5">
          Tilføj splittegning
        </Button>
      </Form>
    </React.Fragment>
  );
}

export default AddNewSubCategory;
