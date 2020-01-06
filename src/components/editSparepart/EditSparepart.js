import React, { useState } from 'react';
import GetSubCategoryById from '../categories/GetSubCategoryById';
import { useParams } from 'react-router';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import './EditSparepart.css';

// Importér Reactstrap komponenter
import {
  Form,
  InputGroup,
  FormGroup,
  FormText,
  Input,
  InputGroupAddon,
  InputGroupText,
  Button,
  Alert,
  Tooltip,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

// Importér Font Awesome komponenter
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

export function GetSparepartById() {
  const { id } = useParams();

  // Definér query til at hente specifik reservedel
  const GET_SPAREPART_BY_ID = gql`
    {
      getSparepartById(_id: "${id}") {
        _id
        name
        price
        itemNo
        subCategoryId
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
  const spaSubCategoryId = data.getSparepartById.subCategoryId;

  // Returnér 'EditSparepart' komponentet med konstanterne som props
  return (
    <EditSparepart
      spaId={spaId}
      spaName={spaName}
      spaPrice={spaPrice}
      spaItemNo={spaItemNo}
      spaSubCategoryId={spaSubCategoryId}
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
  const spaSubCategoryId = props.spaSubCategoryId;

  // States med React Hooks
  const [name, setName] = useState(spaName);
  const [price, setPrice] = useState(spaPrice);
  const [itemNo, setItemNo] = useState(spaItemNo);
  const [alertStatus, setAlertStatus] = useState(false);
  const [modal, setModal] = useState(false);

  // States til tooltips
  const [nameTooltipOpen, setNameTooltipOpen] = useState(false);
  const [itemNoTooltipOpen, setItemNoTooltipOpen] = useState(false);
  const [priceTooltipOpen, setPriceTooltipOpen] = useState(false);

  // Mutation til at opdatere en reservedel
  const UPDATE_SPAREPART_BY_ID = gql`
    mutation { 
      updateSparepartById(
      _id: "${spaId}"
      input: {
        name: "${name}"
        price: ${price}
        itemNo: "${itemNo}"
      }
      ){
        name
        price
        itemNo
      }
    }
  `;

  // Mutation til at slette en reservedel
  const DELETE_SPAREPART_BY_ID = gql`
    mutation {
      deleteSparepartById(_id: "${spaId}") {
        _id
      }
    }
  `;

  // Anvend mutations
  const [updateSparepartById] = useMutation(UPDATE_SPAREPART_BY_ID);
  const [deleteSparepartById] = useMutation(DELETE_SPAREPART_BY_ID);

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
          itemNo: itemNo
        }
      });
      // Sæt 'alertStatus' til at være true (så den vises)
      setAlertStatus(true);
    }
  };

  // Slet produktet for evigt
  const handleDelete = () => {
    setModal(!modal);
    deleteSparepartById();
    window.location.replace('/products');
  };

  // Toggle tooltips ved hver inputfelt
  const toggleName = () => setNameTooltipOpen(!nameTooltipOpen);
  const toggleItemNo = () => setItemNoTooltipOpen(!itemNoTooltipOpen);
  const togglePrice = () => setPriceTooltipOpen(!priceTooltipOpen);

  // Toggle modal vinduet til sletning
  const toggleModal = () => setModal(!modal);

  return (
    <React.Fragment>
      <h3 className="mb-3">Opdatér reservedel</h3>
      <Form className="form" onSubmit={handleSubmit}>
        <FormGroup>
          <InputGroup>
            <Input
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
        <FormText color="muted" className="mb-3">
          Oprettet under splittegningen:{' '}
          <GetSubCategoryById subCategoryId={spaSubCategoryId} />
        </FormText>
        {/* Vis alert, hvis reservedelen opdateres korrekt */}
        {alertStatus === true && (
          <Alert color="success">Reservedelen blev opdateret.</Alert>
        )}
        {/* Knap til at indsende redigerede data */}
        <Button type="submit" className="btnStyles mr-2">
          Opdatér reservedelen
        </Button>
        {/* Knap til at trigge sletfunktion */}
        <Button onClick={toggleModal} className="dangerBtnStyles">
          Slet reservedelen
        </Button>
        {/* Modal vindue med mulighed for endegyldig sletning */}
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>
            Du er ved at slette produktet!
          </ModalHeader>
          <ModalBody>
            Det er ikke muligt at genskabe et slettet produkt.
            <br />
            Er du sikker på, at du vil fortsætte?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={handleDelete}>
              Ja!
            </Button>
            <Button color="secondary" onClick={toggleModal}>
              Nej!
            </Button>
          </ModalFooter>
        </Modal>
      </Form>
    </React.Fragment>
  );
}

export default EditSparepart;
