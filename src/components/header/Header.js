import React, { useState } from 'react';
import './Header.css';

// Importér Reactstrap komponenter
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

// Importér Font Awesome komponenter
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

// Header komponent
function Header(props) {
  // States med React Hooks
  const [isOpen, setIsOpen] = useState(false);

  // Toggle til at åbne og lukke Navbar
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar className="lightGreenBg headerStyles" light expand="md">
      <Container>
        <NavbarBrand href="/">Top Scooter Nordic</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink className="linkStyles" href="/">
                Forside
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="linkStyles" href="/scooters">
                Elscootere
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="linkStyles" href="/chooseModel">
                Reservedele
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="linkStyles" href="/contact">
                Kontakt
              </NavLink>
            </NavItem>
            {/* Profil-ikonet vises kun på brede enheder */}
            <NavItem className="profileNavItemStyles">
              <NavLink className="linkStyles" href="/welcome">
                Profil
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
        {/* Profil-ikonet vises ikke på mobile enheder, her vises alm. link */}
        <a className="profileIconStyles" href="/welcome">
          <FontAwesomeIcon
            icon={faUserCircle}
            className="fontAwesomeStyles"
          ></FontAwesomeIcon>
        </a>
      </Container>
    </Navbar>
  );
}

export default Header;
