import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import client from '../../config/apolloClient';
import './AddNewScooter.css';

// Importér Reactstrap komponenter
import {
  Form,
  InputGroup,
  FormGroup,
  Input,
  Button,
  Alert,
  Collapse,
  CardBody,
  Card
} from 'reactstrap';

// Komponent, der håndterer oprettelse af ny elscooter
function AddNewScooter() {
  /* Klientens cache ryddes, så vi er sikkre på, at den nye
  elscooter tilføjes, uden man behøver rerendere hele DOM'en */
  client.cache.reset();

  // States med React Hooks
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [sku, setSku] = useState('');
  const [tags, setTags] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [itemNo, setItemNo] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [subCategoryId, setSubCategoryId] = useState('');
  const [alertStatus, setAlertStatus] = useState(false);
  const [HelpIsOpen, setHelpIsOpen] = useState(false);

  // Definér mutation til at tilføje ny elscooter
  const ADD_SCOOTER = gql`
    mutation addScooter(
      $name: String!
      $price: Float!
      $sku: String
      $tags: String
      $brand: String
      $description: String
      $itemNo: String!
      $categoryId: String
      $subCategoryId: String
    ) {
      addScooter(
        name: $name
        price: $price
        sku: $sku
        tags: $tags
        brand: $brand
        description: $description
        itemNo: $itemNo
        categoryId: $categoryId
        subCategoryId: $subCategoryId
      ) {
        name
        price
        sku
        tags
        brand
        description
        itemNo
        categoryId
        subCategoryId
      }
    }
  `;

  // Anvend mutation
  const [addScooter] = useMutation(ADD_SCOOTER);

  // Håndtér indsendelse af elscooteroplysninger
  const handleSubmit = event => {
    event.preventDefault();
    if (name === '') {
      alert('Du skal som minimum udfylde et navn på elscooteren!');
    } else {
      addScooter({
        variables: {
          name: name,
          price: price,
          sku: sku,
          tags: tags,
          brand: brand,
          description: description,
          itemNo: itemNo,
          categoryId: categoryId,
          subCategoryId: subCategoryId
        }
      });
      // Sæt 'alertStatus' til at være true (så den vises)
      setAlertStatus(true);
      // Clear felter, så der kan indtastes nye oplysninger
      setName('');
      setPrice('');
      setSku('');
      setTags('');
      setBrand('');
      setDescription('');
      setItemNo('');
      setCategoryId('');
      setSubCategoryId('');
    }
  };

  // Toggle til at åbne og lukke boksen med hjælp
  const toggle = () => setHelpIsOpen(!HelpIsOpen);

  return (
    <React.Fragment>
      <h3 className="mb-3">Tilføj ny elscooter</h3>
      {/* Box der vises, hvis der klikkes på hjælp */}
      <Collapse isOpen={HelpIsOpen}>
        <Card className="mb-4">
          <CardBody>
            Her tilføjes nye elscootere. Hvis du i stedet vil tilføje en
            reservedel, så skal du gøre det under "Tilføj reservedel". Felterne
            "Navn", "Pris" og "Enhedsnummer" er obligatoriske, og skal derfor
            udfyldes. Jo flere felter, du kan udfylde, des bedre.
          </CardBody>
        </Card>
      </Collapse>
      <Form className="form" onSubmit={handleSubmit}>
        <FormGroup>
          <InputGroup>
            <Input
              required
              className="inputStyles"
              type="text"
              name="itemNo"
              id="scooterItemNo"
              minLength="1"
              maxLength="20"
              value={itemNo}
              placeholder="Enhedsnummer..."
              onChange={event => setItemNo(event.target.value)}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <Input
              required
              className="inputStyles"
              type="text"
              name="name"
              id="scooterName"
              minLength="1"
              maxLength="50"
              value={name}
              placeholder="Enhedsnavn..."
              onChange={event => setName(event.target.value)}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <Input
              required
              className="inputStyles"
              type="number"
              name="price"
              id="scooterPrice"
              minLength="1"
              maxLength="10"
              value={price}
              placeholder="Pris uden moms..."
              onChange={event => setPrice(parseFloat(event.target.value))}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <Input
              className="inputStyles"
              type="text"
              name="sku"
              id="scooterSku"
              value={sku}
              placeholder="SKU..."
              onChange={event => setSku(event.target.value)}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <Input
              className="inputStyles"
              type="text"
              name="tags"
              id="scooterTags"
              value={tags}
              placeholder="Tags..."
              onChange={event => setTags(event.target.value)}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <Input
              className="inputStyles"
              type="text"
              name="brand"
              id="scooterBrand"
              value={brand}
              placeholder="Mærke..."
              onChange={event => setBrand(event.target.value)}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <Input
              className="inputStyles"
              style={{ minHeight: '5rem' }}
              type="textarea"
              name="description"
              id="scooterDescription"
              minLength="1"
              maxLength="200"
              value={description}
              placeholder="Beskrivelse..."
              onChange={event => setDescription(event.target.value)}
            />
          </InputGroup>
        </FormGroup>
        {/* <FormGroup>
          <InputGroup>
            <Input
              className="inputStyles"
              type="number"
              name="categoryId"
              id="scooterCategoryId"
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
              type="number"
              name="subCategoryId"
              id="scooterSubCategoryId"
              value={subCategoryId}
              placeholder="Underkategori ID..."
              onChange={event => setSubCategoryId(event.target.value)}
            />
          </InputGroup>
        </FormGroup> */}
        {/* Vis alert, hvis elscooteren oprettes korrekt */}
        {alertStatus === true && (
          <Alert color="success">Scooteren blev oprettet.</Alert>
        )}
        {/* Knap til at indsende indtastede data */}
        <Button type="submit" className="btnStyles mr-2">
          Tilføj elscooter
        </Button>
        {/* Knap til at toggle box med hjælp */}
        <Button onClick={toggle} className="btnStyles">
          Hjælp mig!
        </Button>
      </Form>
    </React.Fragment>
  );
}

export default AddNewScooter;
