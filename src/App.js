import React from 'react';
import './App.css';

// Importér komponenter til routing
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Importér Apollo Client og Apollo Provider
import client from './config/apolloClient';
import { ApolloProvider } from '@apollo/react-hooks';

// Importér Reactstrap komponenter
import { Container } from 'reactstrap';

// Importér egne komponenter uden auth-beskyttelse
import Header from './components/header/Header';
import Textarea from './components/textarea/Textarea';
import LoginForm from './components/loginForm/LoginForm';
import NotFound from './components/notFound/NotFound';

// Importér egne komponenter med auth-beskyttelse
import AdminNav from './components/adminNav/AdminNav';
import Welcome from './components/welcome/Welcome';
import EditTextarea from './components/editTextarea/EditTextarea';
import Products from './components/products/Products';
import ShowScooter from './components/showScooter/ShowScooter';
import ShowSparepart from './components/showSparepart/ShowSparepart';
import AddNewScooter from './components/addNewScooter/AddNewScooter';
import AddNewSparepart from './components/addNewSparepart/AddNewSparepart';
import AddNewUser from './components/addNewUser/AddNewUser';

// App komponentet indeholder den samlede app, der renderes i index.js
function App() {
  // Definér angivelsen af Auth route
  const Auth = ({ render: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem('token') ? (
          <Component {...props} />
        ) : (
          window.location.replace('/login')
        )
      }
    />
  );

  return (
    <Router>
      <ApolloProvider client={client}>
        <Header />
        <AdminNav />
        <Switch>
          {/* Routes til offentligt tilgængeligt indhold */}
          <Route path="/" exact component={Textarea} />
          <Route path="/login" exact component={LoginForm} />
          {/* Routes til adgangsbeskyttet indhold */}
          <Auth
            path="/welcome"
            render={() => (
              <Container className="contentWrapper">
                <Welcome />
              </Container>
            )}
          />
          <Auth
            path="/editTextarea"
            render={() => (
              <Container className="contentWrapper">
                <EditTextarea />
              </Container>
            )}
          />
          <Auth
            path="/products"
            render={() => (
              <Container className="contentWrapper">
                <Products />
              </Container>
            )}
          />
          <Auth
            path="/showScooter/:id"
            render={() => (
              <Container className="contentWrapper">
                <ShowScooter />
              </Container>
            )}
          />
          <Auth
            path="/products/showSparepart/:id"
            render={() => (
              <Container className="contentWrapper">
                <ShowSparepart />
              </Container>
            )}
          />
          <Auth
            path="/addNewScooter"
            render={() => (
              <Container className="contentWrapper">
                <AddNewScooter />
              </Container>
            )}
          />
          <Auth
            path="/addNewSparepart"
            render={() => (
              <Container className="contentWrapper">
                <AddNewSparepart />
              </Container>
            )}
          />
          <Auth
            path="/addNewUser"
            render={() => (
              <Container className="contentWrapper">
                <AddNewUser />
              </Container>
            )}
          />
          {/* Route til alle ugyldige stier */}
          <Route exact component={NotFound} />
        </Switch>
      </ApolloProvider>
    </Router>
  );
}

export default App;
