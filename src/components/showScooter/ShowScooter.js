import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import './ShowScooter.css';

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

// Komponent, der håndterer oprettelse af ny elscooter
function ShowScooter() {
  // States med React Hooks
  const { id } = useParams();
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

  // States til tooltips
  const [nameTooltipOpen, setNameTooltipOpen] = useState(false);
  const [itemNoTooltipOpen, setItemNoTooltipOpen] = useState(false);
  const [priceTooltipOpen, setPriceTooltipOpen] = useState(false);
  const [skuTooltipOpen, setSkuTooltipOpen] = useState(false);
  const [tagsTooltipOpen, setTagsTooltipOpen] = useState(false);
  const [brandTooltipOpen, setBrandTooltipOpen] = useState(false);
  const [descriptionTooltipOpen, setDescriptionTooltipOpen] = useState(false);

  // Definér query og mutation til at tilføje ny elscooter
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

  const UPDATE_SCOOTER_BY_ID = gql`
    mutation { 
        updateScooterById(
        _id: "${id}"
        input: {
        name: "${name}"
        price: "${price}"
        sku: "${sku}"
        tags: "${tags}"
        brand: "${brand}"
        description: "${description}"
        itemNo: "${itemNo}"
        categoryId: "${categoryId}"
        subCategoryId: "${sku}"
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

  // Anvend query og mutation
  const { loading, error, data } = useQuery(GET_SCOOTER_BY_ID);
  const [updateScooterById] = useMutation(UPDATE_SCOOTER_BY_ID);

  // Håndtér indsendelse af elscooteroplysninger
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

  // Toggle tooltips ved hver inputfelt
  const toggleName = () => setNameTooltipOpen(!nameTooltipOpen);
  const toggleItemNo = () => setItemNoTooltipOpen(!itemNoTooltipOpen);
  const togglePrice = () => setPriceTooltipOpen(!priceTooltipOpen);
  const toggleSku = () => setSkuTooltipOpen(!skuTooltipOpen);
  const toggleTags = () => setTagsTooltipOpen(!tagsTooltipOpen);
  const toggleBrand = () => setBrandTooltipOpen(!brandTooltipOpen);
  const toggleDescription = () =>
    setDescriptionTooltipOpen(!descriptionTooltipOpen);

  if (loading) return <p>Loading...</p>;
  if (error) return <p> Error! </p>;

  //Toggle tooltips ved hver inputfelt
  return (
    <React.Fragment>
      <h3 className="mb-3">Tilføj ny elscooter</h3>
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
              defaultValue={data.getScooterById.itemNo}
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
              defaultValue={data.getScooterById.name}
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
              required
              className="inputStyles"
              type="number"
              name="price"
              id="scooterPrice"
              minLength="1"
              maxLength="10"
              defaultValue={data.getScooterById.price}
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
              value={data.getScooterById.sku}
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
              value={data.getScooterById.value}
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
              value={data.getScooterById.brand}
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
              value={data.getScooterById.description}
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
        </FormGroup>{' '}
        <FormGroup>
          <InputGroup>
            <Input
              className="inputStyles"
              type="text"
              name="categoryId"
              id="scooterCategoryId"
              value={data.getScooterById.categoryId}
              placeholder="Kategori ID..."
              onChange={event => setCategoryId(event.target.value)}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <Input
              className="inputStyles"
              type="text"
              name="subCategoryId"
              id="scooterSubCategoryId"
              value={data.getScooterById.subCategoryId}
              placeholder="Underkategori ID..."
              onChange={event => setSubCategoryId(event.target.value)}
            />
          </InputGroup>
        </FormGroup>
        {/* Vis alert, hvis elscooteren oprettes korrekt */}
        {alertStatus === true && (
          <Alert color="success">Scooteren blev oprettet.</Alert>
        )}
        {/*  Knap til at indsende indtastede data*/}
        <Button type="submit" className="btnStyles">
          Tilføj elscooter
        </Button>
      </Form>
    </React.Fragment>
  );
}

export default ShowScooter;
