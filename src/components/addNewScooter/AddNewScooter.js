import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import client from '../../config/apolloClient';
import s3 from '../../config/spacesConfig';
import GetCategories from '../categories/GetCategories';
import './AddNewScooter.css';

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
  const [alertStatus, setAlertStatus] = useState(false);

  // States til tooltips
  const [nameTooltipOpen, setNameTooltipOpen] = useState(false);
  const [itemNoTooltipOpen, setItemNoTooltipOpen] = useState(false);
  const [priceTooltipOpen, setPriceTooltipOpen] = useState(false);
  const [skuTooltipOpen, setSkuTooltipOpen] = useState(false);
  const [tagsTooltipOpen, setTagsTooltipOpen] = useState(false);
  const [brandTooltipOpen, setBrandTooltipOpen] = useState(false);
  const [descriptionTooltipOpen, setDescriptionTooltipOpen] = useState(false);

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
      ) {
        name
        price
        sku
        tags
        brand
        description
        itemNo
        categoryId
      }
    }
  `;

  // Anvend mutation
  const [addScooter] = useMutation(ADD_SCOOTER);

  // Håndter fejl ifm. billede
  const handleImageError = () => {
    console.log('Fejl!');
  };

  // Håndtér ændring af billede
  const handleImageChange = event => {
    var params = {
      Body: 'The contents of the file',
      Bucket: 'tukka',
      Key: 'file.ext',
      ACL: 'public-read'
    };

    s3.putObject(params, function(err, data) {
      if (err) console.log(err, err.stack);
      else console.log(data);
    });

    // if (event.target.files && event.target.files[0]) {
    //   const blob = event.target.files[0];
    //   const params = {
    //     Body: blob,
    //     Bucket: 'https://tukka.fra1.digitaloceanspaces.com',
    //     Key: blob.name
    //   };
    //   // Uploader filen til DO Space
    //   s3.putObject(params)
    //     .on('build', request => {
    //       request.httpRequest.headers.Host =
    //         'https://tukka.fra1.digitaloceanspaces.com/';
    //       request.httpRequest.headers['Content-Length'] = blob.size;
    //       request.httpRequest.headers['Content-Type'] = blob.type;
    //       request.httpRequest.headers['x-amz-acl'] = 'public-read';
    //     })
    //     .send(err => {
    //       if (err) handleImageError();
    //       else {
    //         const imageUrl =
    //           'https://tukka.fra1.digitaloceanspaces.com/' + blob.name;
    //         console.log(imageUrl);
    //       }
    //     });
    // }
  };

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
          categoryId: document.getElementById('chosenCategoryId').value
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
      document.getElementById('scooterPrice').value = '';
      document.getElementById('chosenCategoryId').value = '';
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
              step={0.01}
              name="price"
              id="scooterPrice"
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
              Her indtaster du elscooterens pris uden moms i DKK. Fx 22999,95.
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
              name="sku"
              id="scooterSku"
              value={sku}
              placeholder="SKU..."
              onChange={event => setSku(event.target.value)}
            />
            <InputGroupAddon
              addonType="append"
              id="skuTooltip"
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
              isOpen={skuTooltipOpen}
              target="skuTooltip"
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
              value={tags}
              placeholder="Tags..."
              onChange={event => setTags(event.target.value)}
            />
            <InputGroupAddon
              addonType="append"
              id="tagsTooltip"
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
              isOpen={tagsTooltipOpen}
              target="tagsTooltip"
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
              value={brand}
              placeholder="Mærke..."
              onChange={event => setBrand(event.target.value)}
            />
            <InputGroupAddon
              addonType="append"
              id="brandTooltip"
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
              isOpen={brandTooltipOpen}
              target="brandTooltip"
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
              value={description}
              placeholder="Beskrivelse..."
              onChange={event => setDescription(event.target.value)}
            />
            <InputGroupAddon
              addonType="append"
              id="descriptionTooltip"
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
              isOpen={descriptionTooltipOpen}
              target="descriptionTooltip"
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
            <GetCategories />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <Input
              className="inputStyles p-2"
              type="file"
              id="inputfile"
              accept=".txt"
              onChange={handleImageChange}
            />
          </InputGroup>
        </FormGroup>
        {/* Vis alert, hvis elscooteren oprettes korrekt */}
        {alertStatus === true && (
          <Alert color="success">Scooteren blev oprettet.</Alert>
        )}
        {/* Knap til at indsende indtastede data */}
        <Button type="submit" className="btnStyles">
          Tilføj elscooter
        </Button>
      </Form>
      <Link to="/addNewSparepart" className="linkStyles">
        <p className="mb-3">Vil du i stedet tilføje ny reservedel?</p>
      </Link>
    </React.Fragment>
  );
}

export default AddNewScooter;
