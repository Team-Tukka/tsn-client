import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import './EditSparepart.css';

// Importér Reactstrap komponenter
import {
  Form,
  InputGroup,
  FormGroup,
  Input,
  Button,
  Alert,
  Tooltip
} from 'reactstrap';

export function GetSparepartById() {
  const { id } = useParams();

  // Definér query til at hente specifik reservedel
  const GET_SPAREPART_BY_ID = gql`
    {
      getSparepartById(_id: "${id}") {
        _id
        name
        price
        priceVAT
        itemNo
        scooterId
        categoryId
      }
    }
  `;

  // Anvend query
  const { loading, error, data } = useQuery(GET_SPAREPART_BY_ID);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  // Deklarér konstanter som initialiseres til at være reservedelens data
  const spaId = data.getSparepartById._id;
  const spaName = data.getSparepartById.name;
  const spaPrice = data.getSparepartById.price;
  const spaItemNo = data.getSparepartById.itemNo;
  const spaScooterId = data.getSparepartById.ScooterId;
  const spaCategoryId = data.getSparepartById.categoryId;

  // Returnér 'EditSparepart' komponentet med konstanterne som props
  return (
    <EditSparepart
      spaId={spaId}
      spaName={spaName}
      spaPrice={spaPrice}
      spaItemNo={spaItemNo}
      spaScooterId={spaScooterId}
      spaCategoryId={spaCategoryId}
    />
  );
}

// Komponent, der håndterer opdatering af en reservedel
function EditSparepart(props) {
  // Deklarér konstanter, som initialiseres til at være de medsendte props
  const spaId = props.spaId;
  const spaName = props.spaName;
  const spaPrice = props.spaPrice;
  const spaItemNo = props.spaItemNo;
  const spaScooterId = props.spaScooterId;
  const spaCategoryId = props.spaCategoryId;

  // States med React Hooks
  const [name, setName] = useState(spaName);
  const [price, setPrice] = useState(spaPrice);
  const [itemNo, setItemNo] = useState(spaItemNo);
  const [scooterId, setScooterId] = useState(spaScooterId);
  const [categoryId, setCategoryId] = useState(spaCategoryId);
  const [alertStatus, setAlertStatus] = useState(false);

  // States til tooltips
  const [nameTooltipOpen, setNameTooltipOpen] = useState(false);
  const [itemNoTooltipOpen, setItemNoTooltipOpen] = useState(false);
  const [priceTooltipOpen, setPriceTooltipOpen] = useState(false);
  const [scooterIdTooltipOpen, setScooterIdTooltipOpen] = useState(false);

  // Mutation til at opdatere en reservedel
  const UPDATE_SPAREPART_BY_ID = gql`
    mutation { 
        updateSparepartById(
        _id: "${spaId}"
        input: {
        name: "${name}"
        price: ${price}
        itemNo: "${itemNo}"
        scooterId: "${scooterId}"
        categoryId: "${categoryId}"
        }
    ) {
       name
        price
        itemNo
         categoryId
       scooterId
      }
    }
  `;

  // Anvend mutation
  const [updateSparepartById] = useMutation(UPDATE_SPAREPART_BY_ID);

  // Håndtér indsendelse af redigerede reservedelsoplysninger
  const handleSubmit = event => {
    event.preventDefault();
    if (name === '') {
      alert('Du skal som minimum udfylde et navn på reservedelen!');
    } else {
      updateSparepartById({
        variables: {
          name: name,
          price: price,
          itemNo: itemNo,
          categoryId: categoryId,
          scooterId: scooterId
        }
      });
      // Sæt 'alertStatus' til at være true (så den vises)
      setAlertStatus(true);
    }
  };

  // Håndtér klik på sletknappen
  const handleDelete = () => {
    alert('Hej!');
  };

  // Toggle tooltips ved hver inputfelt
  const toggleName = () => setNameTooltipOpen(!nameTooltipOpen);
  const toggleItemNo = () => setItemNoTooltipOpen(!itemNoTooltipOpen);
  const togglePrice = () => setPriceTooltipOpen(!priceTooltipOpen);
  const toggleScooterId = () => setScooterIdTooltipOpen(!scooterIdTooltipOpen);

  return (
    <React.Fragment>
      <h3 className="mb-3">Opdatér reservedel</h3>
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
              defaultValue={itemNo}
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
              defaultValue={name}
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
              className="inputStyles"
              type="number"
              step={0.01}
              name="price"
              id="sparepartPrice"
              minLength="1"
              maxLength="10"
              defaultValue={price}
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
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <Input
              className="inputStyles"
              type="text"
              name="scooterId"
              id="sparepartScooterId"
              defaultValue={scooterId}
              placeholder="Elscooter ID..."
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
              defaultValue={categoryId}
              placeholder="Kategori ID (Under udvikling)"
              onChange={event => setCategoryId(event.target.value)}
            />
          </InputGroup>
        </FormGroup>
        {/* Vis alert, hvis reservedelen opdateres korrekt */}
        {alertStatus === true && (
          <Alert color="success">Reservedelen blev opdateret.</Alert>
        )}
        {/* Knap til at indsende redigerede data */}
        <Button type="submit" className="btnStyles mr-2">
          Opdatér reservedelen
        </Button>
        {/* Knap til at slette den specifikke reservedel */}
        <Button onClick={handleDelete} className="dangerBtnStyles">
          Slet reservedelen
        </Button>
      </Form>
    </React.Fragment>
  );
}

export default EditSparepart;
