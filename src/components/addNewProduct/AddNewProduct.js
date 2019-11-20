import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import client from '../../config/apolloClient';
import './AddNewProduct.css';

// Importér Reactstrap komponenter
import { Form, InputGroup, FormGroup, Input, Button, Alert } from 'reactstrap';

// Komponent, der håndterer oprettelse af nyt produkt
function AddNewProduct() {
  /* Klientens cache ryddes, så vi er sikkre på, at det nye
  produkt tilføjes, uden man behøver rerendere hele DOM'en */
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

  // Definér mutation til at tilføje nyt produkt
  const ADD_PRODUCT = gql`
    mutation addProduct(
      $name: String!
      $price: Float!
      $sku: String
      $tags: [String]
      $brand: String
      $description: String
      $itemNo: String!
      $categoryId: String
      $subCategoryId: String
    ) {
      addProduct(
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
  const [addProduct] = useMutation(ADD_PRODUCT);

  // Håndtér indsendelse af produktoplysninger
  const handleSubmit = event => {
    event.preventDefault();
    if (name === '') {
      alert('Du skal som minimum udfylde et produktnavn!');
    } else {
      addProduct({
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

  return (
    <React.Fragment>
      <h3 className="mb-3">Tilføj nyt produkt</h3>
      <Form className="form" onSubmit={handleSubmit}>
        <FormGroup>
          <InputGroup>
            <Input
              required
              className="inputStyles"
              type="text"
              name="name"
              id="productName"
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
              type="number"
              name="price"
              id="productPrice"
              minLength="1"
              maxLength="10"
              value={price}
              placeholder="Pris..."
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
              id="productSku"
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
              id="productTags"
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
              id="productBrand"
              value={brand}
              placeholder="Mærke..."
              onChange={event => setBrand(event.target.value)}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <Input
              required
              className="inputStyles"
              type="text"
              name="itemNo"
              id="productItemNo"
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
              className="inputStyles"
              type="number"
              name="categoryId"
              id="productCategoryId"
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
              id="productSubCategoryId"
              value={subCategoryId}
              placeholder="Underkategori ID..."
              onChange={event => setSubCategoryId(event.target.value)}
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
              id="productDescription"
              minLength="1"
              maxLength="200"
              value={description}
              placeholder="Beskrivelse..."
              onChange={event => setDescription(event.target.value)}
            />
          </InputGroup>
        </FormGroup>
        {/* Vis alert, hvis produktet oprettes korrekt */}
        {alertStatus === true && (
          <Alert color="success">Produktet blev oprettet.</Alert>
        )}
        {/* Knap til at indsende indtastede data */}
        <Button type="submit" className="btnStyles">
          Tilføj produkt
        </Button>
      </Form>
    </React.Fragment>
  );
}

export default AddNewProduct;
