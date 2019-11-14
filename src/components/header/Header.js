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

// Header komponent
function Header(props) {
  // States med React Hooks
  const [isOpen, setIsOpen] = useState(false);

  // Toggle til at åbne og lukke Navbar
  const toggle = () => setIsOpen(!isOpen);

  return (
    <header>
      <Navbar className="lightGreenBg headerStyles" light expand="md">
        <Container>
          <NavbarBrand href="/">Top Scooter Nordic</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className="linkStyles" href="#">
                  Forside
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="linkStyles" href="#">
                  Elscootere
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="linkStyles" href="#">
                  Reservedele
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="linkStyles" href="#">
                  Kontakt
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="linkStyles" href="/login">
                  Log ind
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
