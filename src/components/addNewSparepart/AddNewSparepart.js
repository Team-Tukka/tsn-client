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
  FormGroup,
  FormText,
  Input,
  Button,
  Alert,
  Tooltip
} from 'reactstrap';

// Komponent, der håndterer oprettelse af ny reservedel
function AddNewSparepart() {
  /* Klientens cache ryddes, så vi er sikkre på, at den nye
  reservedel tilføjes, uden man behøver rerendere hele DOM'en */
  client.cache.reset();

  // States med React Hooks
  const [itemNo, setItemNo] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [scooterId, setScooterId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [alertStatus, setAlertStatus] = useState(false);

  // States til tooltips
  const [itemNoTooltipOpen, setItemNoTooltipOpen] = useState(false);
  const [nameTooltipOpen, setNameTooltipOpen] = useState(false);
  const [priceTooltipOpen, setPriceTooltipOpen] = useState(false);
  const [scooterIdTooltipOpen, setScooterIdTooltipOpen] = useState(false);

  // Definér mutation til at tilføje ny reservedel
  const ADD_SPAREPART = gql`
    mutation addSparepart(
      $itemNo: String!
      $name: String!
      $price: Float!
      $scooterId: String
      $categoryId: String
    ) {
      addSparepart(
        itemNo: $itemNo
        name: $name
        price: $price
        scooterId: $scooterId
        categoryId: $categoryId
      ) {
        itemNo
        name
        price
        scooterId
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
          scooterId: scooterId,
          categoryId: categoryId
        }
      });
      // Sæt 'alertStatus' til at være true (så den vises)
      setAlertStatus(true);
      // Clear felter, så der kan indtastes nye oplysninger
      setItemNo('');
      setName('');
      setPrice('');
      setScooterId('');
      setCategoryId('');
    }
  };

  // Toggle tooltips ved hver inputfelt
  const toggleItemNo = () => setItemNoTooltipOpen(!itemNoTooltipOpen);
  const toggleName = () => setNameTooltipOpen(!nameTooltipOpen);
  const togglePrice = () => setPriceTooltipOpen(!priceTooltipOpen);
  const toggleScooterId = () => setScooterIdTooltipOpen(!scooterIdTooltipOpen);

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
            <Tooltip
              placement="top"
              isOpen={itemNoTooltipOpen}
              target="sparepartItemNo"
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
            <Tooltip
              placement="top"
              isOpen={nameTooltipOpen}
              target="sparepartName"
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
              name="price"
              id="sparepartPrice"
              minLength="1"
              maxLength="10"
              value={price}
              placeholder="Pris uden moms..."
              onChange={event => setPrice(parseFloat(event.target.value))}
            />
            <Tooltip
              placement="top"
              isOpen={priceTooltipOpen}
              target="sparepartPrice"
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
              className="inputStyles"
              type="text"
              name="scooterId"
              id="sparepartScooterId"
              value={scooterId}
              placeholder="Scooter ID"
              onChange={event => setScooterId(event.target.value)}
            />
            <Tooltip
              placement="top"
              isOpen={scooterIdTooltipOpen}
              target="sparepartScooterId"
              toggle={toggleScooterId}
              style={{
                padding: '0.5rem',
                whiteSpace: 'nowrap',
                minWidth: 'fit-content'
              }}
            >
              Her indtaster du ID'et på den elscooter, reservedelen tilhører. Fx
              125.
            </Tooltip>
          </InputGroup>
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
