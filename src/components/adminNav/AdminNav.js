import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import './AdminNav.css';

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

// ME query defineres
export const ME = gql`
  {
    me {
      _id
      firstName
      lastName
      mail
    }
  }
`;

// AdminNav komponent
function AdminNav(props) {
  // States med React Hooks
  const [isOpen, setIsOpen] = useState(false);

  // Toggle til at åbne og lukke AdminNav
  const toggle = () => setIsOpen(!isOpen);

  // Client initialiseres til at være ME query
  const { client } = useQuery(ME);

  // Funktion der smider token og redirecter til login-siden
  const Logout = () => {
    localStorage.clear();
    client.resetStore();
    window.location = '/login';
  };

  return (
    <header>
      <Navbar className="veryLightGreenBg adminNavStyles" light expand="md">
        <Container>
          <NavbarBrand></NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className="linkStyles" href="#">
                  Produktliste
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="linkStyles" href="#" onClick={Logout}>
                  Log ud
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default AdminNav;
