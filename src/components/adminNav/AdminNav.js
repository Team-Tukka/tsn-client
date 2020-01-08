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
  NavLink,
  Spinner
} from 'reactstrap';

// AdminNav komponent
function AdminNav() {
  // ME2 query defineres
  const ME2 = gql`
    {
      me2(token: ${localStorage.token}) {
        _id
        firstName
        lastName
      }
    }
  `;

  // Client initialiseres til at være ME2 query
  const { loading, error, data, client } = useQuery(ME2);

  // States med React Hooks
  const [isOpen, setIsOpen] = useState(false);

  // Toggle til at åbne og lukke AdminNav
  const toggle = () => setIsOpen(!isOpen);

  // Funktion der smider token og redirecter til login-siden
  const Logout = () => {
    localStorage.clear();
    client.resetStore();
    window.location = '/login';
  };
  
  // Tjekker feljbeskeden og kører Logout() hvis token er udløbet.
  const checkToken = () => {
    if (error.message === 'GraphQL error: Token er udløbet!') {
      Logout();
    } else {
      return 'Error!';
    }
  };

  if (loading) return <p className="text-center m-3"><Spinner size="sm" color="secondary" /></p>;
  if (error) return <p className="text-center m-3">{checkToken()}</p>;
                                                    
  return (
    <React.Fragment>
      {localStorage.token && (
        <Navbar className="veryLightGreenBg adminNavStyles" light expand="md">
          <Container>
            <NavbarBrand href="/welcome">
              {data.me2.firstName + ' ' + data.me2.lastName}
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink className="linkStyles" href="/addNewUser">
                    Opret ny bruger
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="linkStyles" href="/products">
                    Produktliste
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="linkStyles" href="/categories">
                    Kategorier
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="linkStyles" href="/editTextarea">
                    Redigér forsidetekst
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
      )}
    </React.Fragment>
  );
}

export default AdminNav;
