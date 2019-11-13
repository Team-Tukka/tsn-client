import React from 'react';
import './App.css';

// Importér Routing
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Importér Apollo Client og Apollo Provider
import client from './config/apolloClient';
import { ApolloProvider } from '@apollo/react-hooks';

// Importér Reactstrap komponenter
import { Container } from 'reactstrap';

// Importér komponenter
import Header from './components/header/Header';
import AdminNav from './components/adminNav/AdminNav';
import TextArea from './components/textArea/TextArea';
import LoginForm from './components/loginForm/LoginForm';

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <Header />
        <AdminNav />
        <Switch>
          <Container>
            <Route path="/" exact component={TextArea} />
            <Route path="/login" exact component={LoginForm} />
          </Container>
        </Switch>
      </ApolloProvider>
    </Router>
  );
}

export default App;
