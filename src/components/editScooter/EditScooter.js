import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import './EditScooter.css';

// Importér Reactstrap komponenter
import {
  Form,
  InputGroup,
  FormGroup,
  Input,
  Button,
  Alert,
  Tooltip,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

export function GetScooterById() {
  const { id } = useParams();

  // Definér query til at hente specifik elscooter
  const GET_SCOOTER_BY_ID = gql`
    {
      getScooterById(_id: "${id}") {
        _id
        name
        price
        priceVAT
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

  // Anvend query
  const { loading, error, data } = useQuery(GET_SCOOTER_BY_ID);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  // Deklarér konstanter som initialiseres til at være elscooterens data
  const scoId = data.getScooterById._id;
  const scoName = data.getScooterById.name;
  const scoPrice = data.getScooterById.price;
  const scoSku = data.getScooterById.sku;
  const scoTags = data.getScooterById.tags;
  const scoBrand = data.getScooterById.brand;
  const scoDescription = data.getScooterById.description;
  const scoItemNo = data.getScooterById.itemNo;
  const scoCategoryId = data.getScooterById.categoryId;
  const scoSubCategoryId = data.getScooterById.subCategoryId;

  // Returnér 'EditScooter' komponentet med konstanterne som props
  return (
    <EditScooter
      scoId={scoId}
      scoName={scoName}
      scoPrice={scoPrice}
      scoSku={scoSku}
      scoTags={scoTags}
      scoBrand={scoBrand}
      scoDescription={scoDescription}
      scoItemNo={scoItemNo}
      scoCategoryId={scoCategoryId}
      scoSubCategoryId={scoSubCategoryId}
    />
  );
}

// Komponent, der håndterer opdatering af en elscooter
function EditScooter(props) {
  // Deklarér konstanter, som initialiseres til at være de medsendte props
  const scoId = props.scoId;
  const scoName = props.scoName;
  const scoPrice = props.scoPrice;
  const scoSku = props.scoSku;
  const scoTags = props.scoTags;
  const scoBrand = props.scoBrand;
  const scoDescription = props.scoDescription;
  const scoItemNo = props.scoItemNo;
  const scoCategoryId = props.scoCategoryId;
  const scoSubCategoryId = props.scoSubCategoryId;

  // States med React Hooks
  const [name, setName] = useState(scoName);
  const [price, setPrice] = useState(scoPrice);
  const [sku, setSku] = useState(scoSku);
  const [tags, setTags] = useState(scoTags);
  const [brand, setBrand] = useState(scoBrand);
  const [description, setDescription] = useState(scoDescription);
  const [itemNo, setItemNo] = useState(scoItemNo);
  const [categoryId, setCategoryId] = useState(scoCategoryId);
  const [subCategoryId, setSubCategoryId] = useState(scoSubCategoryId);
  const [alertStatus, setAlertStatus] = useState(false);
  const [modal, setModal] = useState(false);

  // States til tooltips
  const [nameTooltipOpen, setNameTooltipOpen] = useState(false);
  const [itemNoTooltipOpen, setItemNoTooltipOpen] = useState(false);
  const [priceTooltipOpen, setPriceTooltipOpen] = useState(false);
  const [skuTooltipOpen, setSkuTooltipOpen] = useState(false);
  const [tagsTooltipOpen, setTagsTooltipOpen] = useState(false);
  const [brandTooltipOpen, setBrandTooltipOpen] = useState(false);
  const [descriptionTooltipOpen, setDescriptionTooltipOpen] = useState(false);

  // Mutation til at opdatere en elscooter
  const UPDATE_SCOOTER_BY_ID = gql`
    mutation { 
        updateScooterById(
        _id: "${scoId}"
        input: {
        name: "${name}"
        price: ${price}
        sku: "${sku}"
        tags: "${tags}"
        brand: "${brand}"
        description: "${description}"
        itemNo: "${itemNo}"
        categoryId: "${categoryId}"
        subCategoryId: "${subCategoryId}"
        }
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

  // Mutation til at slette en elscooter
  const DELETE_SCOOTER_BY_ID = gql`
    mutation {
      deleteScooterById(_id: "${scoId}") {
        _id
      }
    }
  `;

  // Anvend mutations
  const [updateScooterById] = useMutation(UPDATE_SCOOTER_BY_ID);
  const [deleteScooterById] = useMutation(DELETE_SCOOTER_BY_ID);

  // Håndtér indsendelse af redigerede elscooteroplysninger
  const handleSubmit = event => {
    event.preventDefault();
    if (name === '') {
      alert('Du skal som minimum udfylde et navn på elscooteren!');
    } else {
      updateScooterById({
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
    }
  };

  // Slet produktet for evigt
  const handleDelete = () => {
    setModal(!modal);
    deleteScooterById();
    window.location.replace('/products');
  };

  // Toggle tooltips ved hver inputfelt
  const toggleName = () => setNameTooltipOpen(!nameTooltipOpen);
  const toggleItemNo = () => setItemNoTooltipOpen(!itemNoTooltipOpen);
  const togglePrice = () => setPriceTooltipOpen(!priceTooltipOpen);
  const toggleSku = () => setSkuTooltipOpen(!skuTooltipOpen);
  const toggleTags = () => setTagsTooltipOpen(!tagsTooltipOpen);
  const toggleBrand = () => setBrandTooltipOpen(!brandTooltipOpen);
  const toggleDescription = () =>
    setDescriptionTooltipOpen(!descriptionTooltipOpen);

  // Toggle modal vinduet til sletning
  const toggleModal = () => setModal(!modal);

  return (
    <React.Fragment>
      <h3 className="mb-3">Opdatér elscooter</h3>
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
              defaultValue={itemNo}
              placeholder="Enhedsnummer..."
              onChange={event => setItemNo(event.target.value)}
            />
            <Tooltip
              placement="top"
              isOpen={itemNoTooltipOpen}
              target="scooterItemNo"
              toggle={toggleItemNo}
              style={{
                padding: '0.5rem',
                whiteSpace: 'nowrap',
                minWidth: 'fit-content'
              }}
            >
              Her indtaster du elscooterens enhedsnummer. Fx AK-3761.
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
              id="scooterName"
              minLength="1"
              maxLength="50"
              defaultValue={name}
              placeholder="Enhedsnavn..."
              onChange={event => setName(event.target.value)}
            />
            <Tooltip
              placement="top"
              isOpen={nameTooltipOpen}
              target="scooterName"
              toggle={toggleName}
              style={{
                padding: '0.5rem',
                whiteSpace: 'nowrap',
                minWidth: 'fit-content'
              }}
            >
              Her indtaster du elscooterens navn. Fx HS-855 Hvid.
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
              id="scooterPrice"
              minLength="1"
              maxLength="10"
              defaultValue={price}
              placeholder="Pris uden moms..."
              onChange={event => setPrice(parseFloat(event.target.value))}
            />
            <Tooltip
              placement="top"
              isOpen={priceTooltipOpen}
              target="scooterPrice"
              toggle={togglePrice}
              style={{
                padding: '0.5rem',
                whiteSpace: 'nowrap',
                minWidth: 'fit-content'
              }}
            >
              Her indtaster du elscooterens pris uden moms i DKK. Fx 22999,95.
            </Tooltip>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <Input
              className="inputStyles"
              type="text"
              name="sku"
              id="scooterSku"
              defaultValue={sku}
              placeholder="SKU..."
              onChange={event => setSku(event.target.value)}
            />
            <Tooltip
              placement="top"
              isOpen={skuTooltipOpen}
              target="scooterSku"
              toggle={toggleSku}
              style={{
                padding: '0.5rem',
                whiteSpace: 'nowrap',
                minWidth: 'fit-content'
              }}
            >
              Her indtaster du den unikke kode, der identificerer enheden. En
              såkaldt Stock Keeping Unit.
            </Tooltip>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <Input
              className="inputStyles"
              type="text"
              name="tags"
              id="scooterTags"
              defaultValue={tags}
              placeholder="Tags..."
              onChange={event => setTags(event.target.value)}
            />
            <Tooltip
              placement="top"
              isOpen={tagsTooltipOpen}
              target="scooterTags"
              toggle={toggleTags}
              style={{
                padding: '0.5rem',
                whiteSpace: 'nowrap',
                minWidth: 'fit-content'
              }}
            >
              Her indtaster du de ord, der kan identificere enheden. Ordene
              separeres med mellemrum. Fx en-hjulet rød el-scooter.
            </Tooltip>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <Input
              className="inputStyles"
              type="text"
              name="brand"
              id="scooterBrand"
              defaultValue={brand}
              placeholder="Mærke..."
              onChange={event => setBrand(event.target.value)}
            />
            <Tooltip
              placement="top"
              isOpen={brandTooltipOpen}
              target="scooterBrand"
              toggle={toggleBrand}
              style={{
                padding: '0.5rem',
                whiteSpace: 'nowrap',
                minWidth: 'fit-content'
              }}
            >
              Her indtaster du elscooterens mærke. Fx C.T.M.
            </Tooltip>
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
              defaultValue={description}
              placeholder="Beskrivelse..."
              onChange={event => setDescription(event.target.value)}
            />
            <Tooltip
              placement="top"
              isOpen={descriptionTooltipOpen}
              target="scooterDescription"
              toggle={toggleDescription}
              style={{
                padding: '0.5rem',
                whiteSpace: 'nowrap',
                minWidth: 'fit-content'
              }}
            >
              Her indtaster du en fyldestgørende beskrivelse af enheden. Max 200
              tegn.
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
              id="scooterCategoryId"
              defaultValue={categoryId}
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
              id="scooterSubCategoryId"
              defaultValue={subCategoryId}
              placeholder="Underkategori ID (Under udvikling)"
              onChange={event => setSubCategoryId(event.target.value)}
            />
          </InputGroup>
        </FormGroup>
        {/* Vis alert, hvis elscooteren opdateres korrekt */}
        {alertStatus === true && (
          <Alert color="success">Elscooteren blev opdateret.</Alert>
        )}
        {/* Knap til at indsende redigerede data */}
        <Button type="submit" className="btnStyles mr-2">
          Opdatér elscooteren
        </Button>
        {/* Knap til at trigge sletfunktion */}
        <Button onClick={toggleModal} className="dangerBtnStyles">
          Slet elscooteren
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
            </Button>{' '}
            <Button color="secondary" onClick={toggleModal}>
              Nej!
            </Button>
          </ModalFooter>
        </Modal>
      </Form>
    </React.Fragment>
  );
}

export default EditScooter;
