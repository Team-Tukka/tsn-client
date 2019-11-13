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
import TextArea from './components/textArea/TextArea';
import LoginForm from './components/loginForm/LoginForm';

// Importér egne komponenter med auth-beskyttelse
import AdminNav from './components/adminNav/AdminNav';
import Welcome from './components/welcome/Welcome';

// App komponentet indeholder den samlede app, der renderes i index.js
function App() {
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
        <Switch>
          <Route path="/" exact component={TextArea} />
          <Route path="/login" exact component={LoginForm} />
          <Auth
            path="/welcome"
            render={() => (
              <React.Fragment>
                <AdminNav />
                <Container className="contentWrapper">
                  <Welcome />
                </Container>
              </React.Fragment>
            )}
          />
        </Switch>
      </ApolloProvider>
    </Router>
  );
}

export default App;
