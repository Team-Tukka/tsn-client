import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import client from '../../config/apolloClient';
import './AddNewSparepart.css';

// Importér Reactstrap komponenter
import {
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormGroup,
  FormText,
  Input,
  Button,
  Alert,
  Tooltip
} from 'reactstrap';

// Importér Font Awesome komponenter
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

// Komponent, der håndterer oprettelse af ny reservedel
function AddNewSparepart() {
  /* Klientens cache ryddes, så vi er sikkre på, at den nye
  reservedel tilføjes, uden man behøver rerendere hele DOM'en */
  client.cache.reset();

  // States med React Hooks
  const [itemNo, setItemNo] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [subCategoryId, setSubCategoryId] = useState('');
  const [alertStatus, setAlertStatus] = useState(false);

  // States til tooltips
  const [itemNoTooltipOpen, setItemNoTooltipOpen] = useState(false);
  const [nameTooltipOpen, setNameTooltipOpen] = useState(false);
  const [priceTooltipOpen, setPriceTooltipOpen] = useState(false);

  // Definér mutation til at tilføje ny reservedel
  const ADD_SPAREPART = gql`
    mutation addSparepart(
      $itemNo: String!
      $name: String!
      $price: Float!
      $categoryId: String
      $subcategoryId: String
    ) {
      addSparepart(
        itemNo: $itemNo
        name: $name
        price: $price
        categoryId: $categoryId
        subCategoryId: $subCategoryId
      ) {
        itemNo
        name
        price
        subCategoryId
        categoryId
      }
    }
  `;

  // Anvend mutation
  const [addSparepart] = useMutation(ADD_SPAREPART);

  // Håndtér indsendelse af reservedelsoplysninger
  const handleSubmit = event => {
    event.preventDefault();
    if (name === '') {
      alert('Du skal som minimum udfylde et navn på reservedelen!');
    } else {
      addSparepart({
        variables: {
          itemNo: itemNo,
          name: name,
          price: price,
          categoryId: categoryId,
          subCategoryId: subCategoryId
        }
      });
      // Sæt 'alertStatus' til at være true (så den vises)
      setAlertStatus(true);
      // Clear felter, så der kan indtastes nye oplysninger
      setItemNo('');
      setName('');
      setPrice('');
      setCategoryId('');
      setSubCategoryId('');
      document.getElementById('sparepartPrice').value = '';
    }
  };

  // Toggle tooltips ved hver inputfelt
  const toggleItemNo = () => setItemNoTooltipOpen(!itemNoTooltipOpen);
  const toggleName = () => setNameTooltipOpen(!nameTooltipOpen);
  const togglePrice = () => setPriceTooltipOpen(!priceTooltipOpen);

  return (
    <React.Fragment>
      <h3 className="mb-3">Tilføj ny reservedel</h3>
      <Form className="form" onSubmit={handleSubmit}>
        <FormGroup>
          <InputGroup>
            <Input
              required
              className="inputStyles"
              type="text"
              name="itemNo"
              id="sparepartItemNo"
              minLength="1"
              maxLength="20"
              value={itemNo}
              placeholder="Enhedsnummer..."
              onChange={event => setItemNo(event.target.value)}
            />
            <InputGroupAddon
              addonType="append"
              id="itemNoTooltip"
              style={{ marginLeft: '0.5rem' }}
            >
              <InputGroupText className="btnStyles">
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  id="questionIcon"
                ></FontAwesomeIcon>
              </InputGroupText>
            </InputGroupAddon>
            <Tooltip
              placement="top"
              isOpen={itemNoTooltipOpen}
              target="itemNoTooltip"
              toggle={toggleItemNo}
              style={{
                padding: '0.5rem',
                whiteSpace: 'nowrap',
                minWidth: 'fit-content'
              }}
            >
              Her indtaster du reservedelens enhedsnummer. Fx HL-372761.
            </Tooltip>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <Input
              required
              className="inputStyles"
              type="text"
              name="name"
              id="sparepartName"
              minLength="1"
              maxLength="50"
              value={name}
              placeholder="Enhedsnavn..."
              onChange={event => setName(event.target.value)}
            />
            <InputGroupAddon
              addonType="append"
              id="nameTooltip"
              style={{ marginLeft: '0.5rem' }}
            >
              <InputGroupText className="btnStyles">
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  id="questionIcon"
                ></FontAwesomeIcon>
              </InputGroupText>
            </InputGroupAddon>
            <Tooltip
              placement="top"
              isOpen={nameTooltipOpen}
              target="nameTooltip"
              toggle={toggleName}
              style={{
                padding: '0.5rem',
                whiteSpace: 'nowrap',
                minWidth: 'fit-content'
              }}
            >
              Her indtaster du reservedelens enhedsnavn. Fx Armlæn Højre.
            </Tooltip>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <Input
              required
              className="inputStyles"
              type="number"
              step={0.01}
              name="price"
              id="sparepartPrice"
              placeholder="Pris uden moms..."
              onChange={event => setPrice(parseFloat(event.target.value))}
            />
            <InputGroupAddon
              addonType="append"
              id="priceTooltip"
              style={{ marginLeft: '0.5rem' }}
            >
              <InputGroupText className="btnStyles">
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  id="questionIcon"
                ></FontAwesomeIcon>
              </InputGroupText>
            </InputGroupAddon>
            <Tooltip
              placement="top"
              isOpen={priceTooltipOpen}
              target="priceTooltip"
              toggle={togglePrice}
              style={{
                padding: '0.5rem',
                whiteSpace: 'nowrap',
                minWidth: 'fit-content'
              }}
            >
              Her indtaster du reservedelens pris uden moms i DKK. Fx 99,95.
            </Tooltip>
          </InputGroup>
          {price > 0 && (
            <FormText color="muted">
              Pris inkl. moms vil blive {price * 1.25} DKK.
            </FormText>
          )}
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <Input
              readOnly="readonly"
              className="inputStyles"
              type="text"
              name="categoryId"
              id="sparepartCategoryId"
              value={categoryId}
              placeholder="Kategori ID (Under udvikling)"
              onChange={event => setCategoryId(event.target.value)}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <Input
              readOnly="readonly"
              className="inputStyles"
              type="text"
              name="subCategoryId"
              id="sparepartSubCategoryId"
              value={subCategoryId}
              placeholder="Underkateori ID"
              onChange={event => setSubCategoryId(event.target.value)}
            />
          </InputGroup>
        </FormGroup>
        {/* Vis alert, hvis elscooteren oprettes korrekt */}
        {alertStatus === true && (
          <Alert color="success">Reservedelen blev oprettet.</Alert>
        )}
        {/* Knap til at indsende indtastede data */}
        <Button type="submit" className="btnStyles">
          Tilføj reservedel
        </Button>
      </Form>
      <Link to="/addNewScooter" className="linkStyles">
        <p className="mb-3">Vil du i stedet tilføje ny elscooter?</p>
      </Link>
    </React.Fragment>
  );
}

export default AddNewSparepart;
